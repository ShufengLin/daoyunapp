<template>
  <div id="index" >
  <mu-appbar style="width: 100%;" class="appBar" z-depth="0" color="primary">
    <mu-button icon slot="left" @click="open = !open">
      <mu-icon value="menu"></mu-icon>
    </mu-button>
    <mu-button flat  @click="navigateTo('/')"><h2>到云</h2></mu-button>
    <mu-menu slot="right" open-on-hover >
      <mu-button flat>
        <mu-chip class="demo-chip" color="primary">
          <mu-avatar :size="32" color="secondary">
            <mu-icon value="account_circle"> </mu-icon>
          </mu-avatar>
          {{ username  }}
        </mu-chip>
      </mu-button>
      <mu-list slot="content">
        <mu-list-item button @click="navigateTo('/login')">
          <mu-list-item-content>
            <mu-list-item-title>查看个人信息</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item button @click="navigateTo('/login')">
          <mu-list-item-content>
            <mu-list-item-title>查看我的班课</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item button @click="logout()">
          <mu-list-item-content>
            <mu-list-item-title>注销</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
    </mu-menu>
    <mu-button  round flat slot="right" @click="navigateTo('/login')">登 录</mu-button>
  </mu-appbar>
  <router-view class="layout" />

    <mu-drawer :open.sync="open" :docked="docked" :z-depth="24" >
      <mu-list @click="open = !open">

        <mu-list-item button @click="navigateTo('/')">
          <mu-list-item-action>
            <mu-icon value="home"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>
            回到首页
          </mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click="navigateTo('/login')">
          <mu-list-item-action>
            <mu-icon value="hotel"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>
            查看班课
          </mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click="navigateTo('/login')">
          <mu-list-item-action>
            <mu-icon value="note"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>查看个人班课</mu-list-item-title>
        </mu-list-item>

      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'

    export default {
        name: "Index",
      data() {
        return {
          username : Cookies.get("username"),
          open: false,
          docked: false,
          right: false,
          hotelInfo: {
            address: null
          },
        }
      },
      created: function(){
          this.fetchData()
      },
      methods: {
          navigateTo(val){
            this.$router.push(val)
          },
        logout(){
          Cookies.remove("username")
          Cookies.remove("user_id")
          Cookies.remove("session")
          Cookies.remove("order_id")
          this.navigateTo("/")
        },
         fetchData(){
          getAllHotel().then(res => {
            this.hotelInfo = res.data[0]
          }).catch(err => {
            console.log(err)
            this.$toast.error(err.toString())
          })
        }
      }
    }
</script>

<style scoped>
  #index{
    padding: 0;

  }
  .appBar{
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 101;
    overflow: hidden;
    height:60px;
    /*background-image: linear-gradient(270deg,#8146b4,#6990f6);*/
  }
  .footer{
    text-align: center;
    color: #fff;
    padding: 50px 40px;
    /*background-image: linear-gradient(270deg,#8146b4,#6990f6);*/
    background-color: #2196f3;
  }
  .layout{
    margin-top: 60px;
  }
</style>
