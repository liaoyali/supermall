<template>
    <div class="wrapper" ref="aaa">
        <ul class="content">
            <li>分类列表1</li>
            <li>分类列表2</li>
            <li>分类列表3</li>
            <li>分类列表4</li>
            <li>分类列表5</li>
            <li>分类列表6</li>
            <li>分类列表7</li>
            <li>分类列表8</li>
            <li>分类列表9</li>
            <li>分类列表10</li>
            <li>分类列表11</li>
            <li>分类列表12</li>
            <li>分类列表13</li>
            <li>分类列表14</li>
            <li>分类列表15</li>
            <li>分类列表16</li>
            <li>分类列表17</li>
            <li>分类列表18</li>
            <li>分类列表19</li>
            <li>分类列表20</li>
            <li>分类列表21</li>
            <li>分类列表22</li>
            <li>分类列表23</li>
            <li>分类列表24</li>
            <li>分类列表25</li>
            <li>分类列表26</li>
            <li>分类列表27</li>
            <li>分类列表28</li>
            <li>分类列表29</li>
            <li>分类列表30</li>
            <li>分类列表31</li>
            <li>分类列表32</li>
            <li>分类列表33</li>
            <li>分类列表34</li>
            <li>分类列表35</li>
            <li>分类列表36</li>
            <li>分类列表37</li>
            <li>分类列表38</li>
            <li>分类列表39</li>
            <li>分类列表40</li>
            <li>分类列表41</li>
            <li>分类列表42</li>
            <li>分类列表43</li>
            <li>分类列表44</li>
            <li>分类列表45</li>
            <li>分类列表46</li>
            <li>分类列表47</li>
            <li>分类列表48</li>
            <li>分类列表49</li>
            <li>分类列表50</li>
            <li>分类列表51</li>
            <li>分类列表52</li>
            <li>分类列表53</li>
            <li>分类列表54</li>
            <li>分类列表55</li>
            <li>分类列表56</li>
            <li>分类列表57</li>
            <li>分类列表58</li>
            <li>分类列表59</li>
            <li>分类列表60</li>
            <li>分类列表61</li>
            <li>分类列表62</li>
            <li>分类列表63</li>
            <li>分类列表64</li>
            <li>分类列表65</li>
            <li>分类列表66</li>
            <li>分类列表67</li>
            <li>分类列表68</li>
            <li>分类列表69</li>
            <li>分类列表70</li>
            <li>分类列表71</li>
            <li>分类列表72</li>
            <li>分类列表73</li>
            <li>分类列表74</li>
            <li>分类列表75</li>
            <li>分类列表76</li>
            <li>分类列表77</li>
            <li>分类列表78</li>
            <li>分类列表79</li>
            <li>分类列表80</li>
            <li>分类列表81</li>
            <li>分类列表82</li>
            <li>分类列表83</li>
            <li>分类列表84</li>
            <li>分类列表85</li>
            <li>分类列表86</li>
            <li>分类列表87</li>
            <li>分类列表88</li>
            <li>分类列表89</li>
            <li>分类列表90</li>
            <li>分类列表91</li>
            <li>分类列表92</li>
            <li>分类列表93</li>
            <li>分类列表94</li>
            <li>分类列表95</li>
            <li>分类列表96</li>
            <li>分类列表97</li>
            <li>分类列表98</li>
            <li>分类列表99</li>
            <li>分类列表100</li>
        </ul>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import {itemListenerMinxin, backTopMixin} from 'common/mixin';


export default {
    mixins: [backTopMixin],
    data() {
        return {
            scroll: null
        }
    },
    // 默认情况下BScroll是不可以实时的监听滚动位置
    // probe侦测
    // 0,1：都是不侦测实时的位置
    // 2：在手指按住滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测
    // 3：只要是滚动都侦测
    mounted() {
       this.scroll = new BScroll(this.$refs.aaa, {
           probeType: 2,
           pullUpLoad:true
        })
    //    this.scroll = new BScroll(document.querySelector('.wrapper'), {
        //    这样写没有上面那样获取好，因为可能其他父组件dom元素的class也为wrapper，就会获取错误
    //     });
        // this.scroll.on('scroll', (position) => {
        //     console.log(position);
        // });
        this.scroll.on('pullingUp', () => {
            console.log('up');
            // 然后发出网络请求

            // 等数据请求完成，并将新数据展示出来后，
            setTimeout(() => {
                this.scroll.finishPullUp();
            }, 2000);
            // 因为这个scroll封装的时候，只能由一次上拉加载，你必须finishPullUp结束此次后，才能继续又上拉加载
        });
    }
}
</script>

<style scoped>
    .wrapper {
        height: 1500px;
        background-color: pink;
        overflow: hidden;
        /* overflow-y: scroll; */
    }
</style>