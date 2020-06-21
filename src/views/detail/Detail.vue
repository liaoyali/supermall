<template>
    <div>
        <DetailNavBar/>
        <DetailSwiper :topImages="topImages" />
        <DetailBaseInfo :goods="goods" />
        <DetailShopInfo :shop="shop" />
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo';

import { getDetail, Goods, Shop } from 'network/detail';


export default {
    name: 'Detail',
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {}
        }
    },
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo
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
        })
    }
}
</script>

<style scoped>
    
</style>