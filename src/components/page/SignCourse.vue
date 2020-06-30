<template>
  <div class="sign-container">
    <mu-card class="sign-card" raised>
      <mu-card-title title="签到" sub-title="查看你的签到信息"></mu-card-title>
        <mu-row justify-content="center">
          <mu-avatar :size="200" @click="sign">
            <img src="../../assets/imgs/work1.jpeg" />
          </mu-avatar>
        </mu-row>

      <mu-card-title sub-title="签到信息"></mu-card-title>
      <mu-card-text>{{signDetailInfo}}</mu-card-text>
    </mu-card>
    <mu-dialog title="定位地图" width="360" :open.sync="mapVisible">

    </mu-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignCourse",
  data() {
    return {
      signInfo: "开始签到",
      signDetailInfo: "",
      signStatus: false,
      center: {lng: 0, lat: 0},
      mapVisible: false,
                      locData:{
                    longitude:'',
                    latitude:'',
                    address:'',
                },
                clientHeight:document.documentElement.clientHeight-90, // 屏幕高度
    };
  },
  methods: {
    navigateTo(val) {
      this.$router.push(val);
    },
    sign() {
    },

            //点击地图监听
            clickEvent(e){
                map.clearOverlays();
                let Icon_0 = new BMap.Icon("icon/map_marker_check.png", new BMap.Size(64, 64), {anchor: new BMap.Size(18, 32),imageSize: new BMap.Size(36, 36)});
                var myMarker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat),{icon: Icon_0});
                map.addOverlay(myMarker);
                //用所定位的经纬度查找所在地省市街道等信息
                var point = new BMap.Point(e.point.lng, e.point.lat);
                var gc = new BMap.Geocoder();
                let _this = this;
                gc.getLocation(point, function (rs) {
                    var addComp = rs.addressComponents;
                    //console.log(rs.address);//地址信息
                    _this.locData.address = rs.address;
 
                });
                this.locData.longitude = e.point.lng;
                this.locData.latitude = e.point.lat;
            },
            //定位成功回调
            getLoctionSuccess(point, AddressComponent, marker){
                map.clearOverlays();
                let Icon_0 = new BMap.Icon("icon/map_marker_check.png", new BMap.Size(64, 64), {anchor: new BMap.Size(18, 32),imageSize: new BMap.Size(36, 36)});
                var myMarker = new BMap.Marker(new BMap.Point(point.point.lng, point.point.lat),{icon: Icon_0});
                map.addOverlay(myMarker);
                this.locData.longitude = point.point.lng;
                this.locData.latitude = point.point.lat;
            },
            findlocation(){
                this.$emit("findlocdata",this.locData)
                this.mapVisible = false
            },
            mapShow(){
                this.mapVisible = true
            }
        }
  };
</script>

<style scoped>
.sign-container {
  width: 100%;
  background-image: linear-gradient(270deg, #8146b4, #6990f6);
  padding: 8px;
  height: 600px;
}
.mu-demo-form {
  width: 100%;
  /*max-width: 460px;*/
}
.sign-card {
  width: 100%;
  max-width: 80%;
  margin: 50px auto;
}
</style>
