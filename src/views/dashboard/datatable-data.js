  import axios from 'axios';
  import { mapGetters } from 'vuex';
  import store from '../../store';
   let token=  store.getters.getToken;
 
  console.log('token : '+token);
  const data =  axios.get(process.env.GATEWAY+'/admin/users/total', {
    headers: {
                  'Authorization': 'Bearer' + token,
                  "Content-Type": "application/json",

              }
  }).then((response)  =>{
      return response.data;
  });


export default Object.values(data);
