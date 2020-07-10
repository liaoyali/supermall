import Toast from './Toast'

const obj = {};

obj.install = function(Vue) {
    // document.body.appendChild(Toast.$el)
    // 1. 创建组件构造器
    const toastConstructor = Vue.extend(Toast);
    // 2. new的方式，根据组件构造器，可以创建处理一个组件对象
    const toast = new toastConstructor();
    // 3. 将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))
        // 4. toast.$el对应的是div
    document.body.appendChild(toast.$el);


    // 将Toast方法加到原型对象上
    Vue.prototype.$toast = toast;
}

export default obj