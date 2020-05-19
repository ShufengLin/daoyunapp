<template>
  <div class="hello">
        <mu-paper class="banner">
          <img src="../../assets/logo26.png" class="logo">
          <h1>{{ appInfo.appName }}</h1>
          <h2>便捷的教学助手</h2>
          <p v-if="!isLogin()">
            <mu-button color="secondary" @click="navigateTo('/login')">
              <b>立即登录</b>
            </mu-button>
            <mu-button @click="navigateTo('/register')">立即注册</mu-button>
          </p>
          <p v-else-if="isLogin()">
            <mu-button color="secondary" @click="navigateTo('/room')">
            浏览班课
            </mu-button>
            <mu-button color="" @click="navigateTo('/order')">查看个人班课</mu-button>
          </p>
        </mu-paper>
    <!-- -->
  </div>
</template>

<script>
  import indexImg1 from '../../assets/imgs/index1.png'
  import indexImg2 from '../../assets/imgs/index2.png'
  import indexImg3 from '../../assets/imgs/index3.png'

  export default {
  name: 'IndexPage',
  data () {
    return {
      indexImg1,
      indexImg2,
      indexImg3,
      appInfo: {
        appName: "到云",
        address: ""
      }
    }
  },
  created: function() {
    this.isLogin()
    this.fetchData()
  },
  methods:{
        isLogin() {
      let token = localStorage.getItem("token");
      if (token === null || token === "" || token === "undefined") {
        return false;
      } else {
        return true;
      }
    },
    navigateTo(val) {
      this.$router.push(val);
    },
    fetchData(){
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo{
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
  .banner {
    /*margin-top: 64px;*/
    display: flex;
    flex-direction: column;
    /*background-image: linear-gradient(270deg,#8146b4,#6990f6);*/
    background-color: #2196f3;
    height: 600px;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
.carousel img{
    width: inherit;
  }
.demo-paper,.hello{
  text-align: center;
}
  .demo-paper img{
    width: 300px;
  }
  .footer{
    text-align: center;
    color: #fff;
    padding: 50px 40px;
    background-color: #2196f3;
    /*background-image: linear-gradient(270deg,#8146b4,#6990f6);*/
  }
.gridlist-inline-demo {

  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
</style>
