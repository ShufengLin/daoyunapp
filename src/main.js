import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import Toast from 'muse-ui-toast'
import Loading from 'muse-ui-loading'
import 'muse-ui-loading/dist/muse-ui-loading.css'
import Cookies from 'js-cookie'
import  axios from 'axios'
import 'muse-ui-message/dist/muse-ui-message.css';
import Message from 'muse-ui-message';
import Router from 'vue-router'; 
import BaiduMap from 'vue-baidu-map'



const toastConfig = {
  position: 'bottom-start',               // 弹出的位置
  time: 2000,                       // 显示的时长
  closeIcon: 'close',               // 关闭的图标
  close: true,                      // 是否显示关闭按钮
  successIcon: 'check_circle',      // 成功信息图标
  infoIcon: 'info',                 // 信息信息图标
  warningIcon: 'priority_high',     // 提醒信息图标
  errorIcon: 'warning'
}
Vue.config.productionTip = false
Vue.use(Loading);
Vue.use(MuseUI)
Vue.use(Message);
Vue.use(Toast,toastConfig)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'D2xjGaKU7fbcrXMkoUiKiD15uPdEdOfZ'
})
Vue.use(Router)
const VueRouterPush = Router.prototype.push 
Router.prototype.push = function push (to) {//同一个路由重复添加，达到返回首页的效果
    return VueRouterPush.call(this, to).catch(err => err)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if(config.url.indexOf('/Login/checkLogin') >= 0){
      return config;
    }
    else{
      if (localStorage.getItem('token') && localStorage.getItem('token') != "undefined") {
        config.headers.token = localStorage.getItem('token');
      }
      return config;
    }
  },
  error => {
    return Promise.reject(error);
  });
