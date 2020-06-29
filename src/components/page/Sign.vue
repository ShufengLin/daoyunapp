<template>
    <div class="wrap">
        <h3>店铺信息</h3>
        <a-form :form="form" @submit="handleSubmit" layout="vertical">
            <a-row :gutter="16">
                <a-col :span="24" style="height: 80px;">
                    <a-form-item required :label-col="labelCol" :wrapper-col="wrapperCol" label="请输入店铺名称">
                        <a-input
                                size="large"
                                placeholder="请输入店铺名称"
                                v-decorator="['openShopData.shopName', {rules: [{ required: true,whitespace: true, message: '请输入店铺名称'}]}]"
                        ></a-input>
                    </a-form-item>
                </a-col>
                <a-col :span="24" style="height: 80px;">
                    <a-form-item required :label-col="labelCol" :wrapper-col="wrapperCol" label="店铺地址">
                        <a-input-search
                                size="large"
                                placeholder="请输入店铺地址"
                                v-decorator="['openShopData.shopAdder', {rules: [{ required: true,whitespace: true, message: '请输入店铺地址'}]}]"
                                @search="onSearch"
                                enterButton
                        />
                        <!-- <a-select
                          showSearch
                          size="large"
                          placeholder="请输入店铺地址"
                          :defaultActiveFirstOption="false"
                          :showArrow="false"
                          v-decorator="['openShopData.shopAdder', {rules: [{ required: true,whitespace: true, message: '请输入店铺地址'}]}]"
                          :filterOption="false"
                          @search="handleSearch"
                          @change="handleChange"
                          :notFoundContent="null"
                        >
                          <a-select-option
                            v-for="d in data"
                            :key="d.uid"
                            :value="d.uid"
                          >{{ d.province+d.city+d.title }}</a-select-option>
                        </a-select>-->
                    </a-form-item>
                </a-col>
                <a-col :span="24" style="height: 80px;">
                    <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="门牌号">
                        <a-input
                                size="large"
                                placeholder="请输入门牌号"
                                v-decorator="['openShopData.hoseNum', {rules: [{ message: '请输入门牌号'}]}]"
                        ></a-input>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
        <a-spin :spinning="!center" size="large" tip="正在加载地图...">
            <baidu-map
                    class="bm-view"
                    :zoom="15"
                    :center="center"
                    :ak="selfKey"
                    inertial-dragging
                    @ready="mapReady"
                    @rightclick="selectPoint"
                    ak="D2xjGaKU7fbcrXMkoUiKiD15uPdEdOfZ"
            >
                <bm-marker :position="point" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
                <bm-geolocation
                        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                        :showAddressBar="true"
                        :autoLocation="true"
                ></bm-geolocation>
                <bm-local-search :keyword="keyword" @searchcomplete="search" :auto-viewport="true"></bm-local-search>
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            </baidu-map>
        </a-spin>
        <div class="button" @click="handleSubmit">下一步</div>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
    import { BmGeolocation, BmLocalSearch, BmNavigation, BmMarker } from 'vue-baidu-map'
    export default {
        name: '',
        data () {
            return {
                city: '',
                province: '',
                district: '',
                // 百度地图key
                selfKey: 'NBGG0NtbzhSLZiLHWi79bNQbuTnbjtZ9',
                // 地图你解析方法实例
                myGeo: null,
                // 已选坐标，呈现mark用
                point: { lng: 116.404, lat: 39.915 },
                // 搜索关键字
                keyword: '',
                // 初始化地图中心点
                center: null,
                form: this.$form.createForm(this),
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 5 }
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 12 }
                }
            }
        },

        components: {
            // 地图
            BaiduMap,
            // 手动定位控件
            BmGeolocation,
            // 检索控件
            BmLocalSearch,
            // 地图放大缩小控件
            BmNavigation,
            // marker控件
            BmMarker
        },

        computed: {
            ...mapState({
                openShopData: state => state.app.openShopData
            })
        },

        beforeMount () {},

        created () {},

        beforeCreate () {},

        mounted () {
            this.form.setFieldsValue({
                openShopData: this.openShopData
            })
        },

        methods: {
            selectPoint ({ type, target, point, pixel, overlay }) {
                this.point = point;
                const _this = this;
                // 根据坐标逆解析获取地址详细描述
                this.myGeo.getLocation(point, function (result) {
                    if (result) {
                        _this.city = result.addressComponents.city;
                        _this.province = result.addressComponents.province;
                        _this.district = result.addressComponents.district;
                        _this.openShopData.shopAdder =
                            result.surroundingPois.length > 0
                                ? result.surroundingPois[0].address + result.surroundingPois[0].title
                                : result.address;
                        _this.form.setFieldsValue({
                            openShopData: _this.openShopData
                        })
                    }
                })
            },
            mapReady ({ BMap, map }) {
                const _this = this;
                // 获取自动定位方法
                var geolocation = new BMap.Geolocation();
                // 获取逆解析方法实例
                this.myGeo = new BMap.Geocoder();
                // 获取自动定位获取的坐标信息
                geolocation.getCurrentPosition(
                    function (r) {
                        _this.center = {
                            lng: r.point.lng,
                            lat: r.point.lat
                        };
                        _this.point = {
                            lng: r.point.lng,
                            lat: r.point.lat
                        }
                    },
                    { enableHighAccuracy: true }
                )
            },
            ...mapActions(['setOpenShopData', 'setCurrent']),
            onSearch (e) {
                this.keyword = e
            },
            search (e) {},
            handleSubmit (e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    console.log(err);
                    if (!err) {
                        this.setOpenShopData(values.openShopData);
                        this.setCurrent(2);
                        this.$router.push({
                            path: '/shop/open/stepthree'
                        })
                    }
                })
            }
        },

        watch: {}
    }
</script>

<style scoped>
    .wrap {
        width: 100%;
        padding-top: 30px;
        h3 {
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFangSC;
            font-weight: 600;
            color: rgba(0, 0, 0, 1);
            margin-bottom: 40px;
        }
    }
    /deep/ .ant-form-vertical .ant-form-item-label,
    .ant-col-24.ant-form-item-label,
    .ant-col-xl-24.ant-form-item-label {
        padding: 0 0 8px;
        margin: 0;
        display: block;
        text-align: left;
        line-height: 40px;
    }
    .button {
        width: 290px;
        height: 50px;
        background: rgba(234, 85, 20, 1);
        box-shadow: 0px 4px 10px 0px rgba(234, 85, 20, 0.48);
        border-radius: 4px;
        font-family: PingFangSC-Medium, PingFangSC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 50px;
        left: 0;
        right: 0;
        margin: 0 auto;
        margin-top: 50px;
        margin-bottom: 50px;
        &:hover {
            cursor: pointer;
        }
    }
    .bm-view {
        width: 100%;
        height: 800px;
        overflow: hidden;
    }
</style>