<template>
  <div id="app">
    <keep-alive exclude="Detail">
    <router-view></router-view>
    </keep-alive>
    <MainTabBar></MainTabBar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar';

export default {
  components: {
    MainTabBar,
  }
}
</script>

<style>
@import "assets/css/base.css";

</style>
