export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.data.token) {
        return {
            'Authorization': 'Bearer ' + user.data.token,
            'Content-Type': 'application/x-www-form-urlencoded'
        };
    } else {
        return {};
    }
}
  