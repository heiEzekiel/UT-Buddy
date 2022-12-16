<template>
  <div>
    <div v-if="popModal">
      <modal
        class="my-modal"
        :show.sync="popModal"
        :centered="false"
        :show-close="true"
      >
        <template v-slot:header class="bg-gradient-dark"> </template>
        <h2 class="text-success">Welcome to the Community Page</h2>

        <h4 class='text-dark'>
          Under this page, you will be view what the other users have to share
        </h4>

        <br />
        <h4 class="text-primary">Click anywhere to continue</h4>

        <template v-slot:close-button> </template>
      </modal>
    </div>
    <div class="row">
      <div class="col-12">
        <card>
          <template v-slot:header>
            <div class="d-flex justify-content-between align-items-center">
              <h4 class="card-title">{{ table1.title }}</h4>
              <button type="button" class="btn btn-sm" @click="showModal">
                <i class="tim-icons icon-simple-add m-auto"></i>
              </button>
            </div>
          </template>
          <div v-if="xModal" class="text-light">
            <modal
              :show.sync="xModal"
              class="modal-search"
              id="searchModal"
              :centered="false"
              :show-close="true"
            >
              <template v-slot:header>
                Upload a New Post
              </template>
              <div class="form-floating">
                <textarea
                  class="form-control border-secondary text-dark border rounded-1"
                  placeholder="Leave your post here"
                  v-model="posttext"
                  id="floatingTextarea"
                ></textarea>
              </div>
              <template v-slot:close-button></template>
              <button type="button" class="btn mt-3" @click="addPost()">
                Submit Post
              </button>
              <p v-if="error" class="text-danger label">
                Error has occurred
              </p>
            </modal>
          </div>
          <div v-if="isLoading" class="loading">
            <vue-simple-spinner
              message="Please wait while we retrieve the community posts"
            ></vue-simple-spinner>
          </div>
          <div class="table relative">
            <base-table
              :data="posts"
              :columns="table1.columns"
              thead-classes="text-light"
              community="yes"
              :fulldata="fulldata"
              @modal="openUserInfo"
              @delete="removePost"
            >
            </base-table>
          </div>
          <modal
            :show.sync="userInfo"
            class="modal-search"
            id="searchModal"
            :centered="false"
            :show-close="true"
            
          >
            <div class="container text-center">
              <span v-if="url"><img class="avatar" :src="url" alt="..." style="width: 120px; height: 130px;"/></span>
              <span v-else>
                <img
                  class="avatar"
                  v-if="gender == 'M'"
                  src="img/anime3.png"
                  style="width: 130px; height: 130px;"
                />
                <img class="avatar" v-else src="img/anime6.png" style="width: 130px; height: 130px;" />
              </span>
              <br />
              <h3 style="color:black;">{{ name }}, {{ occupation }}</h3>
              <h4 style="color:black;">{{ status }}</h4><hr>
              <h3 style="color:black;">Description:</h3>
              <h4 style="color:black;">{{ description }}</h4><hr>
              <p style="color:black;">Tips</p>
              <ul style="color:black;">
                <li
                  style="color:black;"
                  v-for="(tip, index) in tips"
                  :key="index"
                >
                  {{ tip.words }}
                </li>
              </ul>
            </div>
          </modal>
        </card>
      </div>
      <div class="buttons-bar h">
        <button
          type="button"
          class=" btn-secondary  mr-1 navigation "
          v-for="index in pages"
          :key="index"
          @click="next(index)"
        >
          {{ index }}
        </button>

        <button
          type="button"
          class="btn-secondary mr-1 navigation"
          @click="addone"
        >
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { BaseTable } from "@/components";
import { Modal } from "@/components";
const tableColumns = ["Thread", "Name", "Replies"];
import API from "../api/API";

