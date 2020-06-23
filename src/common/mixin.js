import { debounce } from 'common/utils';

export const itemListenerMinxin = {
    data() {
        return {
            itemImgListener: null
        }
    },
    mounted() {
        // 对refresh进行防抖动
        const refresh = debounce(this.$refs.scroll.refresh, 50);

        this.itemImgListener = () => {
            refresh();
        };

        this.$bus.$on('itemImageLoad', this.itemImgListener);
    },
}