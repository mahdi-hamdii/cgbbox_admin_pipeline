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
        { text: 'EMAIL', value: 'email' },
        { text: 'LANGUAGE', value: 'language' },
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
    setData(data){
      this.usreList = data; 
    },
    getData()  {
       axios.get(process.env.VUE_APP_GATEWAY+'/admin/users/info', {
    headers: {
                  'Authorization': 'Bearer' + this.token,
                  "Content-Type": "application/json",

              }
  }).then((response)  =>{
      let data = JSON.stringify(response.data['users'])
       let final = data.replace('"', '');
       let infos = final.split("{}")
      this.setData(response.data['users']);
      console.log('my users'+infos);
  });
    }
  }
}
</script>
