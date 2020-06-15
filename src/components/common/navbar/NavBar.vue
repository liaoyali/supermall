<template>
    <div class="nav-bar">
        <!-- 要对插槽做一些操作，比如布局，需要包起来 -->
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .nav-bar {
        display: flex;
        height: 44px;
        line-height: 44px;
        text-align: center;
        box-shadow: 0 1px 1px rgba(100,100,100, .1);
    }
    .left, .right  {
        width: 60px;
        /* background-color: pink; */
    }
    .center{
        flex: 1;
        /* background-color: skyblue; */
    }
</style>