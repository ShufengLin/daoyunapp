<template>
  <div class="info-container">
    <mu-card class="info-card" raised>
      <mu-card-title title="课程信息"></mu-card-title>
      <mu-card-title sub-title="课程名称"></mu-card-title>
      <mu-card-text>{{courseInfo.courseName}}</mu-card-text>
      <mu-card-title sub-title="课时"></mu-card-title>
      <mu-card-text>{{courseInfo.courseHour}}</mu-card-text>
      <mu-card-title sub-title="开课时间"></mu-card-title>
      <mu-card-text>{{courseInfo.startTime}}</mu-card-text>
      <mu-card-title sub-title="上课地点"></mu-card-title>
      <mu-card-text>{{courseInfo.coursePlace}}</mu-card-text>
      <mu-divider></mu-divider>
      <mu-card-title sub-title="教师信息"></mu-card-title>
      <mu-card-text>{{teacherInfo.teacherName}}</mu-card-text>
      <mu-divider></mu-divider>
      <mu-card-text>{{teacherInfo.teacherSchool}}</mu-card-text>
      <mu-card-text>{{teacherInfo.teacherAcademy}}</mu-card-text>
      <mu-card-text>{{teacherInfo.teacherMajor}}</mu-card-text>
      <mu-divider></mu-divider>
      <mu-card-text>{{teacherInfo.teacherPhone}}</mu-card-text>
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

export default {
  name: "CourseInfo",
  data() {
    return {
      courseInfo: {
        courseName: "",
        courseHour: 0,
        startTime: 0,
        coursePlace: ""
      },
      teacherInfo: {
        teacherName: "",
        teacherSchool: "",
        teacherAcademy: "",
        teacherMajor: "",
        teacherPhone: 0
      }
    };
  },
  methods: {
    navigateTo(val) {
      this.$router.push(val);
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
