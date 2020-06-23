<template>
    <div id="detail">
        <DetailNavBar class="detail-nav" />
        <Scroll class="content" ref="scroll">
            <DetailSwiper :topImages="topImages" />
            <DetailBaseInfo :goods="goods" />
            <DetailShopInfo :shop="shop" />
            <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad" />
            <DetailParamInfo :paramInfo="paramInfo" />
            <DetailCommentInfo :commentInfo="commentInfo" />
            <Goodslist :goods="recommends"/>
        </Scroll>
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailParamInfo from './childComps/DetailParamInfo';
import DetailCommentInfo from './childComps/DetailCommentInfo'

import Scroll from '../../components/common/scroll/Scroll'
import Goodslist from '../../components/content/goods/GoodsList'

import { getDetail, Goods, Shop, GoodsParams, getRecommend } from 'network/detail';

import {debounce} from 'common/utils';
import {itemListenerMinxin} from 'common/mixin';


export default {
    name: 'Detail',
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
        }
    },
    mixins:[itemListenerMinxin],
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        Goodslist
    },
    created() {
        // 1. 保存传入的iid
        this.iid = this.$route.params.iid;
        // 2.根据iid请求详情数据
        getDetail(this.iid).then(res => {
            // 1.顶部轮播数据
            console.log(res);
            const data = res.result;
            this.topImages = data.itemInfo.topImages;

            // 2.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

            // 3. 创建店铺信息的对象
            this.shop = new Shop(data.shopInfo);

            // 4. 保存商品的详情数据
            this.detailInfo = data.detailInfo;

            // 5. 获取参数的信息
            this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule);

            // 6.获取评论信息
            if(data.rate.cRate != 0) {
                this.commentInfo = data.rate.list[0];
            }
        })

        // 3. 请求推荐数据
        getRecommend().then(res => {
            // console.log(res);
            this.recommends = res.data.list;
        })
    },
    mounted() {
        // 由于此部分代码和Home中重复，所以写在了mixin里
    },
    // detail没有设置keep-alive保持缓存，所以不能在deactivated声明周期中取消
    destroyed() {
        this.$bus.$on('itemImageLoad', this.itemImgListener)
    },


    methods: {
        imageLoad() {
            // const refresh = debounce(this.$refs.scroll.refresh, 50);
            this.$refs.scroll.refresh();
            // refresh();
        }
    }
}
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;

        height: 100vh;
    }
    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
        margin-top: -1px;
    }
    .content {
        height: calc(100% - 44px);
    }
</style>