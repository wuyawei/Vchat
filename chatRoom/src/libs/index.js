/**
 * Created by wyw on 2018/9/23.
 */
import noData from './noData.vue';
import Icon from './Icon.vue';
import dropdown from './dropdown/dropdown.vue';
import dropdownItem from './dropdown/dropdownItem.vue';
const install = {
    install:function(Vue){
        Vue.component('vNodata', noData);
        Vue.component('vIcon', Icon);
        Vue.component('vDropdown', dropdown);
        Vue.component('vDropdownItem', dropdownItem);
    }
};
export default install;