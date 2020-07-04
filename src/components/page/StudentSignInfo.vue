<template>
  <div class="info-container">
    <mu-card class="info-card" raised>
      <mu-card-title title="签到情况"></mu-card-title>
      <mu-card-title sub-title="参加课程以来总签到次数"></mu-card-title>
      <mu-card-text>{{info.totalCount}}</mu-card-text>
      <mu-card-title sub-title="签到成功次数"></mu-card-title>
      <mu-card-text>{{info.successCount}}</mu-card-text>
      <mu-card-title sub-title="签到失败次数"></mu-card-title>
      <mu-card-text>{{info.failCount}}</mu-card-text>
    </mu-card>
  </div>
</template>

<script>
import axios from "axios";
import { formatDate } from "../../tools/date.js";
export default {
  name: "courseInfo",
  data() {
    return {
      courseId: parseInt(localStorage.getItem("courseId")),
      studentId: parseInt(localStorage.getItem("ms_userId")),
      info: {
        totalCount: 0,
        successCount: 0,
        failCount: 0
      },
      signInfo: []
    };
  },
  created: function() {
    this.getData();
  },
  filters: {
    formatDate1(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy年MM月dd日 hh:mm:ss");
    }
  },
  methods: {
    navigateTo(val) {
      this.$router.push(val);
    },
    getData() {
      axios
        .post(
          "http://localhost:8080/daoyunWeb/course/getStudentSignInfo",
          {
            courseId: this.courseId,
            studentId: this.studentId
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(
          res => {
            console.log(res);
            if (res.status == 200) {
              if (res.data.code == 0) {
                this.signInfo = res.data.data;
                this.$toast.success(res.data.msg);
                this.info.totalCount = this.signInfo.length;
                this.traverse(this.signInfo);
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
    traverse(array) {
      array.forEach(item => {
        if (item.signStatus == 0) {
          this.info.successCount++;
        }
      });
      this.info.failCount = this.info.totalCount-this.info.successCount;
    }
  }
};
</script>

<style scoped>
.info-container {
  width: 100%;
  background-image: linear-gradient(270deg, #8146b4, #6990f6);
  padding: 8px;
  height: 1000px;
}
.mu-demo-form {
  width: 100%;
  /*max-width: 460px;*/
}
.info-card {
  width: 100%;
  max-width: 80%;
  margin: 50px auto;
}
</style>
