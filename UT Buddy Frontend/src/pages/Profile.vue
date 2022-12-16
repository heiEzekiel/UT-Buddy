<template>
  <div>
    <div v-if="popModal">
          <modal class="my-modal"
            :show.sync="popModal"
            :centered="false"
            :show-close="true"
            
          >
            <template v-slot:header class='bg-gradient-dark'>
              
            </template>
              <h2 class='text-success'>{{ message }}</h2>

            
            <h4 class='text-primary'>Click anywhere to continue </h4>
                      
            <template v-slot:close-button>
            </template>
          </modal>
           </div>
    <div v-if="uploadedModal">
          <modal class="my-modal"
            :show.sync="uploadedModal"
            :centered="false"
            :show-close="true"
            
          >
            <template v-slot:header class='bg-gradient-dark'>
              
            </template>
              <h2 class='text-success'>{{ message }}</h2>

            
            <h4 class='text-primary'>Click anywhere to continue </h4>
                      
            <template v-slot:close-button>
            </template>
          </modal>
           </div>
    <div class="row">
      <div class="col-md-8">
        <edit-profile-form
          :tips="tips"
          :firstName="firstName"
          :lastName="lastName"
          :address="address"
          :zip="zip"
          :email="email"
          :description="description"
          @modal="showModal"
        >
        </edit-profile-form>
      </div>
      <div class="col-md-4">
        <user-card
          :name="name"
          :occupation="occupation"
          :gender="gender"
          :status="status"
          :email="email"
          :url="url"
          @uploaded="showUploaded"
        ></user-card>
      </div>
    </div>
  </div>
</template>
<script>
import API from "../api/API";
import EditProfileForm from "./Profile/EditProfileForm";
import UserCard from "./Profile/UserCard";
import { Modal } from "@/components";
export default {
  components: {
    EditProfileForm,
    UserCard,
    Modal
  },
  data() {
    return {
      tips: [],
      firstName: null,
      lastName: null,
      address: null,
      zip: null,
      email: null,
      name: null,
      occupation: null,
      gender: null,
      status: null,
      description: null,
      popModal: false,
      message: null,
      picture: null,
      url: null,
      uploadedModal: false
    };
  },
  methods:{
    showModal(message){
      
      this.popModal = true
      this.message = message
    },
    showUploaded(message){
      
      this.uploadedModal = true
      this.message = message
    }
  },
  async mounted() {
    const token = window.localStorage.getItem("token");

    try {
      const res = await API.findTip(token);
      this.tips = res.data[0].tips;
    } catch (error) {}
    try {
      const res1 = await API.findProfile(token);

      const {
        name,
        address,
        zip,
        email,
        occupation,
        gender,
        status,
        description,
        picture
      } = res1.data[0];

      this.firstName = name.split(" ")[0];
      this.lastName = name.split(" ")[1];
      this.address = address;
      this.zip = zip;
      this.email = email;
      this.name = name;
      this.occupation = occupation;
      this.gender = gender;
      this.status = status;
      this.description = description;
      this.url = picture
      
      
    } catch (error) {
      console.log(error);
    }
    
  }
};
</script>
<style></style>
