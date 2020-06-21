<template>
        <swiper class="swiper-img">
            <swiper-item   v-for="(item,i) in topImages" :key="i">
                <img :src="item" alt="">
            </swiper-item>
        </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
    props: {
        topImages: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        Swiper,
        SwiperItem
    }
}
</script>


<style scoped>
    .swiper-img {
        height: 300px;
        overflow: hidden;
    }
</style>