<template>
    <TabBar>
      <TabBarItem path="/home" activeColor="#ff5777">
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
           <div slot="item-text">首页</div>
      </TabBarItem>
      <TabBarItem path="/category" activeColor="#ff5777">
           <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
           <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
           <div slot="item-text">分类</div>
      </TabBarItem>
      <TabBarItem path="/cart" activeColor="#ff5777">
        <img slot="item-icon" src="~assets/img/tabbar/cart.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/cart_active.svg" alt="">
           <div slot="item-text">购物车</div>
      </TabBarItem>
      <TabBarItem path="/profile" activeColor="#ff5777">
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
           <div slot="item-text">我的</div>
      </TabBarItem>
    </TabBar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar';
import TabBarItem from 'components/common/tabbar/TabBarItem'
export default {
    components: {
        TabBar,
        TabBarItem
    }
}
</script>