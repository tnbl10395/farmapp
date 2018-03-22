export const URL = "http://116.98.208.44:3000/";
// export const URL = "http://localhost:3000/";

const token = sessionStorage.getItem('token');

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'token': token
}

const method = {
    GET: "GET",
    POST: "POST",
    DELETE: "DELETE"
}

const removeToken = () => {
    sessionStorage.removeItem('token');
    window.location.href = "/";
}

export const getDataDevicesAPI = (dispatch, getDataDevices) => {
    try {
        var data = [];
        fetch(URL + "api/devices", {
            method: method.GET,
            headers: headers,
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.message == "Token has expired") {
                    removeToken()
                } else {
                    res.forEach(element => {
                        data.push(element)
                    });
                    dispatch(getDataDevices(data));
                }
            });
    } catch (error) {
    }
}

export const getDataValuesAPI = (dispatch, getDataValues) => {
    try {
        var data = [];
        fetch(URL + "api/data", {
            method: method.GET,
            headers: headers
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.length > 0) {
                    res.forEach(element => {
                        data.push(element)
                    });
                }
                dispatch(getDataValues(data));
            });
    } catch (error) {
    }
}

export const getDataUsersAPI = (dispatch, getDataUsers) => {
    try {
        var data = [];
        fetch(URL + "api/users", {
            method: method.GET,
            headers: headers
        })
            .then((response) => response.json())
            .then((res) => {
                res.forEach(element => {
                    data.push(element)
                });
                dispatch(getDataUsers(data));
            });
    } catch (error) {
    }
}

export const getDataSolutionsAPI = (dispatch, getDataSolutions) => {
    try {
        var data = [];
        fetch(URL + "api/solutions", {
            method: method.GET,
            headers: headers
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.length > 0) {
                    res.forEach(element => {
                        data.push(element)
                    });
                }
                dispatch(getDataSolutions(data));
            });
    } catch (error) {
    }
}

export const getRealChartBasedOnHourAPI = (dispatch, getRealChartBasedOnHour, device) => {
    try {
        var data = [];
        fetch(URL + "api/data-real-chart-hour/" + device, {
            method: method.GET,
            headers: headers
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.length > 0) {
                    res.forEach(element => {
                        data.push(element)
                    });
                }
                var time = new Date();
                dispatch(getRealChartBasedOnHour(data, device, time));
            });
    } catch (error) {
    }
}

export const getRealChartBasedOnDayAPI = (dispatch, getRealChartBasedOnDay, device) => {
    try {
        var data = [];
        fetch(URL + "api/data-real-chart-day/" + device, {
            method: method.GET,
            headers: headers
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.length > 0) {
                    res.forEach(element => {
                        data.push(element)
                    });
                }
                var time = new Date();
                dispatch(getRealChartBasedOnDay(data, device, time));
            });
    } catch (error) {
    }
}

export const getRealChartWithIntervalAPI = (dispatch, changeInterval, device, date, subDate, option) => {
    var link = (option == "1 Hour") ? "hour" : "day";
    try {
        var data = [];
        fetch(URL + "api/data-real-chart-" + link + "/" + device, {
            method: method.GET,
            headers: headers
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.length > 0) {
                    res.forEach(element => {
                        data.push(element)
                    });
                }
                dispatch(changeInterval(option, data, device, date));
            });
    } catch (error) {
    }
}

export const getOldChartWithIntervalAPI = (dispatch, changeInterval, device, date, subDate, option) => {
    var link = (option == "1 Hour") ? "hour" : "day";
    var variable = (option == "1 Hour") ? JSON.stringify({ deviceId: device, hour: subDate }) : JSON.stringify({ deviceId: device, day: subDate });
    try {
        var data = [];
        fetch(URL + "api/data-old-chart-" + link, {
            method: method.POST,
            headers: headers,
            body: variable
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.length > 0) {
                    res.forEach(element => {
                        data.push(element)
                    });
                }
                dispatch(changeInterval(option, data, device, date));
            });
    } catch (error) {
    }
}

