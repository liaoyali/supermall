<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control :titles="['流行','新款','精选']"
        @tabClick="tabClick" 
        ref="tabControl1" class="tab-control" v-show="isTabFixed" />
       <Scroll class="content" 
                ref="scroll" 
                :probe-type="3" 
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore"
                >
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
            <home-recommend-view :recommends="recommends"/>
            <HomeFeatureView/>
            <tab-control :titles="['流行','新款','精选']"
                    @tabClick="tabClick" 
                    ref="tabControl2" />
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
import {getHomeMultidata, getHomeGoods} from 'network/home';
import {debounce} from 'common/utils';

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
            isShowBackUp: false,
            tabOffsetTop: 0,
            isTabFixed: false,
            saveY: 0
        }
    },
    computed: {
        showGoods() {
            return this.goods[this.currentType].list;
        }
    },
    activated() {
        this.$refs.scroll.refresh();
        this.$refs.scroll.scrollTo(0, this.saveY, 0);
    },
    deactivated() {
        this.saveY = this.$refs.scroll.getScrollY()
    },
    created() {
        // 1.请求多个数据
        this.getHomeMultidata();
        // 2.请求商品数据
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');

       
    },
    mounted() {
        // 1. 图片加载完成后的时间监听
        // 对refresh进行防抖动
        const refresh = debounce(this.$refs.scroll.refresh, 50);

        // 3.监听item中图片加载完成
        this.$bus.$on('itemImageLoad', () => {
            // console.log('ss');
           refresh();
        });

        // 2. 获取tabControl的offsetTop
        // console.log(this.$refs.tabControl.offsetTop); 
        // this.$refs.tabControl这获取到的还只是组件，无法得到offsetTop，必须获取到某元素才能取得offsetTop
        // 所有组件都有一个属性$el：用于获取组件中的元素
        // console.log(this.$refs.tabControl.$el.offsetTop);
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
            this.$refs.tabControl1.currentIndex = i;
            this.$refs.tabControl2.currentIndex = i;
        },
        backClick() {
            this.$refs.scroll.scrollTo(0,0);            
        },
        contentScroll(position) {
            // console.log(position);
            // 1. 判断backTop是否显示
            this.isShowBackUp = (-position.y) > 1000;
            // 2. 决定tabControl是否吸顶（position:fixed）
            this.isTabFixed = (-position.y) > this.tabOffsetTop;
        },
        loadMore() {
            // console.log('上拉加载更多');
            this.getHomeGoods(this.currentType);
        },
        swiperImageLoad() {
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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

        /* 由于better-scroll已经只在中间部分滑动，所以导航栏可以不用脱标了，下面的属性只在使用浏览器原生滚动的时候使用*/
        /* position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 100 */
    }
    /* .tab-control {
        position: sticky;
        top: 44px;
        z-index: 9;
    } */
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
    .tab-control {
        /* 设置相对定位，让其不要脱标，直接跟随在nav栏下面 */
        position: relative;
        top: -1px;
        z-index: 9;
    }
</style>