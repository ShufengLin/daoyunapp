<template>
    <div class="login-container" >
        <mu-card class="login-card" raised>
            <mu-form ref="form" :model="validateForm" class="mu-demo-form">
                <mu-card-actions>
                    <mu-form-item>
                        <baidu-map
                                class="map"
                                :center="center"
                                :zoom="zoom"
                                @ready="handler"
                                :scroll-wheel-zoom="true"
                                ak="D2xjGaKU7fbcrXMkoUiKiD15uPdEdOfZ"
                        > </baidu-map>
                        <mu-button color="secondary" @click="beginSign">发起签到</mu-button>
                        <mu-button @click="closeSign">结束签到</mu-button>
                        <mu-button color="secondary" @click="sign">签到</mu-button>
                        <mu-button color="secondary" @click="getIsSign">获取签到标志</mu-button>
                    </mu-form-item>
                </mu-card-actions>
            </mu-form>
        </mu-card>
    </div>
<!--    <mu-button color="secondary" @click="sign">签到</mu-button>-->
</template>
<script>
    import Vue from 'vue'
    import axios from "axios";

    export default {
        data () {
            return {
                courseData: [],
                center: {lng: 0, lat: 0},
                zoom: 3,
                isSign: 0
            }
        },
        methods: {
            //定位代码
            handler ({BMap, map}) {
                let _this = this;
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r){
                    _this.center = {lng : r.longitude, lat: r.latitude};
                    _this.autoLocationPoint = {lng : r.longitude, lat:r.latitude};
                    _this.initLocation = true;
                        alert('您的位置：'+this.point.lng+','+r.point.lat);

                },{enableHighAccuracy: true})
            },
            sign(){
                alert('您的位置：'+ this.center.lng+','+ this.center.lat);
            },
            beginSign() {
                //TODO 待加入搜索限定参数
                axios
                    .post(
                        "http://localhost:8080/daoyunWeb/course/beginSign",
                        { courseId: 1,
                                longitude: this.center.lng,
                                latitude: this.center.lat

                        },
                        { headers: { "Content-Type": "application/json" } }
                    )
                    .then(
                        res => {
                            console.log(res);
                            if (res.status == 200) {
                                this.coursedate = res.data.data;
                            }
                        },
                        error => {
                            console.log(error);
                        }
                    );
            },
            closeSign() {
                //TODO 待加入搜索限定参数
                axios
                    .post(
                        "http://localhost:8080/daoyunWeb/course/closeSign",
                        { courseId: 1
                        },
                        { headers: { "Content-Type": "application/json" } }
                    )
                    .then(
                        res => {
                            console.log(res);
                            if (res.status == 200) {
                                alert(res.data.msg);
                            }
                        },
                        error => {
                            console.log(error);
                        }
                    );
            },
            sign() {
                //TODO 待加入搜索限定参数
                axios
                    .post(
                        "http://localhost:8080/daoyunWeb/course/sign",
                        { courseId: 1,
                            studentId: 8,
                            longitude: this.center.lng,
                            latitude: this.center.lat

                        },
                        { headers: { "Content-Type": "application/json" } }
                    )
                    .then(
                        res => {
                            console.log(res);
                            if (res.status == 200) {
                                alert(res.data.data);
                            }
                        },
                        error => {
                            console.log(error);
                        }
                    );
            },
            getIsSign() {
                //TODO 待加入搜索限定参数
                axios
                    .post(
                        "http://localhost:8080/daoyunWeb/course/getIsSign",
                        { courseId: 1
                        },
                        { headers: { "Content-Type": "application/json" } }
                    )
                    .then(
                        res => {
                            console.log(res);
                            if (res.status == 200) {
                                this.isSign = res.data.data;
                                alert(this.isSign);
                            }
                        },
                        error => {
                            console.log(error);
                        }
                    );
            },
        }
    }

</script>
<style scoped>
    .login-container{
        width: 100%;
        height: -webkit-fill-available;
        background-image: linear-gradient(270deg,#8146b4,#6990f6);
        padding: 8px;
    }
    .mu-demo-form {
        width: 100%;
        /*max-width: 460px;*/
    }
    .login-card{
        width: 100%;
        max-width: 400px;
        margin: 50px auto;
    }
</style>