<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="usreList"
      item-key="id"
      class="table-rounded"
      hide-default-footer
      disable-sort
    >
      <!-- name -->
      <template #[`item.name`]="{item}">
        <div class="d-flex flex-column cursor">
          <span @click="redirectTo(item.id)" class="d-block font-weight-semibold text--primary text-truncate">{{ item.name }}</span>
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
    this.getData();
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
        { text: 'NAME', value: 'name' },
        { text: 'DESCRIPTION', value: 'description' },
        { text: 'PRICE', value: 'price' },
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
    redirectTo(id) {
      this.$router.push('/models/edit/'+id);
    },
    setData(data){
      this.usreList = data; 
    },
    getData()  {
       axios.get(process.env.VUE_APP_GATEWAY+'/admin/models', {
    headers: {
                  'Authorization': 'Bearer' + this.token,
                  "Content-Type": "application/json",

              }
  }).then((response)  =>{
      this.setData(response.data.models);
  });
    }
  }
}
</script>
<style>
  .cursor {
    cursor: pointer;
  }
</style>