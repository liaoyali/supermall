<template>
    <div class="tab-control">
        <div v-for="(item,i) in titles" :key="i" class="tab-control-item" @click="itemClick(i)" :class="{active: i === currentIndex}">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentIndex: 0
        }
    },
    props: {
        titles: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    methods: {
        itemClick(i) {
            this.currentIndex = i;
            this.$emit('tabClick', i);
        }
    }
}
</script>

<style scoped>
    .tab-control {
        display: flex;
        text-align: center;
        font-size: 15px;
        height: 40px;
        line-height: 40px;
        background-color: #fff;
    }
    .tab-control-item {
        flex: 1;

    }
    .tab-control-item span {
        padding: 5px;
    }
    .active {
        color: var(--color-high-text);
    }
    .active span {
        border-bottom: 3px solid var(--color-high-text);
    }
</style>