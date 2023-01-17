<template>
  <v-row>
    <v-col
      cols="12"
      md="12"
    >
      <dashboard-statistics-card :Sales="sales" :Users="users"></dashboard-statistics-card>
    </v-col>
    <v-col cols="12">
      <dashboard-datatable></dashboard-datatable>
    </v-col>
  </v-row>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiPoll, mdiLabelVariantOutline, mdiCurrencyUsd, mdiHelpCircleOutline } from '@mdi/js'
import StatisticsCardVertical from '@/components/statistics-card/StatisticsCardVertical.vue'

// demos
import DashboardCongratulationJohn from './DashboardCongratulationJohn.vue'
import DashboardStatisticsCard from './DashboardStatisticsCard.vue'
import DashboardCardTotalEarning from './DashboardCardTotalEarning.vue'
import DashboardCardDepositAndWithdraw from './DashboardCardDepositAndWithdraw.vue'
import DashboardCardSalesByCountries from './DashboardCardSalesByCountries.vue'
import DashboardWeeklyOverview from './DashboardWeeklyOverview.vue'
import DashboardDatatable from './DashboardDatatable.vue'
import axios from 'axios'
import { mapGetters } from 'vuex';
export default {
  components: {
    StatisticsCardVertical,
    DashboardCongratulationJohn,
    DashboardStatisticsCard,
    DashboardCardTotalEarning,
    DashboardCardDepositAndWithdraw,
    DashboardCardSalesByCountries,
    DashboardWeeklyOverview,
    DashboardDatatable,
  },
  setup() {
    const totalProfit = {
      statTitle: 'Total Profit',
      icon: mdiPoll,
      color: 'success',
      subtitle: 'Weekly Project',
      statistics: '$25.6k',
      change: '+42%',
    }

    const totalSales = {
      statTitle: 'Refunds',
      icon: mdiCurrencyUsd,
      color: 'secondary',
      subtitle: 'Past Month',
      statistics: '$78',
      change: '-15%',
    }

    // vertical card options
    const newProject = {
      statTitle: 'New Project',
      icon: mdiLabelVariantOutline,
      color: 'primary',
      subtitle: 'Yearly Project',
      statistics: '862',
      change: '-18%',
    }

    const salesQueries = {
      statTitle: 'Sales Quries',
      icon: mdiHelpCircleOutline,
      color: 'warning',
      subtitle: 'Last week',
      statistics: '15',
      change: '-18%',
    }

    return {
      totalProfit,
      totalSales,
      newProject,
      salesQueries,
    }
  },
  data() {
    return {
      sales:null,
      users:'',
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
        setSales(sales) {
          this.sales = sales;
        },
        setUsers(users) {
          this.users = users;
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
                this.setUsers(response.data);
            });
        }
  }
}
</script>
