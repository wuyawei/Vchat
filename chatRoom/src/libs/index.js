/**
 * Created by wyw on 2018/9/23.
 */
import noData from './nodata/noData.vue';
import Icon from './icon/Icon.vue';
import dropdown from './dropdown/dropdown.vue';
import dropdownItem from './dropdown/dropdownItem.vue';
import uploadPopover from './uploadPopover/uploadPopover.vue';
const install = {
    install:function(Vue){
        Vue.component('vNodata', noData);
        Vue.component('vIcon', Icon);
        Vue.component('vDropdown', dropdown);
        Vue.component('vDropdownItem', dropdownItem);
        Vue.component('vUploadPopover', uploadPopover);
    }
};
export default install;