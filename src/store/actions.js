import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations-types'

export default {
    addCart(context, payload) {
        // 1. 查找之前数组是否有该商品
        let oldProduct = context.state.cartList.find(item => item.id === payload.iid)
            // 2. 判断oldProduct
        if (oldProduct) {
            // oldProduct.count += 1;
            context.commit(ADD_COUNTER, oldProduct)
        } else {
            payload.count = 1;
            // context.state.cartList.push(payload);
            context.commit(ADD_TO_CART, payload);
        }
    },

    // addCart({commit, state}, payload) {

    // }
}