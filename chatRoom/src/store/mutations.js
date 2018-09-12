/**
 * Created by wyw on 2018/8/4.
 */
export default {
    setUser(state, data) {
        state.user = data;
        let {bubble, chatTheme, projectTheme, wallpaper} = data;
        window.sessionStorage.theme = JSON.stringify({
            bubble,
            chatTheme,
            projectTheme,
            wallpaper
        })
    },
    setIslogin(state, data) {
        state.isLogin = data;
    }
}