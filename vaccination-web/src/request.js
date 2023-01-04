import axios from "axios";

export function post(url, data, success, fail) {
    axios.post(url, data, {
        headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem("token")
        }
    }).then(function (response) {
        success && success(response)
    }).catch(function (error) {
        console.log(error);
        fail && fail(error)
    });
}

export function get(url, success, fail) {
    axios.get(url, {
        headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem("token")
        }
    }).then(function (response) {
        success && success(response)
    }).catch(function (error) {
        if (error && error.request) {
            console.info(error)
            const status = error.request.status
            if (status === 401) {
                window.location = '/login'
            }

        }
    });
}

