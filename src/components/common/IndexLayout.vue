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
          <mu-list-item button @click="navigateTo('/login')">
            <mu-list-item-content>
              <mu-list-item-title>查看个人信息</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button @click="navigateTo('/mycourse')">
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
        <mu-list-item button @click="navigateTo('/course')">
          <mu-list-item-action>
            <mu-icon value="hotel"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>查看班课</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click="navigateTo('/mycourse')">
          <mu-list-item-action>
            <mu-icon value="note"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>查看我的班课</mu-list-item-title>
        </mu-list-item>
        <mu-sub-header>测试部分</mu-sub-header>
        <mu-list-item button @click="navigateTo('/test')">
          <mu-list-item-action>
            <mu-icon value="note"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>测试页面</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click="navigateTo('/signCourse')">
          <mu-list-item-action>
            <mu-icon value="note"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>班课签到</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "Index",
  data() {
    return {
      username: localStorage.getItem("ms_userName"),
      open: false,
      docked: false,
      right: false,
      hotelInfo: {
        address: null
      }
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
    this.isLogin();
    this.fetchData();
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
      this.navigateTo("/login");
    },
    fetchData() {}
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
