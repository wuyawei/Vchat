/**
 * Created by wyw on 2018/9/23.
 */
import noData from './nodata/noData.vue';
import Icon from './icon/Icon.vue';
import dropdown from './dropdown/dropdown.vue';
import dropdownItem from './dropdown/dropdownItem.vue';
import uploadPopover from './uploadPopover/uploadPopover.vue';
import PhotoSwipe from './PhotoSwipe/PhotoSwipe.vue';
import bscroll from './bscroll/bscroll.vue';
import vScroll from './vScroll/vScroll.vue';
let fullCalendar = require('./fullCalendar/fullCalendar');
const install = {
    install:function(Vue){
        Vue.component('vNodata', noData);
        Vue.component('vIcon', Icon);
        Vue.component('vDropdown', dropdown);
        Vue.component('vDropdownItem', dropdownItem);
        Vue.component('vUploadPopover', uploadPopover);
        Vue.component('vPhotoSwipe', PhotoSwipe);
        Vue.component('bScroll', bscroll);
        Vue.component('vScroll', vScroll);
        Vue.component('full-calendar', fullCalendar.VueFullcalendar)
    }
};
export default install;