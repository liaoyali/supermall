<template>
       <div class="tab-bar-item" @click="itemClick">
           <div v-if="!isActive"><slot  name="item-icon"></slot></div>
           <div v-else><slot  name="item-icon-active"></slot></div>
           <div :style="activeStyle">
               <slot name="item-text"></slot>
           </div>
           <!-- 按下面这样写无法显示class类，因为App那边相对应的会覆盖这个slot，所以会将class覆盖，所以在外面包一个div，才可以 -->
           <!-- <slot :class="{active: isActive}" name="item-text"></slot> -->

           </div>

</template>

<script>
export default {
    // props采用对象的写法，规定传过来的是字符串
    props: {
        path: String,
        activeColor: {
            type: String,
            default: 'red'
        }
    },
    data() {
        return {
            // isActive: true
        }
    },
    computed: {
        isActive() {
            // tabBarItem的颜色动态控制利用$route就是被激活的那个路由。比如，点击home首页时
            // /home => item1(/home) = true
            // /home => item2(/category) = false
            // /home => item2(/cart) = false
            // /home => item2(/profile) = false
            // 所以只有首页亮
            // console.log(this.$route.path);
            // return this.$route.path === this.path;
            return this.$route.path.indexOf(this.path) != -1;
        },
        activeStyle() {
            return this.isActive ? {color: this.activeColor} : {}
        }
    },
    methods: {
        itemClick() {
            this.$router.replace(this.path)            
        }
    }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
    height: 24px;
    width: 24px;
    margin-top: 3px;
    /* 图片下面一般会多3px，所以img和下面的div隔的有点开，采用下面的方法去除 */
    vertical-align: middle;
    margin-bottom: 2px;
}

/* .active {
    color: red;
} */
</style>