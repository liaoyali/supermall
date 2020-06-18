<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
       <Scroll class="content" 
                ref="scroll" 
                :probe-type="3" 
                @scroll="contentScroll"
                :pull-up-load="true" 
                @pullingUp="loadMore" >
            <home-swiper :banners="banners"/>
            <home-recommend-view :recommends="recommends"/>
            <HomeFeatureView/>
            <tab-control class="tab-control" 
                    :titles="['流行','新款','精选']"
                    @tabClick="tabClick"/>
            <goods-list :goods="showGoods"></goods-list>
       </Scroll>
       <!-- 法一：采用子组件$emit -->
        <!-- <back-top @backClick="backClick" /> -->
        <!-- 法二：组件里只有这一张图片，点击图片相当于点击组件，采用native来监听组件即可 -->
        <back-top @click.native="backClick" v-show="isShowBackUp"/>
    </div>
</template>

<script>
// home页面特有组件
import HomeSwiper from './childComps/HomeSwiper';
import HomeRecommendView from './childComps/HomeRecommendView';
import HomeFeatureView from './childComps/HomeFeatureView';

// 公共组件
import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList';
import Scroll from 'components/common/scroll/Scroll';
import BackTop from 'components/content/backTop/BackTop'

// 一些方法
import {
    getHomeMultidata, 
    getHomeGoods
} from 'network/home';


export default {
    components: {
        HomeSwiper,
        HomeRecommendView,
        HomeFeatureView,
        NavBar,
        GoodsList,
        TabControl,
        Scroll,
        BackTop,
    },
    data() {
        return {
            banners: [],
            recommends: [],
            goods: {
                'pop': {page: 0, list: []},
                'new': {page: 0, list: []},
                'sell': {page: 0, list: []},
            },
            currentType: 'pop',
            isShowBackUp: false
        }
    },
    computed: {
        showGoods() {
            return this.goods[this.currentType].list;
        }
    },
    created() {
        // 1.请求多个数据
        this.getHomeMultidata();
        // 2.请求商品数据
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');
    },
    methods: {
        /**
         * 事件监听相关的方法
         */
        tabClick(i) {
            switch(i) {
                case 0:
                    this.currentType = 'pop';
                    break;
                case 1:
                    this.currentType = 'new';
                    break;
                case 2:
                    this.currentType = 'sell';
                    break;
            }
        },
        backClick() {
            this.$refs.scroll.scrollTo(0,0);            
        },
        contentScroll(position) {
            // console.log(position);
            this.isShowBackUp = (-position.y) > 1000;
        },
        loadMore() {
            // console.log('上拉加载更多');
            this.getHomeGoods(this.currentType);
        },
        /**
         * 网络请求相关的方法
         */
        getHomeMultidata() {
            getHomeMultidata().then(res => {
                // console.log(res);
                // this.result = res;
                // 这里其实就是引用计数，res原本指向请求到的data，但是该箭头函数执行完就会销毁res，data不再有指向，所以也会被回收，所以采用result存res的地址指向data，从而让data 仍然被引用，即使函数执行完也不会被销毁。
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
            })
        },
        getHomeGoods(type) {
            const page = this.goods[type].page + 1;
            getHomeGoods(type, page).then(res => {
                // console.log(res);
                this.goods[type].list.push(...res.data.list);
                this.goods[type].page += 1;
                // console.log(this.goods[type].page);
                this.$refs.scroll.finishPullUp();
         })
        }
    }
}
</script>

<style scoped>
/* scoped作用域表示可以与其他组件同类名样式区分开 */
    #home {
        /* padding-top: 44px; */
        /* padding-bottom: 4000px; */
        /* 给home一个具体高度，vh就是整个屏幕视口高度，1vh=1/100视口 */
        height: 100vh;
        position: relative;
    }
    .home-nav{
        background-color: var(--color-tint);
        /* css公共样式里面的背景颜色，采用css变量写法 */
        color: #fff;

        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 100
    }
    .tab-control {
        position: sticky;
        top: 44px;
        z-index: 9;
    }
    /* 法二 */
    .content {
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
    /* 法一： */
    /* .content {
        height: calc(100% - 93px);
        中间运算符两边必须加空格
        overflow: hidden;
        margin-top: 44px;
    } */
</style>