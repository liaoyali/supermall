<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: "Scroll",
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            scroll:null
        }
    },
    mounted() {
        // 1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper, {
            // 设置true才能在scroll里面进行点击，tabcontrol才能进行点击
            click: true,
            probeType: this.probeType,
            pullUpLoad: this.pullUpLoad
        })
        // 2. 监听滚动的位置
        if (this.probeType === 2 || this.probeType === 3) {
            this.scroll.on('scroll', (position => {
            // console.log(position);
            this.$emit('scroll', position)
        }))
        }

        // this.scroll.refresh();
        // 3. 监听scroll滚动到底部，上拉事件
        if (this.pullUpLoad) {
            // 只有为true的时候才需要监听
            this.scroll.on('pullingUp', () => {
                this.$emit('pullingUp')
            })

        }
    },
    methods: {
        scrollTo(x, y, time=300) {
            this.scroll && this.scroll.scrollTo(x, y, time);
        },
        finishPullUp() {
            this.scroll && this.scroll.finishPullUp();
        },
        refresh() {
            this.scroll && this.scroll.refresh();
        },
        getScrollY() {
            return this.scroll ? this.scroll.y : 0;
        }
    }
}
</script>

<style>
    
</style>