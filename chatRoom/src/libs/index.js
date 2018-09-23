/**
 * Created by wyw on 2018/9/23.
 */
import noData from './noData.vue';
import Icon from './Icon.vue';
const install = {
    install:function(Vue){
        Vue.component('vNodata', noData);
        Vue.component('vIcon', Icon);
    }
};
export default install;