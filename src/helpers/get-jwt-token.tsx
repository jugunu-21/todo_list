import Cookies from 'js-cookie';

export default function getJwtTokenFromCookies() {
    const jwtToken = Cookies.get('jwtToken');
    // console.log("cookie",cookies)
    return jwtToken ? jwtToken : null;
}