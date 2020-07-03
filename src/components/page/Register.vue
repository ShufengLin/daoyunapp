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
        <mu-card-title title="到云" sub-title="用户注册"></mu-card-title>
        <mu-card-text>
          <mu-form-item label="用户名" help-text prop="userName" :rules="rules.notNull">
            <mu-text-field v-model="validateForm.userName"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="密码" prop="password" :rules="rules.password">
            <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="确认密码" prop="password2" :rules="rules.password2">
            <mu-text-field type="password" v-model="validateForm.password2" prop="password2"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="手机号" help-text prop="phoneNumber" :rules="rules.notNull">
            <mu-text-field v-model="validateForm.phoneNumber"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="学校" help-text prop="school" :rules="rules.notNull">
            <mu-text-field v-model="validateForm.school"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="学院" help-text prop="academy" :rules="rules.notNull">
            <mu-text-field v-model="validateForm.academy"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="专业" help-text prop="major" :rules="rules.notNull">
            <mu-text-field v-model="validateForm.major"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="roleName" label="角色" :rules="rules.notNull">
            <mu-radio v-model="validateForm.roleName" value="学生" label="学生"></mu-radio>
            <mu-radio v-model="validateForm.roleName" value="老师" label="老师"></mu-radio>
          </mu-form-item>
          <mu-button flat @click="navigateTo('/login')">已有账号？立即登录</mu-button>
        </mu-card-text>
        <mu-card-actions>
          <mu-form-item>
            <mu-button color="secondary" @click="submit">注册</mu-button>
            <mu-button @click="clear">重置</mu-button>
          </mu-form-item>
        </mu-card-actions>
      </mu-form>
    </mu-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Register",
  data() {
    return {
      validateForm: {
        userName: "",
        password: "",
        password2: "",
        name: "",
        roleName: "学生",
        phoneNumber: "",
        email: "",
        school: "",
        academy: "",
        major:""
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
          this.register();
        }
      });
    },
    clear() {
      this.$refs.form.clear();
      this.validateForm = {
        userName: "",
        password: "",
        password2: "",
        name: "",
        roleName: "学生",
        phoneNumber: "",
        email: "",
        school: "",
        academy: "",
        major:""
      };
    },
    register() {
      axios
        .post(
          "http://localhost:8080/daoyunWeb/Login/register",
          this.validateForm,
          { headers: { "Content-Type": "application/json" } }
        )
        .then(
          res => {
            console.log(res);
            if (res.status == 200) {
              console.log(res);
              if (res.data.code == 0) {
                this.$toast.success(res.data.msg);
                this.$router.push("/login");
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