export default {
  components: {
    BaseTable,
    Modal
  },
  data() {
    return {
      popModal: false,
      isLoading: false,
      error: false,
      posttext: "",
      xModal: false,
      table1: {
        title: "Forum Discussion",
        columns: [...tableColumns],
        data: []
      },
      page: 1,
      userInfo: false,
      name: null,
      occupation: null,
      status: null,
      description: null,
      tips: null,
      url: null,
      gender: null,
      fulldata: []
    };
  },
  computed: {
    pages() {
      var no_pages = Math.ceil(this.table1.data.length / 10);
      return no_pages;
    },
    posts() {
      var end = this.page * 10;
      return this.table1.data.slice(end - 10, end);
    }
  },
  methods: {
    async removePost(item) {
      const token = window.localStorage.getItem("token");

      for (var index in this.table1.data) {
        if (this.table1.data[index].post_id == item.post_id) {
          this.table1.data.splice(index, 1);
        }
      }
      
      try {
        const res1 = await API.deletePost({ id: item.post_id }, token);
        window.location.reload()
      } catch (error) {
        console.log(error);
      }
    },
    async openUserInfo(item) {
      const token = window.localStorage.getItem("token");
      this.userInfo = true;
      try {
        const res1 = await API.specialProfile({ id: item.id }, token);
        const { name, occupation, status, description, picture, gender } = res1.data[0];
        this.name = "";
        this.occupation = "";
        this.status = "";
        this.description = "";
        this.name = name;
        this.occupation = occupation;
        this.status = status;
        this.description = description;
        this.url = picture;
        this.gender = gender
      } catch (error) {
        console.log(error);
      }
      try {
        const res = await API.specialTips({ id: item.id }, token);
        this.tips = [];
        this.tips = res.data[0].tips;
      } catch (error) {}
    },
    next(index) {
      this.page = index;
    },
    addone() {
      if (this.page + 1 < Math.ceil(this.table1.data / 10)) {
        this.page += 1;
      }
    },
    async addPost() {
      var t = this.posttext;
      var date = new Date();
      
      const token = window.localStorage.getItem("token");
      try {
        const res1 = await API.findProfile(token);
        const { name } = res1.data[0];
        var username = name.split(" ")[0];

        
      } catch (error) {
        console.log(error);
      }
      try {
        
        const result = await API.addPost(
          { date, post: t, username, replies: 0 },
          token
        );
        window.location.reload()
      } catch (error) {
        this.error = true;
      }

      this.xModal = false;
    },
    showModal() {
      this.xModal = true;
    },
    closeModal() {
      this.xModal = false;
    },
    closeModalpop() {
      this.popModal = false;
    }
  },
  async mounted() {
    this.isLoading = true;
    const token = window.localStorage.getItem("token");
    try {
      const res1 = await API.findProfile(token);
      const { community } = res1.data[0];
      if (!community) {
        this.popModal = true;
        const result = await API.updateFirst({ community: true }, token);
      }
    } catch (error) {
      console.log(error);
    }
    try {
      const result = await API.findPost(token);
      var data = result.data;
      
      data.sort(function(a, b) {
        return b.date - a.date;
      });

      for (var i = 0; i < data.length; i++) {
        this.table1.data.unshift({
          thread: data[i].thread,
          username: data[i].username,
          replies: String(data[i].replies),
          
        });
        this.fulldata.unshift({
          thread: data[i].thread,
          username: data[i].username,
          replies: String(data[i].replies),
          id: data[i].id,
          isUser: data[i].isUser,
          post_id: data[i].post_id
        })
      }
      
    } catch (error) {
      this.error = true;
    }
    this.isLoading = false;
  }
};
</script>

<style lang="scss" scoped>
.h {
  text-align: center;
  margin: 5px;
}
.navigation {
  cursor: pointer;
}

.loading {
  position: absolute;
  top: 170%;
  left: 33%;
}

.add {
  background-color: purple;
}

.buttons-bar {
  margin: auto;
}

div {
  font-weight: 400;
  font-size: 13px;
  color: #c0c1c2;
}


#floatingTextarea::placeholder{
    color:black
 }
</style>
