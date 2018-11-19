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
    },
    bgColor: { // v-bgColor="#ff6000"
        update: function (el, binding) {
            el.style.backgroundColor = binding.value;
        }
    },
    bgInmage: { // v-bgInmage="1.jpg"
        update: function (el, binding) {
            el.style.backgroundImage = `url(${binding.value})`;
            el.style.backgroundRepeat = 'no-repeat';
            el.style.backgroundSize = 'cover';
            el.style.backgroundPosition = 'center';
        }
    },
    focus: { // v-focus
        update: function (el, binding) {
            el.focus();
        }
    }
}