export default class Api {
    constructor(options) {
        this.options = options;

    }

    getUserInfo() {
        return fetch(this.options.baseUrl + "/users/me", {
            method: "GET",
            headers: this.options.headers
        })
            .then(res => {
                if (res.ok) {

                    return res.json();
                }

                // если ошибка, переходим в catch
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(result => {

                return result;

            }).catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    getInitialCards() {
        return fetch(this.options.baseUrl + "/cards", {
            method: "GET",
            headers: this.options.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                // если ошибка, переходим в catch
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(result => {

                return result
            }).catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    updateUserInfo(name, about) {
        return fetch(this.options.baseUrl + "/users/me", {
            method: "PATCH",
            headers: this.options.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                // если ошибка, переходим в catch
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(result => {
                return result
            }).catch((err) => {
                console.log(err); // выведем ошибку в консоль
                return 'error';
            });
    }

    addNewCard(name, link) {
        return fetch(this.options.baseUrl + "/cards", {
            method: "POST",
            headers: this.options.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                // если ошибка, переходим в catch
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(result => {
                return result
            }).catch((err) => {
                console.log(err); // выведем ошибку в консоль
                return 'error';
            });
    }

    deleteCard(id) {
        return fetch(this.options.baseUrl + `/cards/${id}`, {
            method: "DELETE",
            headers: this.options.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                // если ошибка, переходим в catch
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(result => {
                return result
            }).catch((err) => {
                console.log(err); // выведем ошибку в консоль
                return 'error';
            });
    }

    like(id) {
        return fetch(this.options.baseUrl + `/cards/like/${id}`, {
            method: "PUT",
            headers: this.options.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                // если ошибка, переходим в catch
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(result => {
                return result
            }).catch((err) => {
                console.log(err); // выведем ошибку в консоль
                return 'error';
            });
    }

    dislike(id) {
        return fetch(this.options.baseUrl + `/cards/like/${id}`, {
            method: "DELETE",
            headers: this.options.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                // если ошибка, переходим в catch
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(result => {
                return result
            }).catch((err) => {
                console.log(err); // выведем ошибку в консоль
                return 'error';
            });

    }

    updateAvatar(avatar) {
        return fetch(this.options.baseUrl + "/users/me/avatar", {
            method: "PATCH",
            headers: this.options.headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                // если ошибка, переходим в catch
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(result => {
                return result
            }).catch((err) => {
                console.log(err); // выведем ошибку в консоль
                return 'error';
            });


    }

    // другие методы работы с API
}

