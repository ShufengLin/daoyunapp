<template>
  <div class="login-container">
    <mu-card class="login-card" raised>
      <mu-form
        ref="form"
        :model="validateForm"
        label-position="left"
        label-width="100"
        class="mu-demo-form"
      >
        <mu-card-title title="到云" sub-title="修改密码"></mu-card-title>
        <mu-card-text>
          <mu-form-item label="旧密码" prop="oldPassword" :rules="rules.notNull">
            <mu-text-field type="password" v-model="validateForm.oldPassword" prop="oldPassword"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="新密码" prop="password" :rules="rules.password">
            <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="再次确认" prop="password2" :rules="rules.password2">
            <mu-text-field type="password" v-model="validateForm.password2" prop="password2"></mu-text-field>
          </mu-form-item>
        </mu-card-text>
        <mu-card-actions>
          <mu-form-item>
            <mu-button color="secondary" @click="submit">确认修改</mu-button>
            <mu-button @click="clear">重置</mu-button>
          </mu-form-item>
        </mu-card-actions>
      </mu-form>
    </mu-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "resetPassword",
  data() {
    return {
        userName:localStorage.getItem("ms_userName"),
      validateForm: {
        oldPassword: "",
        password: "",
        password2: ""
      },
      rules: {
        notNull: [
          { validate: val => !!val, message: "请输入信息", trigger: "blur" }
        ],
        password: [
          { validate: val => !!val, message: "请输入密码", trigger: "blur" }
        ],
        password2: [
          {
            validate: val => !!val,
            message: "请再次输入密码",
            trigger: "blur"
          },
          {
            validate: val => val === this.validateForm.password,
            message: "输入的两次密码不一致"
          }
        ]
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
        console.log(result);
        if (result == false) {
          this.$toast.warning("请输入必填项！");
          return;
        } else {
          this.changePassword();
        }
      });
    },
    clear() {
      this.$refs.form.clear();
      this.validateForm = {
        oldPassword: "",
        password: "",
        password2: ""
      };
    },
    changePassword() {
      axios
        .post(
          "http://localhost:8080/daoyunWeb/Login/changePassword",
          {userName: this.userName,password: this.validateForm.oldPassword,newPassword: this.validateForm.password},
          { headers: { "Content-Type": "application/json" } }
        )
        .then(
          res => {
            console.log(res);
            if (res.status == 200) {
              console.log(res);
              if (res.data.code == 0) {
                this.$toast.success(res.data.msg);
                this.alert();
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
    alert () {
      this.$alert('您已经成功修改密码，即将返回登录页重新登录', '提示', {
        okLabel: '知道了'
      }).then(() => {
          this.$router.push("/login");
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 100%;
  background-image: linear-gradient(270deg, #8146b4, #6990f6);
  padding: 8px;
}
.mu-demo-form {
  width: 100%;
  /*max-width: 460px;*/
}
.login-card {
  width: 100%;
  max-width: 80%;
  margin: 50px auto;
}
</style>
