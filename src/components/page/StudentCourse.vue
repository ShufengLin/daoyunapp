<template>
    <div id="order">
        <mu-container class="paperContainer">
            <mu-row>
                <mu-text-field v-model="query.courseName" placeholder="搜索班课"></mu-text-field>
                <mu-button icon color="primary" @click="handleSearch">
                    <mu-icon value="search"></mu-icon>
                </mu-button>
                <mu-button fab small color="primary" @click="addCourse()">
                    <mu-icon value="add"></mu-icon>
                </mu-button>
            </mu-row>
            <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
                <mu-list textline="three-line" class="paperList">
                    <mu-sub-header>班课</mu-sub-header>
                    <mu-row gutter>
                        <mu-col xl="12" lg="12" md="12" sm="12" span="12">
                            <!--:style="'background-color:'+ getStaColor(order.orderStatus)"-->
                            <mu-list-item
                                    avatar
                                    button
                                    :ripple="true"
                                    class="courseItem"
                                    v-for="(course,index) in courseList"
                                    @click="toDetail(course.courseId)"
                                    :key="course.courseId"
                            >
                                <mu-list-item-action>
                                    <!--<mu-avatar text-color="primary">-->
                                    <mu-button style="min-width: 20px" color="primary">
                                        <!--<mu-icon value="payment" color="primary"></mu-icon>-->
                                        {{ index + 1 }}
                                    </mu-button>

                                    <!--</mu-avatar>-->
                                </mu-list-item-action>
                                <mu-list-item-content>
                                    <mu-list-item-title style="color: black;font-size: 1.2em;font-weight: bolder">
                                        {{ course.courseName }}
                                        <!--<mu-badge :content="order.orderType" color="primary"></mu-badge>-->
                                    </mu-list-item-title>
                                    <mu-list-item-sub-title>{{course.courseHour}}</mu-list-item-sub-title>
                                    <mu-list-item-sub-title>{{course.coursePlace}}</mu-list-item-sub-title>
                                </mu-list-item-content>
                                <mu-list-item-action>
                                    <mu-checkbox disabled v-if=exist(course.courseId) v-model="select" uncheck-icon="favorite_border" checked-icon="favorite" ></mu-checkbox>
                                </mu-list-item-action>
                                <mu-list-item-action>
                                    <!-- <mu-badge
                                    :content="order.orderStatus|getOrderStatus"
                                    :color="order.orderStatus|getStatusColor"
                                    ></mu-badge>-->
                                    <!--<mu-button small round color="green">查看详情</mu-button>-->
                                </mu-list-item-action>
                            </mu-list-item>
                        </mu-col>
                    </mu-row>
                </mu-list>
            </mu-load-more>
            <mu-card v-show="listSize == 0" style="width: 100%; margin: 0 auto;border-radius: 5px" raised>
                <mu-card-title title="暂无条目" sub-title></mu-card-title>
                <mu-card-text>
                    <mu-button to="/">回到首页</mu-button>
                </mu-card-text>
            </mu-card>
        </mu-container>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: "test",
        data() {
            return {
                userId: 0,
                open: false,
                trigger: null,
                listSize: 0,
                stulistSize:0,
                selectTotal: 0,
                select:false,
                query: {
                    page: 1,
                    pageSize: 6,
                    courseName: "",
                    userId:parseInt(localStorage.getItem("ms_userId"))
                },
                refreshing: false,
                loading: false,
                courseList: [],
                stucourseList:[]
            };
        },
        created: function() {
            this.fetchData();
            this.getData();
            this.getDataCount();
        },
        methods: {
            navigateTo(val) {
                this.$router.push(val);
            },
            getStaColor(val) {
                var status = "";
                switch (val) {
                    case -1:
                        status = "error";
                        break;
                    case 0:
                        status = "warning";
                        break;
                    case 1:
                        status = "greenA400";
                        break;
                    case 2:
                        status = "#2196f3";
                        break;
                    case 3:
                        status = "info";
                        break;
                }
                return status;
            },
            toDetail(id) {
                this.$router.push({
                    name:'courseInfo',
                    path: "/courseInfo",
                    params: {
                        Id: id
                    }
                });
            },
            fetchData() {
                axios
                    .post(
                        "http://localhost:8080/daoyunWeb/course/getStudentOwnCourseByPage",
                        {
                            page: this.query.page,
                            pageSize: this.query.pageSize,
                            userId: this.query.userId,
                            courseName: this.query.courseName
                        },
                        { headers: { "Content-Type": "application/json" } }
                    )
                    .then(
                        res => {
                            console.log(res);
                            if (res.status == 200) {
                                if (res.data.code == 0) {
                                    for(let k = 0; k < res.data.data.length; k++){
                                    this.stucourseList = this.stucourseList.concat(res.data.data[k].courseId);
                                    // this.stucourseList = res.data.data[0].courseId;
                                    console.log(111)
                                    console.log(this.stucourseList)
                                    console.log(res.data.data)
                                    console.log(111)
                                    this.stulistSize = this.stucourseList.length;
                                    this.$toast.success(res.data.msg);}
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
            test() {
                this.$toast.message("test");
            },
            getData() {
                axios
                    .post(
                        "http://localhost:8080/daoyunWeb/course/getCourseByPage",
                        {
                            page: this.query.page,
                            pageSize: this.query.pageSize,
                            courseName: this.query.courseName
                        },
                        { headers: { "Content-Type": "application/json" } }
                    )
                    .then(
                        res => {
                            console.log(res);
                            if (res.status == 200) {
                                if (res.data.code == 0) {
                                    this.courseList = this.courseList.concat(res.data.data);
                                    this.listSize = this.courseList.length;
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
            },
            getDataCount() {
                //TODO 待加入搜索限定参数
                axios
                    .post(
                        "http://localhost:8080/daoyunWeb/course/getCourseCount",
                        { courseName: this.query.courseName },
                        { headers: { "Content-Type": "application/json" } }
                    )
                    .then(
                        res => {
                            console.log(res);
                            if (res.status == 200) {
                                this.selectTotal = res.data.data;
                            }
                        },
                        error => {
                            console.log(error);
                        }
                    );
            },
            refresh() {
                this.refreshing = true;
                //this.$refs.container.scrollTop = 0;
                setTimeout(() => {
                    this.refreshing = false;
                    this.courseList = [];
                    this.query.page = 1;
                    this.getData();
                    this.getDataCount();
                }, 2000);
            },
            load() {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    if (this.query.page < this.selectTotal / this.query.pageSize) {
                        this.query.page++;
                        this.getData();
                    } else {
                        this.$toast.message("没有更多数据了");
                    }
                }, 2000);
            },
            handleSearch() {
                this.courseList = [];
                this.$set(this.query, "page", 1);
                this.getData();
                this.getDataCount();
            },
            addCourse(){
                this.$router.push("/addCourse");
            },
            exist(val){
                if(this.stucourseList.some(item => item==val)){
                    return true
                }
                else return false
            }
        }
    };
</script>

<style scoped>
    .paperContainer {
        padding: 10px;
    }
    .paperList {
        padding: 16px 8px;
    }
    .paperItem {
        border-radius: 5px;
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
        0 1px 10px 0 rgba(0, 0, 0, 0.12);
        margin: 15px 2px;
    }
</style>
