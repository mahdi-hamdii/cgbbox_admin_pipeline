import axios from "axios";
export default ({
    namespaced:true,
    state: {
        token:null,
        user:null,
        loginStatus:null,
        emailVerified:null,
        total_profit:null,
    
    },
   
    getters: {

        getUser: state => {
            return state.user;
        },
        getEmailIsVerified: state => {
            return state.emailVerified;
        },
        getToken: state => {
            return state.token;
        },
        getProfit: state  => {
            return state.total_profit;
        }


    },
    mutations: {
        SET_TOKEN (state, token) {
            state.token = token;
        },
        SET_USER (state, data) {
            state.user = data;
        },
        SET_LOGIN_STATUS(state, data) {
            state.loginStatus = data;
        },
        SET_EMAIL_STATUS(state, data) {
            state.emailVerified = data;
        },
        SET_PROFIT(state, data) {
            state.total_profit = data;
        }
    },
    actions: {
        async logIn({dispatch}, credential) {
          let response = await  axios.post(process.env.VUE_APP_GATEWAY+"/adminLogin", credential, {
                headers: {
                "Content-Type": "application/json",
                }
          });
    
                return dispatch('attempt', response.data.token);
        },
        async signIn({dispatch}, credential) {
            let response = await  axios.post(process.env.VUE_APP_GATEWAY+"/adminRegister", credential, {
                  headers: {
                  "Content-Type": "application/json",
                  }
            });
      
                  return dispatch('attempt', response.data.token);
          },
        async updateUser({dispatch}, token){
            console.log('token: ' + token); 
            return dispatch('attempt', token);
        },
        async attempt ({commit}, token) {
            commit('SET_TOKEN', token);
            try {
                let response = await axios.get(process.env.VUE_APP_GATEWAY+'/admin/me', {
                    headers: {
                        'Authorization': 'Bearer' + token,
                        "Content-Type": "application/json",

                    }
                });
                let emailStatus = false;
                if(response.data.email_verified_at !== null) {
                    emailStatus = true;
                    commit('SET_EMAIL_STATUS', emailStatus);
                }
                else {
                    emailStatus = false;
                    commit('SET_EMAIL_STATUS', emailStatus);                   
                }
                commit('SET_USER', response.data);
                commit('SET_LOGIN_STATUS', response.data.status);
            }
            catch (e) {
                commit('SET_USER', null);
                commit('SET_TOKEN', null);
                commit('SET_LOGIN_STATUS', false);
            }
            
        },

        async profits ({commit}, token) {
            commit('SET_TOKEN', token);
            try {
             
                    let response = await axios.get(process.env.VUE_APP_GATEWAY+'/admin/orders/profit', {
                        headers: {
                            'Authorization': 'Bearer' + token,
                            "Content-Type": "application/json",
    
                        }
                    });

                    commit('SET_PROFIT', response.data);
            }
            catch(e) {

            }
        },


        async profits ({commit}, token) {
            commit('SET_TOKEN', token);
            try {
             
                    let response = await axios.get(process.env.VUE_APP_GATEWAY+'/admin/orders/profit', {
                        headers: {
                            'Authorization': 'Bearer' + token,
                            "Content-Type": "application/json",
    
                        }
                    });

                    commit('SET_PROFIT', response.data);
            }
            catch(e) {

            }
        },
        async logout ({commit}, token) {
            try {
                let response = await axios.get(process.env.VUE_APP_GATEWAY+'/admin/logout', {
                    headers: {
                        'Authorization': 'Bearer' + token,
                        "Content-Type": "application/json",

                    }
                }).then(() => {
                    commit('SET_USER', null);
                    commit('SET_TOKEN', null);
                    commit('SET_LOGIN_STATUS', false);
                });
                
                
            }
            catch (e) {
                commit('SET_USER', null);
                commit('SET_TOKEN', null);
                commit('SET_LOGIN_STATUS', false);
            }
        },
       
    
        async logout({commit}, _) {
            commit('SET_USER', null);
            commit('SET_TOKEN', null);
            commit('SET_LOGIN_STATUS', false);
            localStorage.removeItem('vuex');
        }
        
    },
})