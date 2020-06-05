<template>
  <div id="order">
    <mu-container class="orderContainer">
      <mu-row>
        <mu-appbar class="orderAppBar" color="primary">
          <mu-icon value="account_balance_wallet" slot="left"></mu-icon>新增条目
        </mu-appbar>
      </mu-row>
      <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
      <mu-list textline="three-line" class="paperList">
        <mu-row gutter>
          <mu-col xl="12" lg="12" md="12" sm="12" span="12">
            <!--:style="'background-color:'+ getStaColor(order.orderStatus)"-->
            <mu-list-item
              avatar
              button
              :ripple="true"
              class="paperItem"
              v-for="(paper,index) in paperList"
              @click="toDetail(paper.paperId)"
              :key="paper.paperId"
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
                  {{ paper.paperName }}
                  <!--<mu-badge :content="order.orderType" color="primary"></mu-badge>-->
                </mu-list-item-title>
                <mu-list-item-sub-title>
                  {{paper.paperNum}}
                </mu-list-item-sub-title>
                <mu-list-item-sub-title>
                  {{paper.paperDetail}}
                </mu-list-item-sub-title>
              </mu-list-item-content>
              <mu-list-item-action>
                <!-- <mu-badge
                  :content="order.orderStatus|getOrderStatus"
                  :color="order.orderStatus|getStatusColor"
                ></mu-badge> -->
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
          <mu-button>回到首页</mu-button>
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
      query: {
        page: 1,
        pageSize: 6,
        paperName: ""
      },
      paperList: []
    };
  },
  created: function() {
    this.fetchData();
    this.getData();
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
        path: "/",
        name: "",
        params: {
          orderId: id
        }
      });
    },
    fetchData() {},
    test() {
      this.$toast.message("test");
    },
    getData() {
      axios
        .post(
          "http://localhost:8080/daoyunWeb/testExample/getPaperByPage",
          {
            page: this.query.page,
            pageSize: this.query.pageSize,
            paperName: this.query.paperName
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(
          res => {
            console.log(res);
            if (res.status == 200) {
              if (res.data.code == 0) {
                this.paperList = res.data.data;
                this.listSize = this.paperList.length;
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
    }
  }
};
</script>

<style scoped>
.orderAppBar {
  height: 40px;
  width: auto !important;
  border-radius: 30px;
  /*position: -webkit-sticky;*/
  /*position: sticky;*/
  /*top: 0;*/
  margin: 10px;
  /*background-color: #e91e63;*/
  color: #fff;
  padding: 10px;
}
.orderContainer {
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