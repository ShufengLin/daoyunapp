import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/indexpage'
},
{
  path: '/login',
  component: () =>
      import ( /* webpackChunkName: "login" */ '../components/page/Login.vue'),
  meta: {
      title: '登录'
  }
},
{
  path: '/register',
  component:()=>
  import (/* webpackChunkName: "register" */'../components/page/Register.vue'),
  meta:{
    title:'注册'
  }
},
{
  path: '/resetPassword',
  component:()=>
  import (/* webpackChunkName: "resetPassword" */'../components/page/ResetPassword.vue'),
  meta:{
    title:'修改密码'
  }
},
    {
        path: '/sign',
        component:()=>
            import (/* webpackChunkName: "sign" */'../components/page/Sign.vue'),
        meta:{
            title:'签到'
        }
    },
{
  path: '/404',
  component: () =>
  import (/* webpackChunkName: "404" */'../components/page/404.vue'),
  meta:{
    title:'404'
  }
},
{
  path: '/indexlayout',
  component: () =>
      import ( /* webpackChunkName: "indexlayout" */ '../components/common/IndexLayout.vue'),
  children: [{
          path: '/indexpage',
          component: () =>
              import ( /* webpackChunkName: "indexpage" */ '../components/page/IndexPage.vue'),
          meta: {
              title: '首页'
          }
      },
      {
        path: '/test',
        component: () =>
            import ( /* webpackChunkName: "test" */ '../components/page/test.vue'),
        meta: {
            title: '测试页面'
        }
    },
  {
      path: '/course',
      component: () =>
          import ( /* webpackChunkName: "test" */ '../components/page/Course.vue'),
      meta: {
          title: '班课页面'
      }
  },
  {
      path: '/studentcourse',
      component: () =>
          import ( /* webpackChunkName: "test" */ '../components/page/StudentCourse.vue'),
      meta: {
          title: '班课页面'
      }
  },
    {
      path: '/mycourse',
      component: () =>
          import ( /* webpackChunkName: "test" */ '../components/page/Mycourse.vue'),
      meta: {
          title: '我的班课'
      }
    },
  {
      path: '/studentmycourse',
      component: () =>
          import ( /* webpackChunkName: "test" */ '../components/page/StudentMycourse.vue'),
      meta: {
          title: '我的班课'
      }
  },
  {
      path: '/coursedetail',
      name:'coursedetail',
      component: () =>
          import ( /* webpackChunkName: "test" */ '../components/page/CourseDetail.vue'),
      meta: {
          title: '班课学生'
      }
  },
    {
      path: '/addPaper',
      component: () =>
      import (/* webpackChunkName: "addPaper" */ '../components/page/AddPaper.vue'),
      meta: {
        title: '新增Paper'
      }
    },
      {
          path: '/addCourse',
          component: () =>
              import (/* webpackChunkName: "addPaper" */ '../components/page/AddCourse'),
          meta: {
              title: '新增班课'
          }
      },{
        path: '/signCourse',
        name: 'signCourse',
        component: () =>
        import (/* webpackChunkName: "signCourse"*/ '../components/page/SignCourse'),
        meta: {
          title: '班课签到'
        }
      },{
        path: '/courseInfo',
        name: 'courseInfo',
        component: () =>
        import(/* webpackChunkName: "courseInfo"*/ '../components/page/CourseInfo'),
        meta: {
          title: '课程信息'
        }
      },{
        path: '/personalInfo',
        name: 'personalInfo',
        component: () =>
        import(/* webpackChunkName: "personalInfo"*/ '../components/page/PersonalInfo'),
        meta: {
          title: '个人信息'
        }
      },
      {
        path: '/teacherSignInfo',
        name: 'teacherSignInfo',
        component: () =>
        import(/* webpackChunkName: "teacherSignInfo"*/ '../components/page/TeacherSignInfo'),
        meta: {
          title: '签到情况'
        }
      },
      {
        path: '/teacherSignDetail',
        name: 'teacherSignDetail',
        component: () =>
        import(/* webpackChunkName: "teacherSignDetail"*/ '../components/page/TeacherSignDetail'),
        meta: {
          title: '签到详情'
        }
      },
      {
        path: '/studentSignInfo',
        name: 'studentSignInfo',
        component: () =>
        import(/* webpackChunkName: "studentSignInfo"*/ '../components/page/StudentSignInfo'),
        meta: {
          title: '签到情况'
        }
      }
  ]
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
