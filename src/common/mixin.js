import { debounce } from 'common/utils';

export const itemListenerMinxin = {
    data() {
        return {
            itemImgListener: null,
            refresh: null
        }
    },
    mounted() {
        // 对refresh进行防抖动
        this.refresh = debounce(this.$refs.scroll.refresh, 50);

        this.itemImgListener = () => {
            this.refresh();
        };

        this.$bus.$on('itemImageLoad', this.itemImgListener);
    },
}