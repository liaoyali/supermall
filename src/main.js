import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

// 写的文件夹，默认导入的是js文件
import toast from 'components/common/toast'

Vue.config.productionTip = false;

// vue实例可以作为事件总线
Vue.prototype.$bus = new Vue();

// 安装toast插件
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body);

// 使用懒加载的插件
Vue.use(VueLazyLoad, {
    loading: require('assets/img/common/placeholder.jpg')
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')