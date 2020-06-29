<template>
    <baidu-map @ready="handler">
    </baidu-map>
<!--    <mu-button color="secondary" @click="sign">签到</mu-button>-->
</template>
<script>
    import Vue from 'vue'
    import BaiduMap from 'vue-baidu-map'

    Vue.use(BaiduMap, {
        // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
        ak: 'D2xjGaKU7fbcrXMkoUiKiD15uPdEdOfZ'
    })

    export default {
        data () {
            return {
                center: {lng: 0, lat: 0},
                zoom: 3
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
                        alert('您的位置：'+r.point.lng+','+r.point.lat);

                },{enableHighAccuracy: true})
            },
            sign(){
                alert('您的位置：'+ this.center.lng+','+ this.center.lat);
            }
        }
    }

</script>