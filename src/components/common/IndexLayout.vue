<template>
  <div id="index">
    <mu-appbar style="width: 100%;" class="appBar" z-depth="0" color="primary">
      <mu-button icon slot="left" @click="open = !open">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      <mu-button flat @click="navigateTo('/')">
        <h2>到云</h2>
      </mu-button>

      <mu-menu v-if="isLogin()" slot="right" open-on-hover>
        <mu-button flat>
          <mu-chip class="demo-chip" color="primary">
            <mu-avatar :size="32" color="secondary">
              <mu-icon value="account_circle"></mu-icon>
            </mu-avatar>
            {{ username }}
          </mu-chip>
        </mu-button>
        <mu-list slot="content">
          <mu-list-item button @click="navigateTo('/personalInfo')">
            <mu-list-item-content>
              <mu-list-item-title>查看个人信息</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button @click="MycourseButtonClick()">
            <mu-list-item-content>
              <mu-list-item-title>查看我的班课</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button @click="logout()">
            <mu-list-item-content>
              <mu-list-item-title>注销</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>

      <mu-button v-if="!isLogin()" round flat slot="right" @click="navigateTo('/login')">登 录</mu-button>
    </mu-appbar>
    <router-view class="layout" />

    <mu-drawer :open.sync="open" :docked="docked" :z-depth="24">
      <mu-list @click="open = !open">
        <mu-sub-header>到云</mu-sub-header>
        <mu-list-item button @click="navigateTo('/')">
          <mu-list-item-action>
            <mu-icon value="home"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>回到首页</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click="CourseButtonClick()">
          <mu-list-item-action>
            <mu-icon value="hotel"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>查看班课</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click="MycourseButtonClick()">
          <mu-list-item-action>
            <mu-icon value="note"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>查看我的班课</mu-list-item-title>
        </mu-list-item>
        <mu-sub-header>我的</mu-sub-header>
        <mu-list-item button @click="navigateTo('/personalInfo')">
          <mu-list-item-action>
            <mu-icon value="note"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>查看个人信息</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click="logout()">
          <mu-list-item-action>
            <mu-icon value="note"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>注销</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import axios from "axios";

export default {
  name: "Index",
  data() {
    return {
      mycourse:"",
      course:"",
      username: localStorage.getItem("ms_userName"),
      open: false,
      docked: false,
      right: false,
      hotelInfo: {
        address: null
      },
      roleName: "",
      roleFlag: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(vm);
      // 每次进入路由执行
      vm.isLogin();
    });
  },
  created: function() {
    let loginFlag = this.isLogin();
    if (loginFlag) {
    this.getUserRole();
    const loading = this.$loading();
    this.timer = setTimeout(() => {
      this.checkRole();
      let roleFlag = this.roleFlag;
      if (!roleFlag) {
        this.logout();
      }
      loading.close();
    }, 500);
    }


  },
  methods: {
    isLogin() {
      let token = localStorage.getItem("token");
      if (token === null || token === "" || token === "undefined") {
        return false;
      } else {
        return true;
      }
    },

    navigateTo(val) {
      this.$router.push(val);
    },
    logout() {
      localStorage.removeItem("ms_userName");
      localStorage.removeItem("token");
      localStorage.removeItem("ms_userId");
      localStorage.removeItem("ms_roleId");
      localStorage.removeItem("ms_roleName");
      this.navigateTo("/login");
    },
    fetchData() {},
    getUserRole() {
      axios
        .post(
          "http://localhost:8080/daoyunWeb/userRole/getUserRoleByUserId",
          { userId: localStorage.getItem("ms_userId") },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(
          res => {
            console.log(res);
            if (res.status == 200) {
              console.log(res);
              if (res.data.code == 0) {
                localStorage.setItem("ms_roleId", res.data.data.roleId);
                localStorage.setItem("ms_roleName", res.data.data.roleName);
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
    checkRole() {
      this.roleName = localStorage.getItem("ms_roleName");
      if (this.roleName == "老师" || this.roleName == "学生") {
        //this.$toast.success("登录成功");
        this.roleFlag = true;
      } else {
        this.$toast.message("请使用老师或者学生账号登录");
        this.roleFlag = false;
      }
    },
    CourseButtonClick(){
      let rolename=localStorage.getItem("ms_roleName");
      if (rolename == "老师"){
        this.course="/course"
        console.log(this.course)
        this.navigateTo(this.course)
      }
      if (rolename=="学生"){
        this.course="/studentcourse"
        console.log(this.course)
        this.navigateTo(this.course)
      }
    },
    MycourseButtonClick(){
      let rolename=localStorage.getItem("ms_roleName");
      if (rolename == "老师"){
        this.mycourse="/mycourse"
        console.log(this.mycourse)
        this.navigateTo(this.mycourse)
      }
      if (rolename=="学生"){
        this.mycourse="/studentmycourse"
        console.log(this.mycourse)
        this.navigateTo(this.mycourse)
      }
    }
  }
};
</script>

<style scoped>
#index {
  padding: 0;
}
.appBar {
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 101;
  overflow: hidden;
  height: 60px;
  /*background-image: linear-gradient(270deg,#8146b4,#6990f6);*/
}
.footer {
  text-align: center;
  color: #fff;
  padding: 50px 40px;
  /*background-image: linear-gradient(270deg,#8146b4,#6990f6);*/
  background-color: #2196f3;
}
.layout {
  margin-top: 60px;
}
</style>
