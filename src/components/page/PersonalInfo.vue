<template>
  <div class="info-container">
    <mu-card class="info-card" raised>
      <mu-card-title title="个人信息"></mu-card-title>
      <mu-card-title sub-title="姓名"></mu-card-title>
      <mu-card-text>{{info.userName}}</mu-card-text>
      <mu-card-title sub-title="身份"></mu-card-title>
      <mu-card-text>{{roleName}}</mu-card-text>
      <mu-card-title sub-title="联系方式"></mu-card-title>
      <mu-card-text>{{"联系方式:"+info.phoneNumber}}</mu-card-text>
      <mu-divider></mu-divider>
      <mu-card-title sub-title="学校"></mu-card-title>
      <mu-card-text>{{info.school}}</mu-card-text>
      <mu-card-title sub-title="学院"></mu-card-title>
      <mu-card-text>{{info.academy}}</mu-card-text>
      <mu-card-title sub-title="专业"></mu-card-title>
      <mu-card-text>{{info.major}}</mu-card-text>
    </mu-card>
  </div>
</template>

<script>
import axios from "axios";
import { formatDate } from "../../tools/date.js";
export default {
  name: "personalInfo",
  data() {
    return {
      userId: parseInt(localStorage.getItem("ms_userId")),
      roleName: localStorage.getItem("ms_roleName"),
      info: {
        userName: "",
        school: "",
        academy: "",
        major: "",
        phoneNumber: ""
      },
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
          "http://localhost:8080/daoyunWeb/Login/getUserInfoById",
          {
            userId: this.userId
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(
          res => {
            console.log(res);
            if (res.status == 200) {
              if (res.data.code == 0) {
                this.info = res.data.data;
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
