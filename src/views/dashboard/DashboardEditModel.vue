<template>
  <v-row>
    <v-col cols="12">
        
        <v-col cols="12">
      <v-card>
        <v-card-title>Edit Model</v-card-title>
        <v-card-text>
          <demo-form-layout-multiple-column></demo-form-layout-multiple-column>
        </v-card-text>
      </v-card>
    </v-col>
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
import DemoFormLayoutMultipleColumn from '../form-layouts/demos/DemoFormLayoutMultipleColumnEdit.vue'
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
    DemoFormLayoutMultipleColumn,
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
}
</script>
