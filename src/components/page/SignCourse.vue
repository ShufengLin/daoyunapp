<template>
  <div class="sign-container">
    <mu-card class="sign-card" raised>
      <mu-card-title title="签到" sub-title="根据提示信息对按钮进行操作"></mu-card-title>
      <mu-divider></mu-divider>
      <mu-card-text>{{remindInfo}}</mu-card-text>
      <mu-row justify-content="center">
        <!-- <p v-if="colorStatus == 1">
          <mu-avatar color="blue200" :size="200" @click="openMap">
            <mu-icon value="add_location"></mu-icon>
          </mu-avatar>
        </p>
        <p v-else-if="colorStatus == 2">
          <mu-avatar color="red400" :size="200" @click="stopSign">
            <mu-icon value="add_location"></mu-icon>
          </mu-avatar>
        </p>
        <p v-else-if="colorStatus == 3">
          <mu-avatar color="blueGrey400" :size="200">
            <mu-icon value="add_location"></mu-icon>
          </mu-avatar>
        </p>
        <p v-else-if="colorStatus == 4">
          <mu-avatar color="blue200" :size="200" @click="openMap">
            <mu-icon value="add_location"></mu-icon>
          </mu-avatar>
        </p>-->
        <p v-if="colorStatus == 1">
          <mu-avatar color="blue200" :size="200" @click="openMap">
            <mu-icon value="add_location"></mu-icon>
          </mu-avatar>
        </p>
        <p v-else-if="colorStatus == 2">
          <mu-avatar color="red400" :size="200" @click="stopSign">
            <mu-icon value="add_location"></mu-icon>
          </mu-avatar>
        </p>
        <p v-else-if="colorStatus == 3">
          <mu-avatar color="blueGrey400" :size="200">
            <mu-icon value="add_location"></mu-icon>
          </mu-avatar>
        </p>
        <p v-else-if="colorStatus == 4">
          <mu-avatar color="blue200" :size="200" @click="openMap">
            <mu-icon value="add_location"></mu-icon>
          </mu-avatar>
        </p>
      </mu-row>
      <!-- <mu-card-title sub-title="签到信息"></mu-card-title>
      <mu-card-text>{{signInfo}}</mu-card-text>-->
      <mu-divider></mu-divider>
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
  name: "signCourse",
  data() {
    return {
      courseId: parseInt(localStorage.getItem("courseId")),
      remindInfo: "",
      signInfo: "",
      signDetailInfo: "没有定位信息",
      signStatus: false,
      center: { lng: 0, lat: 0 },
      mapVisible: false,
      locData: {
        longitude: "",
        latitude: "",
        address: ""
      },
      colorStatus: 0,
      zoom: 12,
      clientHeight: document.documentElement.clientHeight - 350, // 屏幕高度
      isSign: 0,
      userId: parseInt(localStorage.getItem("ms_userId"))
    };
  },
  created: function() {
    this.getIsSign();
    setTimeout(() => {
      this.roleController();
    }, 500);
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
        const loading = this.$loading();
        switch (this.colorStatus) {
          case 1: //教师发起签到情况
            this.beginSign();
            this.timer = setTimeout(() => {
              //window.location.reload();
              this.roleController();
              this.signDetailInfo = this.locData.address;
              this.mapVisible = false;
              loading.close();
            }, 500);
            break;
          case 2: //教师关闭签到情况
            // this.timer = setTimeout(() => {
            //   window.location.reload();
            //   this.signDetailInfo = this.locData.address;
            //   this.mapVisible = false;
            // }, 500);
            break;
          case 3: //学生 签到结束
            // window.location.reload();
            // this.mapVisible = false;
            break;
          case 4: //学生 开始签到
            this.studentSign();
            this.timer = setTimeout(() => {
              //window.location.reload();
              this.roleController();
              this.signDetailInfo = this.locData.address;
              this.mapVisible = false;
              loading.close();
            }, 500);
            break;
          default:
            window.location.reload();
            this.mapVisible = false;
            break;
        }

        //loading.close();
        // const loading = this.$loading();
        // this.timer = setTimeout(() => {
        //   //设置延迟执行
        //   this.$toast.message(
        //     "您的位置：" +
        //       this.locData.address +
        //       this.locData.longitude +
        //       "," +
        //       this.locData.latitude
        //   );
        //   this.signDetailInfo = this.locData.address;
        //   this.mapVisible = false;
        //   loading.close();
        // }, 500);
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
    },
    roleController() {
      if (localStorage.getItem("ms_roleName") == "老师") {
        if (this.isSign == 0) {
          //老师进入页面且课程处于关闭签到的状态
          this.remindInfo = "请点击签到按钮发起签到";
          this.colorStatus = 1;
        } else if (this.isSign == 1) {
          //老师进入页面且课程处于开始签到的状态
          this.remindInfo = "请点击签到按钮关闭签到";
          this.colorStatus = 2;
        }
      } else {
        if (this.isSign == 0) {
          //学生进入页面课程处于关闭签到的状态
          this.remindInfo = "本次签到结束";
          this.colorStatus = 3;
        } else if (this.isSign == 1) {
          //学生进入页面课程处于开始签到的状态
          this.remindInfo = "请点击签到按钮开始签到";
          this.colorStatus = 4;
        }
      }
    },
    getIsSign() {
      //TODO 待加入搜索限定参数
      axios
        .post(
          "http://localhost:8080/daoyunWeb/course/getIsSign",
          { courseId: this.courseId },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(
          res => {
            console.log(res);
            if (res.status == 200) {
              this.isSign = res.data.data;
            }
          },
          error => {
            console.log(error);
          }
        );
    },
    beginSign() {
      //TODO 待加入搜索限定参数
      axios
        .post(
          "http://localhost:8080/daoyunWeb/course/beginSign",
          {
            courseId: this.courseId,
            longitude: this.locData.longitude,
            latitude: this.locData.latitude
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(
          res => {
            console.log(res);
            if (res.status == 200) {
              this.coursedate = res.data.data;
              this.$toast.success(res.data.msg);
              this.isSign = 1;
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
          { courseId: this.courseId },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(
          res => {
            console.log(res);
            if (res.status == 200) {
              this.$toast.success(res.data.msg);
              this.isSign = 0;
            }
          },
          error => {
            console.log(error);
          }
        );
    },
    studentSign() {
      //TODO 待加入搜索限定参数
      axios
        .post(
          "http://localhost:8080/daoyunWeb/course/sign",
          {
            courseId: this.courseId,
            studentId: this.userId,
            longitude: this.locData.longitude,
            latitude: this.locData.latitude
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(
          res => {
            console.log(res);
            if (res.status == 200) {
              this.signStatus = res.data.data;
              if (res.data.data == 0) {
                this.$toast.message("不在签到范围内，请重新签到");
              } else if (res.data.data == 1) {
                this.$toast.success("签到成功");
              } else if (res.data.data == 2) {
                this.$toast.message("您已经签到成功过了，请勿重复签到");
              }
            }
          },
          error => {
            console.log(error);
          }
        );
    },
    stopSign() {
      const loading = this.$loading();
      this.closeSign();
      this.timer = setTimeout(() => {
        //window.location.reload();
        this.roleController();
        this.signDetailInfo = this.locData.address;
        this.mapVisible = false;
        loading.close();
      }, 500);
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
