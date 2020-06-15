<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <home-swiper :banners="banners"></home-swiper>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import HomeSwiper from './childComps/HomeSwiper';
import {getHomeMultidata} from 'network/home';



export default {
    components: {
        NavBar,
        HomeSwiper
    },
    data() {
        return {
            banners: [],
            recommends: [],

        }
    },
    created() {
        // 1.请求多个数据
        getHomeMultidata().then(res => {
            console.log(res);
            
            // this.result = res;
            // 这里其实就是引用计数，res原本指向请求到的data，但是该箭头函数执行完就会销毁res，data不再有指向，所以也会被回收，所以采用result存res的地址指向data，从而让data 仍然被引用，即使函数执行完也不会被销毁。
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
        })
    }
}
</script>

<style scoped>
    .home-nav{
        background-color: var(--color-tint);
        /* css公共样式里面的背景颜色，采用css变量写法 */
        color: #fff;
    }
</style>