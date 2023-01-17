<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="usreList"
      item-key="full_name"
      class="table-rounded"
      hide-default-footer
      disable-sort
    >
      <!-- name -->
      <template #[`item.full_name`]="{item}">
        <div class="d-flex flex-column">
          <span class="d-block font-weight-semibold text--primary text-truncate">{{ item.full_name }}</span>
        </div>
      </template>
      <template #[`item.salary`]="{item}">
        {{ `$${item.salary}` }}
       
      </template>
      <!-- status -->
      <template #[`item.status`]="{item}">
        <v-chip
          small
          :color="statusColor[status[item.status]]"
          class="font-weight-medium"
        >
          {{ status[item.status] }}
        </v-chip>
        
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mdiSquareEditOutline, mdiDotsVertical } from '@mdi/js'
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {

  mounted() {
        this.getModels();
    this.getOrders();
     this.mergeInfo();
  },
  data() {
    return {
      statusColor: {
      /* eslint-disable key-spacing */
      Current: 'primary',
      Professional: 'success',
      Rejected: 'error',
      Resigned: 'warning',
      Applied: 'info',
      /* eslint-enable key-spacing */
    },
     usreList: [],
     models: [],
     orders:[],
      status: {
        1: 'Designer',
        2: 'Professional',
        3: 'Other',
      },
     icons: {
        mdiSquareEditOutline,
        mdiDotsVertical,
      },
        headers: [
        { text: 'NAME', value: 'username' },
        { text: 'EMAIL', value: 'email' },
        { text: 'PRICE', value: 'price' },
        { text: 'MODEL', value: 'name' },
        { text: 'COUNTRY', value: 'country' },
        { text: 'PROFESSION', value: 'profession' },
      ],
    }
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
    mergeInfo() {
        

    },
    setOrders(data){
      this.orders = data;
      //this.usreList = data; 
      let merged = this.models.map(t1 => ({...t1, ...this.orders.find(t2 => t2.model_id === t1.id )}));
      this.usreList = merged;
      console.log('final: '+JSON.stringify(this.usreList));
    },
    setModels(data) {
      this.models =data;
    },
    getOrders()  {
       axios.get(process.env.VUE_APP_GATEWAY+'/admin/orders', {
    headers: {
                  'Authorization': 'Bearer' + this.token,
                  "Content-Type": "application/json",

              }
  }).then((response)  =>{
      this.setOrders(response.data['orders']);
  });
    },

  getModels()  {
       axios.get(process.env.VUE_APP_GATEWAY+'/admin/models', {
    headers: {
                  'Authorization': 'Bearer' + this.token,
                  "Content-Type": "application/json",

              }
  }).then((response)  =>{
      this.setModels(response.data.models);
      console.log(JSON.stringify(response.data.models));
  });
    }
  }
}
</script>
