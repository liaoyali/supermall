import { debounce } from 'common/utils';
import BackTop from 'components/content/backTop/BackTop'
import { BACKTOP_DISTANCE } from 'common/const';


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

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackUp: false,

        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0);
        },
        listenShowBackTop(position) {
            this.isShowBackUp = (-position.y) > BACKTOP_DISTANCE;
        }
    },
}