<template>
  <card type="user">
    <p class="card-text">
    </p>
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <a href="#">
        <img class="avatar" v-if="gender == 'M'" src="img/anime3.png" alt="...">
        <img class="avatar" v-else src="img/anime6.png" alt="...">
        <h5 class="title">{{name}}</h5>
      </a>
      <p class="description" v-if="!edit">
        {{occupation}}
        <i class="tim-icons icon-pencil pencil " @click="edit = !edit" ></i>
      </p>
      <base-input
          v-model="change_occupation"
          placeholder="Occupation"
          v-if="edit"
        >
        </base-input>
        <base-button v-if="edit" slot="footer" type="primary" fill @click="save">Save</base-button>
    </div>
    <p></p>
    <p class="card-description">
     
    </p>
    <div slot="footer" class="button-container">
      <base-button icon round class="btn-facebook">
        <i class="fab fa-facebook"></i>
      </base-button>
      <base-button icon round class="btn-twitter">
        <i class="fab fa-twitter"></i>
      </base-button>
      <base-button icon round class="btn-google">
        <i class="fab fa-google-plus"></i>
      </base-button>
    </div>
  </card>
</template>
<script>
import API from '../../api/API'
  export default {
    props: {
      name: null,
      occupation: null,
      gender: null
    },
    data(){
      return{
        edit: false,
        change_occupation: null
      }
    },
    methods:{
      async save(){
        this.edit = !this.edit;
        const token = window.localStorage.getItem("token");
        var occupation = this.change_occupation
        try {
          
          const res = await API.occupation({occupation}, token)
          this.occupation = occupation
        } catch(err){
          console.log(err)
        }
      }
    }
  }
</script>
<style>
.pencil{
  cursor: pointer;
}
</style>
