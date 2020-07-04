<template>
  <div id="order">
    <mu-container class="paperContainer">
      <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
        <mu-list textline="three-line" class="courseSignList">
          <mu-sub-header>发起的签到记录</mu-sub-header>
          <mu-row gutter>
            <mu-col xl="12" lg="12" md="12" sm="12" span="12">
              <mu-list-item
                avatar
                button
                :ripple="true"
                class="paperItem"
                v-for="(sign,index) in courseSignList"
                @click="toDetail(sign.courseSignId)"
                :key="sign.courseSignId"
              >
                <mu-list-item-action>
                  <mu-button style="min-width: 20px" color="primary">
                    {{ index + 1 }}
                  </mu-button>
                </mu-list-item-action>
                <mu-list-item-content>
                  <mu-list-item-title style="color: black;font-size: 0.7em;font-weight: bolder">
                    {{ sign.beginTime | formatDate1}}
                  </mu-list-item-title>
                </mu-list-item-content>
                <mu-list-item-action>
                </mu-list-item-action>
              </mu-list-item>
            </mu-col>
          </mu-row>
        </mu-list>
      </mu-load-more>
      <mu-card v-show="listSize == 0" style="width: 100%; margin: 0 auto;border-radius: 5px" raised>
        <mu-card-title title="暂无条目" sub-title></mu-card-title>
        <mu-card-text>
          <mu-button>回到首页</mu-button>
        </mu-card-text>
      </mu-card>
    </mu-container>
  </div>
</template>

<script>
import axios from "axios";
import { formatDate } from "../../tools/date.js";
export default {
  name: "test",
  data() {
    return {
      userId: 0,
      open: false,
      trigger: null,
      listSize: 0,
      selectTotal: 0,
      query: {
        page: 1,
        pageSize: 6,
        courseId: parseInt(localStorage.getItem("courseId"))
      },
      refreshing: false,
      loading: false,
      courseSignList: []
    };
  },
  created: function() {
    this.getData();
    this.getDataCount();
  },
  methods: {
    navigateTo(val) {
      this.$router.push(val);
    },
    getStaColor(val) {
      var status = "";
      switch (val) {
        case -1:
          status = "error";
          break;
        case 0:
          status = "warning";
          break;
        case 1:
          status = "greenA400";
          break;
        case 2:
          status = "#2196f3";
          break;
        case 3:
          status = "info";
          break;
      }
      return status;
    },
    toDetail(id) {
        localStorage.setItem("courseSignId",id);
      this.$router.push({
        path: "/teacherSignDetail",
      });
    },
    test() {
      this.$toast.message("test");
    },
    getData() {
      axios
        .post(
          "http://localhost:8080/daoyunWeb/course/getCourseSignTimeByCourseId",
          this.query,
          { headers: { "Content-Type": "application/json" } }
        )
        .then(
          res => {
            console.log(res);
            if (res.status == 200) {
              if (res.data.code == 0) {
                this.courseSignList = this.courseSignList.concat(res.data.data);
                this.listSize = this.courseSignList.length;
                this.$toast.success(res.data.msg);
              } else if (res.data.code == -2) {
                this.$router.push("/login");
                this.$toast.error(res.data.msg);
              } else {
                this.$toast.error(res.data.msg);
              }
            }
          },
          error => {
            console.log(error);
          }
        );
    },
    getDataCount() {
      //TODO 待加入搜索限定参数
      axios
        .post(
          "http://localhost:8080/daoyunWeb/course/getCourseSignTimeCount",
          this.query,
          { headers: { "Content-Type": "application/json" } }
        )
        .then(
          res => {
            console.log(res);
            if (res.status == 200) {
              this.selectTotal = res.data.data;
            }
          },
          error => {
            console.log(error);
          }
        );
    },
    refresh() {
      this.refreshing = true;
      //this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.refreshing = false;
        this.courseSignList = [];
        this.query.page = 1;
        this.getData();
        this.getDataCount();
      }, 2000);
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        if (this.query.page < this.selectTotal / this.query.pageSize) {
          this.query.page++;
          this.getData();
        } else {
          this.$toast.message("没有更多数据了");
        }
      }, 2000);
    },
    handleSearch() {
      this.paperList = [];
      this.$set(this.query, "page", 1);
      this.getData();
      this.getDataCount();
    },
  },
  filters: {
    formatDate1(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy年MM月dd日 hh:mm:ss");
    }
  }
};
</script>

<style scoped>
.paperContainer {
  padding: 10px;
}
.courseSignList {
  padding: 16px 8px;
}
.paperItem {
  border-radius: 5px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  margin: 15px 2px;
}
</style>
