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
                <mu-card-title title="新增班课" sub-title="输入你的班课信息"></mu-card-title>
                <mu-card-text>
                    <mu-form-item label="courseName" help-text prop="courseName" :rules="rules.notNull">
                        <mu-text-field v-model="validateForm.courseName"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item label="courseHour" help-text prop="courseHour" :rules="rules.notNull">
                        <mu-text-field type="number" v-model.number="validateForm.courseHour"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item label="userName" help-text prop="userName" :rules="rules.notNull">
                        <mu-text-field v-model="validateForm.userName"></mu-text-field>
                    </mu-form-item>
                    <mu-form-item label="coursePlace" help-text prop="coursePlace" :rules="rules.notNull">
                        <mu-text-field v-model="validateForm.coursePlace"></mu-text-field>
                    </mu-form-item>
                    <mu-date-input  icon="today" v-model="validateForm.startTime" label="设置开课时间" container="dialog" type="dateTime" label-float full-width landscape></mu-date-input>
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
        name: "AddCourse",
        data() {
            return {
                validateForm: {
                    courseName: "",
                    courseHour: 0,
                    userName:"",
                    coursePlace: "",
                    startTime:undefined
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
                        this.addCourse();
                    }
                });
            },
            cancel() {
                this.$router.push("/course");
            },
            addCourse() {
                axios
                    .post(
                        "http://localhost:8080/daoyunWeb/course/addCourseJson",
                        {
                            courseName: this.validateForm.courseName,
                            courseHour: this.validateForm.courseHour,
                            userName: this.validateForm.userName,
                            coursePlace: this.validateForm.coursePlace,
                            startTime:this.validateForm.startTime
                        },
                        { headers: { "Content-Type": "application/json" } }
                    )
                    .then(
                        res => {
                            console.log(res);
                            if (res.status == 200) {
                                if (res.data.code == 0) {
                                    this.$router.push("/course");
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
