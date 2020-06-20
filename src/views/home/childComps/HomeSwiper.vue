<template>
    <swiper>
    <swiper-item v-for="item in banners" :key="item.link">
        <a :href="item.link">
            <img :src="item.image" alt="" 
            @load="imageLoad" >
        </a>
    </swiper-item>
    </swiper>
</template>

<script>
// Swiper文件夹里面以对象导出，所以可写成如下形式
import {Swiper, SwiperItem} from 'components/common/swiper';

export default {
    props: {
        banners: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            isLoad: false
        }
    },
    components: {
        Swiper,
        SwiperItem
    },
    methods: {
        imageLoad() {
            if(!this.isLoad) {
                this.$emit('swiperImageLoad');
                this.isLoad = true;
            }
        }
    }
}
</script>