<template>
  <div class="sign-container">
    <mu-card class="sign-card" raised>
      <mu-card-title title="签到" sub-title="查看你的签到信息"></mu-card-title>
      <mu-row justify-content="center">
        <mu-avatar :size="200" @click="openMap">
          <img src="../../assets/imgs/work1.jpeg" />
        </mu-avatar>
      </mu-row>

      <mu-card-title sub-title="签到信息"></mu-card-title>
      <mu-card-text>{{signDetailInfo}}</mu-card-text>
    </mu-card>
    <mu-dialog title="定位地图" width="360" :open.sync="mapVisible">
      <baidu-map
        class="map"
        :center="center"
        :zoom="zoom"
        @ready="handler"
        :scroll-wheel-zoom="true"
        ak="D2xjGaKU7fbcrXMkoUiKiD15uPdEdOfZ"
      >
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :showAddressBar="true"
          :autoLocation="true"
          @locationSuccess="getLoctionSuccess"
        ></bm-geolocation>
        <bm-view
          :style="{width:'100%',height: this.clientHeight+'px',flex: 1,marginBottom:'-30px'}"
        ></bm-view>
      </baidu-map>
      <mu-button slot="actions" flat color="primary" @click="sign">签到</mu-button>
      <mu-button slot="actions" flat color="primary" @click="closeMap">取消</mu-button>
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
      center: { lng: 0, lat: 0 },
      mapVisible: false,
      locData: {
        longitude: "",
        latitude: "",
        address: ""
      },
      zoom: 12,
      clientHeight: document.documentElement.clientHeight - 350 // 屏幕高度
    };
  },
  methods: {
    navigateTo(val) {
      this.$router.push(val);
    },
    //定位代码
    handler({ BMap, map }) {
      let _this = this;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          _this.center = { lng: r.longitude, lat: r.latitude };
          _this.autoLocationPoint = { lng: r.longitude, lat: r.latitude };
          _this.initLocation = true;
        },
        { enableHighAccuracy: true }
      );
      window.map = map;
    },
    sign() {
      if (this.locData.address == "") {
        this.$toast.warning("请先点击小圆点进行定位");
      } else {
        this.timer = setTimeout(() => {
          //设置延迟执行
          this.$toast.message(
            "您的位置：" +
              this.locData.address +
              this.locData.longitude +
              "," +
              this.locData.latitude
          );
          this.mapVisible = false;
        }, 500);
      }
    },
    // //点击地图监听
    // clickEvent(e) {
    //   map.clearOverlays();
    //   let Icon_0 = new BMap.Icon(
    //     require("../../assets/map_marker_check.png"),
    //     new BMap.Size(64, 64),
    //     { anchor: new BMap.Size(18, 32), imageSize: new BMap.Size(36, 36) }
    //   );
    //   var myMarker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat), {
    //     icon: Icon_0
    //   });
    //   map.addOverlay(myMarker);
    //   //用所定位的经纬度查找所在地省市街道等信息
    //   var point = new BMap.Point(e.point.lng, e.point.lat);
    //   var gc = new BMap.Geocoder();
    //   let _this = this;
    //   gc.getLocation(point, function(rs) {
    //     var addComp = rs.addressComponents;
    //     //console.log(rs.address);//地址信息
    //     _this.locData.address = rs.address;
    //   });
    //   this.locData.longitude = e.point.lng;
    //   this.locData.latitude = e.point.lat;
    // },
    //定位成功回调
    getLoctionSuccess(point, AddressComponent, marker) {
      map.clearOverlays();
      let Icon_0 = new BMap.Icon(
        require("../../assets/map_marker_check.png"),
        new BMap.Size(64, 64),
        { anchor: new BMap.Size(18, 32), imageSize: new BMap.Size(36, 36) }
      );
      var myMarker = new BMap.Marker(
        new BMap.Point(point.point.lng, point.point.lat),
        { icon: Icon_0 }
      );
      map.addOverlay(myMarker);
      var gc = new BMap.Geocoder();
      let _this = this;
      gc.getLocation(point.point, function(rs) {
        var addComp = rs.addressComponents;
        _this.locData.address = rs.address;
      });
      this.locData.longitude = point.point.lng;
      this.locData.latitude = point.point.lat;
    },
    findlocation() {
      this.$emit("findlocdata", this.locData);
      this.mapVisible = false;
    },
    openMap() {
      this.mapVisible = true;
    },
    closeMap() {
      this.mapVisible = false;
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
