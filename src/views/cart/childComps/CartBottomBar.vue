<template>
    <div class="bottom-bar">
        <div class="check-content">
        <CheckButton :isChecked="isSelectAll" 
                    @click.native="checkClick"
                    class="check-button" />
        <span>全选（{{checkLength}}）</span>
        </div>

        <div class="price">
            <span>合计：</span> 
            ￥{{totalPrice}}
        </div>

        <div class="calculate" @click="calcClick">
            结算
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
    components: {
        CheckButton
    },
    computed: {
        totalPrice() {
            return this.$store.state.cartList.filter(item => {
                return item.checked;
            }).reduce((preValue, item) => {
                return item.price * item.count + preValue
            }, 0)
        },
        checkLength() {
            return this.$store.state.cartList.filter(item => item.checked).length;
        },
        isSelectAll() {
            // return !(this.$store.state.cartList.filter(item => !item.checked).length);
            if(this.$store.state.cartList.length === 0) return false;
            return !this.$store.state.cartList.find(item => !item.checked);
        }
    },
    methods: {
        checkClick() {
            if(this.isSelectAll) {//全部选中
                this.$store.state.cartList.forEach(item => item.checked = false)
            } else { // 部分或全部不选中
                this.$store.state.cartList.forEach(item => item.checked = true)
            }
        },
        calcClick() {
            if(!this.isSelectAll) {
                this.$toast.show('请选择要购买的商品', 2000)
            }
        }
    }
}
</script>

<style scoped>
    .bottom-bar {
        position: relative;
        display: flex;
        align-items: center;
        bottom: 40px;

        background-color: #eee;
        height: 40px;
        line-height: 40px;
    }
    .check-content {
        display: flex;
        align-items: center;
        margin-left: 10px;
        width: 100px;
        font-size: 14px;
    }
    .check-button {
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
        text-align: center;
    }
    .price {
        margin-left: 90px;
        flex: 1;
        color: #f46;
    }
    .price span {
        font-size: 12px;
    }
    .calculate {
        width: 60px;
        height: 28px;
        background-color: #f46;
        color: #fff;
        text-align: center;
        line-height: 28px;
        border-radius: 14px;
        margin-right: 20px;
        /* font-size: 15px; */
    }
</style>