import cookies from 'js-cookie'

const sessionKey = `sessionKey`
const seesionToken = `sessionToken`
const uid = `uid`

export default {

    /**
     * 判断是否已经登录了
     */
    loggedIn() {
        console.log('auth.loggedIn()',cookies.get(sessionKey))
        return cookies.get(sessionKey) 
                && cookies.get(seesionToken)
                && cookies.get(uid)
    }
}