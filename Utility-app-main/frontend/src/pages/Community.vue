<template>
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
        <div v-if="xModal" class='text-light'>
          <modal
            :show.sync="xModal"
            class="modal-search "
            id="searchModal"
            :centered="false"
            :show-close="true"
          >
            <template v-slot:header>
              Upload a New Post
            </template>
            <div class="form-floating">
              <textarea 
                class="form-control border-dark border rounded-1 text-light"
                placeholder="Leave your post here"
                v-model="posttext"
                id="floatingTextarea"
              ></textarea>
            </div>
            <template v-slot:close-button></template>
            <button type="button" class="btn mt-3" @click="addPost()">Submit Post</button>
          </modal>
          <!-- <Modal class="modal" :show.sync="xModal" @close='closeModal()'>
        <template v-slot:header>
        Upload a New Post
          </template>
          <textarea rows='4' cols='50' v-model='posttext'></textarea>
          <template v-slot:close-button></template>
          <button type='button' @click='addPost()'>Submit Post</button>
      </Modal> -->
        </div>
        <div class="table relative">
          <base-table
            :data="posts"
            :columns="table1.columns"
            thead-classes="text-primary"
          >
          </base-table>
        </div>
      </card>
    </div>
    <div class="container h">
      <button
        type="button"
        class="btn-outline-primary mr-1 navigation"
        v-for="index in pages"
        :key="index"
        @click="next(index)"
      >
        {{ index }}
      </button>

      <button
        type="button"
        class="btn-outline-primary mr-1 navigation"
        @click="addone"
      >
        >
      </button>
    </div>
  </div>
</template>

<script>
import { BaseTable } from "@/components";
import { Modal } from "@/components";
const tableColumns = ["Thread", "Username", "Replies"];
import API from '../api/API'

export default {
  components: {
    BaseTable,
    Modal
  },
  data() {
    return {
      posttext: "",
      xModal: false,
      table1: {
        title: "Forum Discussion",
        columns: [...tableColumns],
        data: [
          {
            id: 1,
            thread: "why is my gas bill so high?",
            username: "kendricklamar",
            replies: "7"
          },
          {
            id: 2,
            thread: "which appliances to use less to save water?",
            username: "angela",
            replies: "15"
          },
          {
            id: 3,
            thread: "how do I pay my bills on this application?",
            username: "carlbruner",
            replies: "3"
          },
          {
            id: 5,
            thread:
              "Can I save more electricity by increasing the temperature of the air-con? ",
            username: "timotheechalamet",
            replies: "5"
          },
          ,
          {
            id: 6,
            thread: "I can't find my bill? ",
            username: "arianagrande123",
            replies: "27"
          },
          {
            id: 7,
            thread: "How can I save more electricity? ",
            username: "doraemon66",
            replies: "88"
          },
          {
            id: 8,
            thread: "Can I pay my bill on the application? ",
            username: "harrystyles",
            replies: "51"
          },
          {
            id: 9,
            thread: "What are the payment methods available on this platform? ",
            username: "tomhiddleston",
            replies: "3"
          },
          {
            id: 10,
            thread:
              "I have save 30% of my total bill thanks to this app! Will share with my friends about UT Buddy! ",
            username: "makkie",
            replies: "10"
          },
          {
            id: 11,
            thread: "is the app accurate? ",
            username: "david",
            replies: "9"
          },
          {
            id: 12,
            thread: "is the app accurate? ",
            username: "david",
            replies: "9"
          },
          {
            id: 13,
            thread: "is the app accurate? ",
            username: "david",
            replies: "9"
          },
          {
            id: 14,
            thread: "is the app accurate? ",
            username: "david",
            replies: "9"
          },
          {
            id: 15,
            thread: "is the app accurate? ",
            username: "david",
            replies: "9"
          },
          {
            id: 16,
            thread: "is the app accurate? ",
            username: "",
            replies: "9"
          },
          {
            id: 17,
            thread: "is the app accurate? ",
            username: "david",
            replies: "9"
          }
        ]
      },
      page: 1
    };
  },
  computed: {
    pages() {
      var no_pages = Math.ceil(this.table1.data.length / 10);
      return no_pages;
    },
    posts() {
      var end = this.page * 10;
      return this.table1.data.slice(end - 10, end + 1);
    }
  },
  methods: {
    next(index) {
      this.page = index;
    },
    addone() {
      this.page += 1;
    },
    addPost() {
      var t = this.posttext;
      var date = new Date()
      console.log(date)
      /* try {
        const result = API.addPost()
      } catch (error) {
        
      }
      this.table1.data.push({
        id: 7,
        thread: t,
        username: angela,
        replies: 0
      }); */
    },
    showModal() {
      this.xModal = true;
    },
    closeModal() {
      this.xModal = false;
    }
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

.relative {
  position: relative;
}

.modal .modal-dialog {
  margin-bottom: 5cm !important;
  
}

.add {
  background-color: purple;
}
</style>
