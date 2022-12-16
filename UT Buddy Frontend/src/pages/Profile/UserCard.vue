<template>
  <card type="user">
    <p class="card-text"></p>
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <a href="#">
        <!-- <img
          class="avatar"
          v-if="gender == 'M'"
          src="img/anime3.png"
          alt="..."
        />
        <img class="avatar" v-else src="img/anime6.png" alt="..." /><br /> -->
        <span v-if="url"><img class="avatar" :src="url" alt="..."/></span>
        <span v-else>
          <img
            class="avatar"
            v-if="gender == 'M'"
            src="img/anime3.png"
            alt="..."
          />
          <img class="avatar" v-else src="img/anime6.png" alt="..." />
        </span>
        <br />

        <input
          v-if="edit_photo"
          class="mx-auto pl-5 text-center text-white"
          @change="uploadFile"
          ref="file"
          type="file"
          name="image"
        />
        <br v-if="edit_photo" />
        <span v-if="edit_photo" style="color: red;"
          >Ensure that your picture is square</span
        ><br v-if="edit_photo" />
        <div @click.prevent="edit_photo = true" v-if="!edit_photo" class="mt-4">
          <vue-loading-button
            style="font-size: 18px;"
            class="btn btn-primary "
            >Upload</vue-loading-button
          >
        </div>
        <div @click.prevent="save_picture" v-if="edit_photo">
          <vue-loading-button
            :loading="isLoading"
            style="font-size: 18px;"
            class="btn btn-primary "
            >Upload</vue-loading-button
          >
        </div>

        <h3 class="title">{{ name }}</h3>
      </a>

      <p class="description" v-if="!edit_occupation">
        {{ occupation }}
        <i
          class="tim-icons icon-pencil pencil ml-2"
          @click="edit_occupation = !edit_occupation"
        ></i>
      </p>
      <base-input
        v-model="change_occupation"
        placeholder="Occupation"
        v-if="edit_occupation"
      >
      </base-input>
      <base-button
        v-if="edit_occupation"
        slot="footer"
        type="primary"
        fill
        @click="save_occupation"
        >Save</base-button
      >
      <p class="description mt-2" v-if="!edit_status">
        <span class="mr-2" v-if="!status">How are you feeling?</span>
        <span v-else class="mr-2">{{ status }}</span>
        <i
          class="tim-icons icon-pencil pencil "
          @click="edit_status = !edit_status"
        ></i>
      </p>
      <base-input
        v-model="change_status"
        placeholder="Status"
        v-if="edit_status"
      >
      </base-input>
      <base-button
        v-if="edit_status"
        slot="footer"
        type="primary"
        fill
        @click="save_status"
        >Save</base-button
      >
    </div>
    <p></p>
    <p class="card-description"></p>
    <div slot="footer" class="button-container">
      <base-button icon round class="btn-facebook" @click="tab('facebook')">
        <i class="fab fa-facebook"></i>
      </base-button>
      <base-button icon round class="btn-twitter" @click="tab('twitter')">
        <i class="fab fa-twitter"></i>
      </base-button>
      <base-button icon round class="btn-google" @click="tab('google')">
        <i class="fab fa-google-plus"></i>
      </base-button>
    </div>
  </card>
</template>
<script>
import API from "../../api/API";
import BaseButton from "../../components/BaseButton.vue";
import { CldImage } from "cloudinary-vue";
export default {
  components: {
    BaseButton,
    CldImage
  },
  props: {
    name: null,
    occupation: null,
    gender: null,
    status: null,
    email: null,
    url: null
  },
  data() {
    return {
      edit_occupation: false,
      edit_status: false,
      change_occupation: null,
      change_status: null,
      edit_photo: false,
      images: null,
      image_name: null,
      image: null,
      isLoading: false
    };
  },
  methods: {
    uploadFile() {
      this.images = this.$refs.file.files[0];
      
      this.image_name = this.images.name;
    },
    async save_occupation() {
      this.edit_occupation = !this.edit_occupation;
      const token = window.localStorage.getItem("token");
      var occupation = this.change_occupation;
      try {
        const res = await API.occupation({ occupation }, token);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    },
    async save_status() {
      this.edit_status = !this.edit_status;
      const token = window.localStorage.getItem("token");
      var status = this.change_status;
      try {
        const res = await API.status({ status }, token);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    },
    async save_picture() {
      this.isLoading = true
      const token = window.localStorage.getItem("token");
      if (this.images) {
        const reader = new FileReader();
        reader.readAsDataURL(this.images);
        reader.onloadend = async () => {
          try {
            const res = await API.uploadPic({ data: reader.result }, token);
            this.url = res.data.url;
            this.$emit("uploaded", "Image successfully uploaded");
            this.edit_photo = false;
            this.isLoading = false;
            window.location.reload()
          } catch (err) {
            console.log(err);
          }
        };
      }
    },
    tab(name){
      if (name == "facebook"){
        window.open("https://www.facebook.com/")
      } else if (name == "twitter"){
        window.open("https://twitter.com")
      } else {
        window.open("https://google.com")
      }
    }
  }
};
</script>
<style>
.pencil {
  cursor: pointer;
}
</style>
