<template>
    <div class="bottom-bar">
        <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">立即购买</div>
    </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
        
      }
    },
    methods: {
      addToCart() {
        this.$emit('addToCart')
      }
    }
}
</script>

<style scoped>
 .bottom-bar {
    height: 50px;
    position: fixed;
    background-color: #fff;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    text-align: center;
  }

  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-item>div {
    flex: 1;
  }

  .bar-left .text {
    font-size: 12px;
  }

  .bar-left .icon {
    display: block;
    width: 22px;
    height: 20px;
    margin: 10px auto 0;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-left .service {
    background-position:0 -53px;
  }

  .bar-left .shop {
    background-position:0 -98px;
  }

  .bar-right {
    font-size: 14px;
    color: #fff;
    line-height: 50px;
  }

  .bar-right .cart {
    background-color: #ffe6e8;
    color: #ff5777;
  }

  .bar-right .buy {
    background-color:#ff468f;
  }
</style>