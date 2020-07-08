<template>
    <div class="cart">
        <!-- 导航 -->
        <NavBar class="nav-bar">
            <div slot="center">购物车({{length}})</div>
        </NavBar>
        <!-- 商品的列表 -->
        <CartList >

        </CartList>
        <!-- 底部汇总 -->
        <CartBottomBar />
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'

export default {
    components: {
        NavBar,
        CartList,
        CartBottomBar
    },
    computed: {
        //  1. computed做法
        // cartLength() {
        //     return this.$store.state.cartList.length
        // }

        // 2.1 getters 数组写法
        // ...mapGetters(['cartLength'])

        // 2.2 getters 对象写法
        ...mapGetters({
            length: 'cartLength',
    })
        
    }
}
</script>

<style scoped>
    .cart {
        height: 100vh;
    }
    .nav-bar {
        background-color: var(--color-tint);
        color: #fff;
        /* font-weight: 700; */
    }
</style>