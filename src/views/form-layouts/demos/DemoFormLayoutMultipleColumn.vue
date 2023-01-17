<template>
  <v-form class="multi-col-validation">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="name"
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
          v-model="description"
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
          v-model="price"
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
    v-model="simple_pic"
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
          v-model="black_pic"
          @change="handleBlackPic($event)"
        ></v-file-input>

      </v-col>

      <v-col cols="12">
        <v-btn  @click="insertModel()" color="primary">
          Submit
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
      name:'',
      description:'',
      price:'',
      simple_pic:'',
      black_pic:'',
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
    handleSimplePic(event) {
      this.simple_pic = event.target.files[0];
    },
    handleBlackPic(event) {
      this.black_pic = event.target.files[0];
    },
    insertModel() {
      console.log('name:' + this.name);
            console.log('name:' + this.description);
                  console.log('name:' + this.price);
                        console.log('name:' + this.black_pic);
                              console.log('name:' + this.simple_pic);




      let fd = new FormData();
      fd.append('name', this.name);
      fd.append('description', this.description);
      fd.append('price', this.price);
      fd.append('simple_pic', this.simple_pic);
      fd.append('black_pic', this.black_pic);
      axios.post(process.env.VUE_APP_GATEWAY+'/admin/models/create',fd, {
         headers: {
                  'Authorization': 'Bearer' + this.token,
                  "Content-Type": "application/json",

              }
      }).then(() => {
        console.log(this.name + 'name');
      })
    }
  }

}
</script>
