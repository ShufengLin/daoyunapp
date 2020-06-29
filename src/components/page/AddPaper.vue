<template>
  <div class="add-container">
    <mu-card class="add-card" raised>
      <mu-form
        ref="form"
        :model="validateForm"
        label-position="left"
        label-width="100"
        class="mu-demo-form"
      >
        <mu-card-title title="新增Paper" sub-title="输入你的Paper信息"></mu-card-title>
        <mu-card-text>
          <mu-form-item label="paperName" help-text prop="paperName" :rules="rules.notNull">
            <mu-text-field v-model="validateForm.paperName"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="paperNum" help-text prop="paperNum" :rules="rules.notNull">
            <mu-text-field type="number" v-model.number="validateForm.paperNum"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="paperDetail" help-text prop="paperDetail" :rules="rules.notNull">
            <mu-text-field v-model="validateForm.paperDetail"></mu-text-field>
          </mu-form-item>
        </mu-card-text>
        <mu-card-actions>
          <mu-form-item>
            <mu-button color="secondary" @click="submit">确定</mu-button>
            <mu-button @click="cancel">取消</mu-button>
          </mu-form-item>
        </mu-card-actions>
      </mu-form>
    </mu-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "AddPaper",
  data() {
    return {
      validateForm: {
        paperName: "",
        paperNum: 0,
        paperDetail: ""
      },
      rules: {
        notNull: [
          { validate: val => !!val, message: "请输入信息", trigger: "blur" }
        ]
      }
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
          this.addPaper();
        }
      });
    },
    cancel() {
        this.$router.push("/test");
    },
    addPaper() {
      axios
        .post(
          "http://localhost:8080/daoyunWeb/testExample/addPaperJson",
          {
            paperName: this.validateForm.paperName,
            paperNum: this.validateForm.paperNum,
            paperDetail: this.validateForm.paperDetail
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(
          res => {
            console.log(res);
            if (res.status == 200) {
              if (res.data.code == 0) {
                this.$router.push("/test");
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
.add-container {
  width: 100%;
  background-image: linear-gradient(270deg, #8146b4, #6990f6);
  padding: 8px;
}
.mu-demo-form {
  width: 100%;
  /*max-width: 460px;*/
}
.add-card {
  width: 100%;
  max-width: 80%;
  margin: 50px auto;
}
</style>
