<template>
    <div id="detail">
        <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="nav" />
        <Scroll class="content" 
                ref="scroll" 
                :probeType="3" 
                @scroll="contentScroll" >
            <!-- <ul>
                <li v-for="(item,i) in $store.state.cartList" :key="i">{{item}}</li>
            </ul> -->
            <DetailSwiper :topImages="topImages" />
            <DetailBaseInfo :goods="goods" />
            <DetailShopInfo :shop="shop" />
            <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad" />
            <DetailParamInfo :paramInfo="paramInfo" ref="params" />
            <DetailCommentInfo :commentInfo="commentInfo" ref="comment" />
            <Goodslist :goods="recommends" ref="recommend" />
        </Scroll>
            <DetailBottonBar @addToCart="addToCart" />
            <back-top @click.native="backClick" v-show="isShowBackUp"/>
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
import DetailBottonBar from './childComps/DetailBottonBar'

import Scroll from '../../components/common/scroll/Scroll'
import Goodslist from '../../components/content/goods/GoodsList'


import { getDetail, Goods, Shop, GoodsParams, getRecommend } from 'network/detail';

import {debounce} from 'common/utils';
import {itemListenerMinxin, backTopMixin} from 'common/mixin';


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
            themeTopYs: [],
            getThemeTopY: null,
            currentIndex: null,
        }
    },
    mixins:[itemListenerMinxin, backTopMixin],
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottonBar,
        Goodslist,
    },
    created() {
        // 1. 保存传入的iid
        this.iid = this.$route.params.iid;
        // 2.根据iid请求详情数据
        getDetail(this.iid).then(res => {
            // 1.顶部轮播数据
            // console.log(res);
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

            // $nextTick等到渲染完后拿值
            // this.$nextTick(() => {
            //     // 根据最新的数据，对应的dom是已经被渲染出来了
            //     // 但是图片依然是没有加载完 (目前获得的这些offsetTop是不包含图片的)
            //     // offsetTop值不对，一般都是图片的问题
            //     this.themeTopYs.push(0);
            //      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            //      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            //      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            //      console.log(this.themeTopYs);
            // })


        })

        // 3. 请求推荐数据
        getRecommend().then(res => {
            // console.log(res);
            this.recommends = res.data.list;
        })

        // 4. 给getThemeTopY赋值
        this.getThemeTopY = debounce(() => {
            this.themeTopYs = []
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop- 44);
            this.themeTopYs.push(Number.MAX_VALUE)
            // console.log(this.themeTopYs);
        },100)
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
            this.$refs.scroll.refresh();

            this.getThemeTopY();
            // console.log('---');
            
            // 混入mixin防抖
            // this.refresh();
        },
        titleClick(i) {
            // console.log(i);
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[i], 200);
        },
        contentScroll(position) {
            // 1. 获取y值
            const positionY = -position.y;
            // 2. positionY和主题中值进行对比
            // [0, 3214, 4102, 4347]
            // postionY 在 0 和 3214 之间，index = 0
            // postionY 在 3214 和 4102 之间，index = 1
            // postionY 在 4102 和 4347 之间，index = 2
            // postionY 超过 4347，index = 3
            // for(let i in this.themeTopYs) {
            //     console.log(i);
            //     // 注意这里得到的i是个字符串
            // }
            let length = this.themeTopYs.length;
            for(let i = 0; i < length - 1; i++) {
                // if(this.currentIndex != i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i])) ) {
                if(this.currentIndex != i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])  ) {
                    this.currentIndex = i;
                    // console.log(this.currentIndex);
                    this.$refs.nav.currentIndex = this.currentIndex;                    
                }
            }
            // 3. 是否显示回到顶部
           this.listenShowBackTop(position);

        },
         addToCart() {
            //  1. 获取购物车需要展示的信息
            const product = {};
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.newPrice;
            product.iid = this.iid;
            // 2. 将商品添加到购物车里
            // this.$store.carList.push(product)
            this.$store.dispatch('addCart', product)
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
        height: calc(100% - 44px - 49px);
        overflow: hidden;
    }
</style>