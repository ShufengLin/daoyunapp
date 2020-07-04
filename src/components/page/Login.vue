<template>
  <div class="login-container">
    <mu-card class="login-card" raised>
      <mu-form ref="form" :model="validateForm" class="mu-demo-form">
        <mu-card-title sub-title="用户登录" title="到云"></mu-card-title>
        <mu-card-text>
          <mu-form-item label="用户名" help-text prop="userName" :rules="usernameRules">
            <mu-text-field v-model="validateForm.userName" prop="userName"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="密码" prop="password" :rules="passwordRules">
            <mu-text-field
              type="password"
              v-model="validateForm.password"
              prop="password"
              @keyup.enter="submit"
            ></mu-text-field>
          </mu-form-item>
          <!-- <mu-form-item>
            <mu-button flat>忘记密码？</mu-button>
            <mu-button flat @click="navigateTo('/register')">立即注册</mu-button>
          </mu-form-item> -->
        </mu-card-text>
        <mu-card-actions>
          <mu-form-item>
            <mu-button color="secondary" @click="submit">登录</mu-button>
            <mu-button flat @click="navigateTo('/register')">立即注册</mu-button>
          </mu-form-item>
        </mu-card-actions>
      </mu-form>
    </mu-card>
  </div>
</template>

<script>
import axios from "axios";
import Message from "muse-ui-message";
export default {
  name: "Login",
  data() {
    return {
      usernameRules: [{ validate: val => !!val, message: "必须填写用户名" }],
      passwordRules: [{ validate: val => !!val, message: "必须填写密码" }],
      validateForm: {
        userName: "",
        password: ""
      },
      userId: null,
      btnLoading: false
    };
  },
  methods: {
    navigateTo(val) {
      this.$router.push(val);
    },
    submit() {
      this.$refs.form.validate().then(result => {
        if (result == false) {
          this.$toast.warning("请填入账户密码！");
          return;
        } else {
          this.login()
        }
      });
    },
    clear() {
      this.$refs.form.clear();
      this.validateForm = {
        userName: "",
        password: ""
      };
    },
    login() {
      axios
        .post(
          "http://localhost:8080/daoyunWeb/Login/checkLogin",
          this.validateForm,
          { headers: { "Content-Type": "application/json" } }
        )
        .then(
          res => {
            console.log(res);
            if (res.status == 200) {
              console.log(res);
              if (res.data.code == 0) {
                localStorage.setItem("token", res.data.dataPlus);
                localStorage.setItem("ms_userName", this.validateForm.userName);
                localStorage.setItem("ms_userId", res.data.data.userId);
                this.$router.push("/");
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
.login-container {
  width: 100%;
  height: -webkit-fill-available;
  background-image: linear-gradient(270deg, #8146b4, #6990f6);
  padding: 8px;
}
.mu-demo-form {
  width: 100%;
  /*max-width: 460px;*/
}
.login-card {
  width: 100%;
  max-width: 400px;
  margin: 50px auto;
}
</style>
