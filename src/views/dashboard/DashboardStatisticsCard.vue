<template>
  <v-card>
    <v-card-title class="align-start">
      <span class="font-weight-semibold">Statistics</span>
      <v-spacer></v-spacer>
      <v-btn
        icon
        small
        class="me-n3 mt-n2"
      >
        <v-icon>
          {{ icons.mdiDotsVertical }}
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col
          v-for="data in statisticsData"
          :key="data.title"
          cols="6"
          md="3"
          class="d-flex align-center"
        >
          <v-avatar
            size="44"
            :color="resolveStatisticsIconVariation (data.title).color"
            rounded
            class="elevation-1"
          >
            <v-icon
              dark
              color="white"
              size="30"
            >
              {{ resolveStatisticsIconVariation (data.title).icon }}
            </v-icon>
          </v-avatar>
          <div class="ms-3">
            <p class="text-xs mb-0">
              {{ data.title }}
            </p>
            <h3 class="text-xl font-weight-semibold">
              {{ data.total }}
            </h3>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiAccountOutline, mdiCurrencyUsd, mdiTrendingUp, mdiDotsVertical, mdiLabelOutline } from '@mdi/js'
import axios from 'axios'
import { mapGetters } from 'vuex';

export default {
 
  props: {
    Sales:Number,
   
  },
     computed: {
          ...mapGetters(
            {
                userInfo:'auth/getUser',
                emailIsVerified:'auth/getEmailIsVerified',
                token:'auth/getToken'
            }
        ),
    },
  data() {
    return {
        sales:Number,
        users:Number,
        statisticsData: [
        {
          title: 'Sales',
          total: 'loading',
        },
          {
            title: 'Customers',
            total: 'loading',
          },
          {
            title: 'Models',
            total: 'loading',
          },
          {
            title: 'Revenue',
            total: 'loading',
          },
        ],
        resolveStatisticsIconVariation: data => {
          if (data === 'Sales') return { icon: mdiTrendingUp, color: 'primary' }
          if (data === 'Customers') return { icon: mdiAccountOutline, color: 'success' }
          if (data === 'Models') return { icon: mdiLabelOutline, color: 'warning' }
          if (data === 'Revenue') return { icon: mdiCurrencyUsd, color: 'info' }

          return { icon: mdiAccountOutline, color: 'success' }
        },
            // icons
        icons: {
          mdiDotsVertical,
          mdiTrendingUp,
          mdiAccountOutline,
          mdiLabelOutline,
          mdiCurrencyUsd,
        },
    }
  },

   mounted() {
    this.getSales();
    this.getCustomers();
    this.getModels();
    this.getOrders();
  },

  computed: {
          ...mapGetters(
            {
                userInfo:'auth/getUser',
                emailIsVerified:'auth/getEmailIsVerified',
                token:'auth/getToken'
            }
        ),
    },
  methods: {
       setSales(sales) {
         this.statisticsData[3].total = sales + '$';
        },
        setUsers(users) {
           this.statisticsData[1].total = users;
        },
         setModels(models) {
           this.statisticsData[2].total = models;
        },
        setOrders(orders) {
          this.statisticsData[0].total = orders;
        },
      getSales() {
            axios.get(process.env.VUE_APP_GATEWAY+'/admin/orders/profit', {
              headers: {
                            'Authorization': 'Bearer' + this.token,
                            "Content-Type": "application/json",

                        }
            }).then((response)  =>{
                this.setSales(response.data['total_profit']);
                console.log(response.data['total_profit'] + 'hello');
            });
        },
           getCustomers() {
            axios.get(process.env.VUE_APP_GATEWAY+'/admin/users/total', {
              headers: {
                            'Authorization': 'Bearer' + this.token,
                            "Content-Type": "application/json",

                        }
            }).then((response)  =>{
                this.setUsers(response.data['total_users']);
            });
        },

              getModels() {
            axios.get(process.env.VUE_APP_GATEWAY+'/admin/models/total_models', {
              headers: {
                            'Authorization': 'Bearer' + this.token,
                            "Content-Type": "application/json",

                        }
            }).then((response)  =>{
                this.setModels(response.data['total_models']);
            });
        },

              getOrders() {
            axios.get(process.env.VUE_APP_GATEWAY+'/admin/orders/total', {
              headers: {
                            'Authorization': 'Bearer' + this.token,
                            "Content-Type": "application/json",

                        }
            }).then((response)  =>{
                this.setOrders(response.data['total_orders']);
            });
        }
  }
}
</script>
