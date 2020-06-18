<template>
    <div class="goods">
        <goods-list-item v-for="(item,i) in goods" :key="i" :goods-item="item" />
        <!-- {{goods}} -->
    </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
    props: {
        goods: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        GoodsListItem
    }
}
</script>

<style scoped>
    .goods {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

</style>