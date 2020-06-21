<template>
    <div>
         <Navbar>
             <div slot="left" class="back" @click="backClick">
                 <img src="~assets/img/common/back.svg" alt="">
             </div>
            <div slot="center" class="title">
                <div v-for="(item,i) in titles" :key="i"
                class="title-item"
                :class="{active: i === currentIndex}"
                @click="titleClick(i)"
                >{{item}}</div>
            </div>
        </Navbar>
    </div>
</template>

<script>
import Navbar from 'components/common/navbar/NavBar';

export default {
    components: {
        Navbar
    },
    data() {
        return {
            titles: ['商品', '参数', '评论', '推荐'],
            currentIndex: 0
        }
    },
    methods: {
        titleClick(i) {
            this.currentIndex = i;
        },
        backClick() {
            this.$router.back();
        }
    }
}
</script>


<style scoped>
    .title {
        display: flex;
        font-size: 13px;
    }
    .title-item {
        flex: 1;
    }
    .active {
        color: var(--color-high-text);
    }
    .back img {
        margin-top: 14px;
        width: 17px;
    }
</style>