export default {
    watchMouse: { // v-watchMouse="flag"
        update: function (el, binding, vnode) {
            let watchMouse = (e) => {
                if (!el.contains(e.target)) {
                    document.documentElement.removeEventListener('click', watchMouse);
                    binding.value.f = false;
                }
            };
            if (binding.value.f) {
                document.documentElement.addEventListener('click', watchMouse)
            }

        }
    }
}