export const getOldChartBasedOnHourAPI = (dispatch, getOldChartBasedOnHour, device, date, time) => {
    try {
        var data = [];
        fetch(URL + "api/data-old-chart-hour", {
            method: method.POST,
            headers: headers,
            body: JSON.stringify({
                deviceId: device,
                hour: date,
            })
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.length > 0) {
                    res.forEach(element => {
                        data.push(element)
                    });
                }
                dispatch(getOldChartBasedOnHour(data, device, time));
            });
    } catch (error) {
    }
}

export const getOldChartBasedOnDayAPI = (dispatch, getOldChartBasedOnDay, device, date, time) => {
    try {
        var data = [];
        fetch(URL + "api/data-old-chart-day", {
            method: method.POST,
            headers: headers,
            body: JSON.stringify({
                deviceId: device,
                day: date,
            })
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.length > 0) {
                    res.forEach(element => {
                        data.push(element)
                    });
                }
                dispatch(getOldChartBasedOnDay(data, device, time));
            });
    } catch (error) {
    }
}

export const getDeviceOfUserAPI = (dispatch, getDeviceOfUser) => {
    try {
        var data = [];
        fetch(URL + "api/manages", {
            method: method.GET,
            headers: headers
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.message == 'Token has expired') {
                    removeToken()
                } else {
                    res.forEach(element => {
                        data.push(element)
                    });
                    dispatch(getDeviceOfUser(data));
                }
            });
    } catch (error) {
    }
}
//form
export const submitAddDeviceFormAPI = (dispatch, submitAddDeviceForm, name, date, code) => {
    try {
        fetch(URL + "api/devices", {
            method: method.POST,
            headers: headers,
            body: JSON.stringify({
                name: name,
                code: code,
                manufacturing_date: date
            })
        })
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    dispatch(submitAddDeviceForm());
                    window.location.reload();
                } else {
                    alert('Code is unique');
                }
            })
    } catch (error) {
    }
}

export const submitAddDeviceUserFormAPI = (dispatch, submitAddDeviceUserForm, code) => {
    try {
        fetch(URL + "api/user-add-device", {
            method: method.POST,
            headers: headers,
            body: JSON.stringify({
                code: code
            })
        })
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    dispatch(submitAddDeviceUserForm());
                    window.location.reload();
                }else {
                    alert('Please check code again!')
                }
            })
    } catch (error) {
    }
}

export const submitAddUserFormAPI = (dispatch, submitAddUserForm, username, password, fullname, address, phone, role) => {
    try {
        fetch(URL + "api/users", {
            method: method.POST,
            headers: headers,
            body: JSON.stringify({
                username: username,
                password: password,
                fullname: fullname,
                address: address,
                phone: phone,
                role: role
            })
        })
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    dispatch(submitAddUserForm());
                    window.location.reload();
                } else {
                    alert('Username already have been registered');
                }
            })
    } catch (error) {
    }
}
//login
export const loginAPI = (dispatch, login, username, password) => {
    try {
        fetch(URL + "api/auth/login", {
            method: method.POST,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.token != null) {
                    getUserAPI(dispatch, login, res.token);
                } else {
                    alert('Username or password is invalid!')
                }
            })
    } catch (error) {

    }
}
//getUser 
export const getUserAPI = (dispatch, login, token) => {
    try {
        fetch(URL + "api/user-info", {
            method: method.GET,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': token
            }
        })
            .then((response) => response.json())
            .then((res) => {
                dispatch(login(res.result, token));
                window.location.href = '/';
            })
    } catch (error) {

    }
}
//delete device
export const deleteDeviceAPI = (dispatch, deleteDevice, id) => {
    try {
        fetch(URL + "api/devices/"+id, {
            method: method.DELETE,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': token
            }
        })
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    dispatch(deleteDevice());
                }
            })
    } catch (error) {

    }
}