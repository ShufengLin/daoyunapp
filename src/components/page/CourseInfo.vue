<template>
  <div class="info-container">
    <mu-card class="info-card" raised>
      <mu-card-title title="课程信息"></mu-card-title>
      <mu-card-title sub-title="课程名称"></mu-card-title>
      <mu-card-text>{{info.courseName}}</mu-card-text>
      <mu-card-title sub-title="课时"></mu-card-title>
      <mu-card-text>{{info.courseHour}}</mu-card-text>
      <mu-card-title sub-title="开课时间"></mu-card-title>
      <!-- <mu-date-picker :should-disable-date="allowedDates" :date.sync="date3"></mu-date-picker> -->
      <mu-card-text>{{info.startTime | formatDate1}}</mu-card-text>
      <mu-card-title sub-title="上课地点"></mu-card-title>
      <mu-card-text>{{info.coursePlace}}</mu-card-text>
      <mu-divider></mu-divider>
      <mu-card-title sub-title="教师信息"></mu-card-title>
      <mu-card-text>{{info.userName}}</mu-card-text>
      <mu-divider></mu-divider>
      <mu-card-text>{{info.school}}</mu-card-text>
      <mu-card-text>{{info.academy}}</mu-card-text>
      <mu-card-text>{{info.major}}</mu-card-text>
      <mu-divider></mu-divider>
      <mu-card-text>{{"联系方式:"+info.phoneNumber}}</mu-card-text>
      <mu-divider></mu-divider>
      <mu-flex justify-content="center" align-items="center">
      <mu-button flat color="primary">
        <mu-icon left value="navigate_next"></mu-icon>参加班课
      </mu-button>
      <mu-button flat color="primary">
        <mu-icon left value="details"></mu-icon>班课成员
      </mu-button>
      </mu-flex>
      <mu-flex justify-content="center" align-items="center">
      <mu-button flat color="primary">
        <mu-icon left value="person_pin"></mu-icon>签到
      </mu-button>
      </mu-flex>
    </mu-card>
  </div>
</template>

<script>
import axios from "axios";
import { formatDate } from '../../tools/date.js'
export default {
  name: "courseInfo",
  data() {
    return {
      courseId:this.$route.params.Id,
      info: {
        courseName: "",
        courseHour: 0,
        startTime: 0,
        coursePlace: "",

        userName: "",
        school: "",
        academy: "",
        major: "",
        phoneNumber: ""
      }
    };
  },
    created: function() {
    this.getData();
  },
  filters: {
    formatDate1(time) {
    var date = new Date(time);
    return formatDate(date, 'yyyy年MM月dd日 hh:mm:ss'); 
    }
  },
  methods: {
    navigateTo(val) {
      this.$router.push(val);
    },
    getData(){
            axios
        .post(
          "http://localhost:8080/daoyunWeb/course/getCourseInfoById",
          {
            courseId:this.courseId
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
