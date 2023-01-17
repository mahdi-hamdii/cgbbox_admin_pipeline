<template>
  <v-form class="multi-col-validation">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="current_model.name"
          label="Name"
          outlined
          dense
          placeholder="Name"
          hide-details
        ></v-text-field>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
           v-model="current_model.description"
          label="Description"
          outlined
          dense
          placeholder="Description"
          hide-details
        ></v-text-field>
      </v-col>

   
         <v-col
        cols="12"
        md="6"
      >
        <v-text-field
           v-model="current_model.price"
          label="Price"
          outlined
          dense
          placeholder="Price"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
      <v-file-input
    label="Box1 image"
    outlined
    dense
     v-model="current_model.simple_pic"
    @change="handleSimplePic($event)"
  ></v-file-input>

      </v-col>

      <v-col
        cols="12"
        md="3"
      >
        <v-file-input
          label="Box2 image"
          outlined
          dense
           v-model="current_model.black_pic"
          @change="handleBlackPic($event)"
        ></v-file-input>

      </v-col>

      <v-col cols="12">
        <v-btn  cols="6" @click="updateModel()" color="primary">
          Submit
        </v-btn>
       <v-btn cols="6" class="ml-2" @click="deleteModel()" color="error">
          Delete
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { ref } from '@vue/composition-api'
import axios from 'axios'
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      model_id:'',
      current_model:{
      name:null,
      description:null,
      price:null,
      simple_pic:null,
      black_pic:null,
      },
      
    }
  },
  mounted() {
    this.model_id = this.$route.params.id;
    this.modelInfo();
    console.log(this.model_id + 'id')
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
 
    setCurrentModel(model) {
      this.current_model.name = model.name;
      this.current_model.description = model.description;
      this.current_model.price = model.price;
      this.current_model.simple_pic= model.simple_pic;
      this.current_model.black_pic = model.black_pic;
    } ,
    modelInfo() {
        axios.get(process.env.VUE_APP_GATEWAY+'/admin/models/find/'+this.model_id, {
         headers: {
                  'Authorization': 'Bearer' + this.token,
                  "Content-Type": "application/json",

              }
      }).then((response) => {
          this.setCurrentModel(response.data.models);
      })
    }, 
    handleSimplePic(event) {
      this.simple_pic = event.target.files[0];
    },
    handleBlackPic(event) {
      this.black_pic = event.target.files[0];
    },
    updateModel() {

      let fd = new FormData();
      this.current_model.price = parseFloat(this.current_model.price);
      fd.append('name', this.current_model.name);
      fd.append('description', this.current_model.description);
      fd.append('price',this.current_model.price);
      fd.append('simple_pic', this.current_model.simple_pic);
      fd.append('black_pic', this.current_model.black_pic);
      console.log(JSON.stringify(fd) + 'name');
      axios.post(process.env.VUE_APP_GATEWAY+'/admin/models/update/'+this.model_id,fd, {
         headers: {
                  'Authorization': 'Bearer' + this.token,
                  "Content-Type": "application/json",

              }
      }).then(() => {
        
      })
    },
    back() {
      this.$router.push('/models');
    },
    deleteModel() {
      axios.delete(process.env.VUE_APP_GATEWAY+'/admin/models/delete/'+this.model_id, {
        headers: {
          'Authorization': 'Bearer' + this.token,
          'Content-Type':"application/json",
        }
      }).then(() => {
        this.back();
      });
    }


  }

}
</script>
