import { updateDevice } from "../actions/Action";

// export const URL = "http://116.110.0.66:3000/";
// export const URL = "http://localhost:3000/";
// export const URL = "http://42.119.104.144:3000/"
export const URL = "http://52.15.185.17:3000";

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
export const submitAddDeviceFormAPI = (dispatch, submitAddDeviceForm, name, date, code, getDataDevices, getDataDevicesAPI) => {
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
                    dispatch(submitAddDeviceForm(res));
                    getDataDevicesAPI(dispatch, getDataDevices);
                } else {
                    dispatch(submitAddDeviceForm(res));
                }
            })
    } catch (error) {
    }
}

export const submitAddDeviceUserFormAPI = (dispatch, submitAddDeviceUserForm, getDataDevices, getDataDevicesAPI, getDeviceOfUser, getDeviceOfUserAPI, code) => {
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
                    dispatch(submitAddDeviceUserForm(res));
                    getDataDevicesAPI(dispatch, getDataDevices);
                    getDeviceOfUserAPI(dispatch, getDeviceOfUser);
                } else {
                    dispatch(submitAddDeviceUserForm(res));
                }
            })
    } catch (error) {
    }
}

export const submitAddUserFormAPI = (dispatch, submitAddUserForm, username, password, fullname, address, phone, role, getDataUsers, getDataUsersAPI) => {
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
                    dispatch(submitAddUserForm(res));
                    getDataUsersAPI(dispatch, getDataUsers);
                } else {
                    dispatch(submitAddUserForm(res));
                }
            })
    } catch (error) {
    }
}
//login
export const loginAPI = (dispatch, login, checkValidateLogin, username, password) => {
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
                    dispatch(checkValidateLogin());
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
export const deleteDeviceAPI = (dispatch, deleteDevice, id, getDataDevices, getDataDevicesAPI) => {
    try {
        fetch(URL + "api/devices/" + id, {
            method: method.DELETE,
            headers: headers
        })
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    dispatch(deleteDevice());
                    getDataDevicesAPI(dispatch, getDataDevices);
                }
            })
    } catch (error) {
    }
}

export const deleteUserAPI = (dispatch, deleteUser, id, getDataUsers, getDataUsersAPI) => {
    try {
        fetch(URL + "api/users/" + id, {
            method: method.DELETE,
            headers: headers
        })
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    dispatch(deleteUser());
                    getDataUsersAPI(dispatch, getDataUsers);
                }
            })
    } catch (error) {
    }
}

export const deleteDataAPI = (dispatch, deleteData, id, getDataValues, getDataValuesAPI) => {
    try {
        fetch(URL + "api/data/" + id, {
            method: method.DELETE,
            headers: headers
        })
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    dispatch(deleteData());
                    getDataValuesAPI(dispatch, getDataValues);
                }
            })
    } catch (error) {
    }
}
//load object
export const loadDeviceUpdateAPI = (dispatch, loadDeviceUpdate, id) => {
    try {
        fetch(URL + "api/devices/" + id, {
            method: method.GET,
            headers: headers
        })
            .then((response) => response.json())
            .then((res) => {
                if (res != false) {
                    dispatch(loadDeviceUpdate(res));
                }
            })
    } catch (error) {
    }
}
//update
export const updateDeviceAPI = (dispatch, showMessage, id, object, getDataDevices, getDataDevicesAPI) => {
    try {
        fetch(URL + "api/devices/" + id, {
            method: method.POST,
            headers: headers,
            body: JSON.stringify(object)
        })
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    dispatch(showMessage(res));
                    getDataDevicesAPI(dispatch, getDataDevices);
                } else {
                    dispatch(showMessage(res));
                }
            })
    } catch (error) { }
}
export const updateDeviceOfUserAPI = () => { }

export const updateUserAPI = (dispatch, showMessage, id, object, getDataUsers, getDataUsersAPI) => {
    try {
        fetch(URL + "api/users/" + id, {
            method: method.POST,
            headers: headers,
            body: JSON.stringify(object)
        })
            .then((response) => response.json())
            .then((res) => {
                if (res) {
                    dispatch(showMessage(res));
                    getDataUsersAPI(dispatch, getDataUsers);
                } else {
                    dispatch(showMessage(res));
                }
            })
    } catch (error) {
    }
}

export const getOneDeviceAPI = (dispatch, getOneDevice, id) => {
    try {
        fetch(URL + "api/devices/" + id, {
            method: method.GET,
            headers: headers
        })
            .then((response) => response.json())
            .then((res) => {
                dispatch(getOneDevice(res));
            })
    } catch (error) {
    }
}

export const getCurrentDataApi = (dispatch, getCurrentData, id, interval) => {
    try {
        fetch(URL + "api/current-data/" + id, {
            method: method.GET,
            headers: headers
        })
            .then((response) => response.json())
            .then((res) => {
                dispatch(getCurrentData(res));
            })
    } catch (error) {
    }
}

export const getOneLocationAPI = (dispatch, getOneLocation, id) => {
    try {
        fetch(URL + "api/location/" + id, {
            method: method.GET,
            headers: headers
        })
            .then((response) => response.json())
            .then((res) => {
                dispatch(getOneLocation(res));
            })
    } catch (error) {
    }
}

export const getRealChartDashboardBasedOnHourAPI = (dispatch, changeIntervalDashboard, device, interval) => {
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
                dispatch(changeIntervalDashboard(data, device, time, interval));
            });
    } catch (error) {
    }
}

export const getRealChartDashboardBasedOnDayAPI = (dispatch, changeIntervalDashboard, device, interval) => {
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
                dispatch(changeIntervalDashboard(data, device, time, interval));
            });
    } catch (error) {
    }
}

export const submitNewPlantIntoDeviceApi = (
    dispatch, 
    getDetailInformationDeviceApi, 
    getDetailInformationDevice, 
    getListNotificationApi, 
    getListNotification, 
    getDeviceOfUserAPI,
    getDeviceOfUser, 
    getAlldevicesActiveApi,
    getAlldevicesActive,
    getOneInformationPlantApi,
    getOneInformationPlant,
    getOneSolutionApi,
    getOneSolution,
    getRealChartBasedOnHourAPI,
    getRealChartBasedOnHour,
    data) => {
    try {
        fetch(URL + "api/manages", {
            method: method.POST,
            headers: headers,
            body: JSON.stringify({
                code: data.code,
                plant: data.plant,
                startDate: data.startDate,
                picture: data.picture,
                phase: data.phase,
            })
        })
            .then((response) => response.json())
            .then((res) => {
                if (res != null) {
                    getAlldevicesActiveApi(dispatch, getAlldevicesActive);
                    getDetailInformationDeviceApi(dispatch, getDetailInformationDevice, res.deviceId);
                    getListNotificationApi(dispatch, getListNotification);
                    getDeviceOfUserAPI(dispatch, getDeviceOfUser);
                    getOneInformationPlantApi(dispatch, getOneInformationPlant, getOneSolutionApi, getOneSolution, res.plantId);
                    getRealChartBasedOnHourAPI(dispatch, getRealChartBasedOnHour, res.deviceId);
                }
            });
    } catch (error) {
    }
}

export const getDetailInformationDeviceApi = (dispatch, getDetailInformationDevice, deviceId) => {
    try {
        fetch(URL + "api/get-detail-device/" + deviceId, {
            method: method.GET,
            headers: headers,
        })
            .then((response) => response.json())
            .then((res) => {
                dispatch( getDetailInformationDevice(res) );
            });
    } catch (error) {
    }
}

export const getNotificationApi = (dispatch, getNotification, deviceId) => {
    try {
        fetch(URL + "api/notification/" + deviceId, {
            method: method.GET,
            headers: headers,
        })
            .then((response) => response.json())
            .then((res) => {
                dispatch( getNotification(res) );
            });
    } catch (error) {
    }
}

export const getAlldevicesActiveApi = (dispatch, getAlldevicesActive) => {
    try {
        fetch(URL + "api/list-device-active", {
            method: method.GET,
            headers: headers,
        })
            .then((response) => response.json())
            .then((res) => {
                dispatch( getAlldevicesActive(res) );
            });
    } catch (error) {
    }
}

export const getListNotificationApi = (dispatch, getListNotification) => {
    try {
        fetch(URL + "api/list-notification", {
            method: method.GET,
            headers: headers,
        })
            .then((response) => response.json())
            .then((res) => {
                dispatch( getListNotification(res) );
            });
    } catch (error) {
    }
}

export const getPlantsOfUserApi = (dispatch, getPlantsOfUser) => {
    try {
        fetch(URL + "api/plants", {
            method: method.GET,
            headers: headers,
        })
            .then((response) => response.json())
            .then((res) => {
                dispatch( getPlantsOfUser(res) );
            });
    } catch (error) {
    }
}

export const getListSensorsApi = (dispatch, getListSensors) => {
    try {
        fetch(URL + "api/sensors", {
            method: method.GET,
            headers: headers,
        })
            .then((response) => response.json())
            .then((res) => {
                dispatch( getListSensors(res) );
            });
    } catch (error) {
    }
}

export const getOneInformationPlantApi = (dispatch, getOneInformationPlant, getOneSolutionApi, getOneSolution, plantId) => {
    try {
        fetch(URL + "api/plants/" + plantId, {
            method: method.GET,
            headers: headers,
        })
            .then((response) => response.json())
            .then((res) => {
                dispatch( getOneInformationPlant(res) );
                getOneSolutionApi(dispatch, getOneSolution, res.phases[0].id);
            });
    } catch (error) {
    }
}

export const getOneSolutionApi = (dispatch, getOneSolution, phaseId) => {
    try {
        fetch(URL + "api/get-solution", {
            method: method.POST,
            headers: headers,
            body: JSON.stringify({
                phaseId: phaseId
            })
        })
            .then((response) => response.json())
            .then((res) => {
                dispatch( getOneSolution(res, phaseId) );
            });
    } catch (error) {
    }
}

export const updatePlantApi = (dispatch, updatePlant, data, plantId) => {
    try {
        fetch(URL + "api/plants/" + plantId, {
            method: method.POST,
            headers: headers,
            body: JSON.stringify({
                name: data.name,
                picture: data.picture,
                description: data.description
            })
        })
            .then((response) => response.json())
            .then((res) => {
                if(res) {
                    dispatch( updatePlant() );
                }
            });
    } catch (error) {
    }
}

export const updateSolutionApi = (dispatch, updateSolution, getOneSolutionApi, getOneSolution, description, solutionId, phaseId) => {
    try {
        fetch(URL + "api/solutions/" + solutionId, {
            method: method.POST,
            headers: headers,
            body: JSON.stringify({
                description: description
            })
        })
            .then((response) => response.json())
            .then((res) => {
                if(res) {
                    dispatch( updateSolution() );
                    getOneSolutionApi(dispatch, getOneSolution, phaseId);
                }
            });
    } catch (error) {
    }
}

export const updatePhaseApi = (dispatch, updatePhase, data, phaseId) => {
    try {
        fetch(URL + "api/phases/" + phaseId, {
            method: method.POST,
            headers: headers,
            body: JSON.stringify({
                name: data.name,
                days: data.days,
                minTemperature: data.minTemperature,
                maxTemperature: data.maxTemperature,
                minHumidity: data.minHumidity,
                maxHumidity: data.maxHumidity
            })
        })
            .then((response) => response.json())
            .then((res) => {
                if(res) {
                    dispatch( updatePhase() );
                }
            });
    } catch (error) {
    }
}

export const addPlantForDeviceApi = (
    dispatch, 
    getDetailInformationDeviceApi, 
    getDetailInformationDevice, 
    getListNotificationApi, 
    getListNotification, 
    getDeviceOfUserAPI,
    getDeviceOfUser, 
    getAlldevicesActiveApi,
    getAlldevicesActive,
    getOneInformationPlantApi,
    getOneInformationPlant,
    getOneSolutionApi,
    getOneSolution,
    data) => {
    try {
        fetch(URL + "api/add-plant-for-device", {
            method: method.POST,
            headers: headers,
            body: JSON.stringify({
                code: data.code,
                plantId: data.plantId,
                startDate: data.startDate,
            })
        })
            .then((response) => response.json())
            .then((res) => {
                if(res != null ) {
                    getAlldevicesActiveApi(dispatch, getAlldevicesActive);
                    getDetailInformationDeviceApi(dispatch, getDetailInformationDevice, res.deviceId);
                    getListNotificationApi(dispatch, getListNotification);
                    getDeviceOfUserAPI(dispatch, getDeviceOfUser);
                    getOneInformationPlantApi(dispatch, getOneInformationPlant, getOneSolutionApi, getOneSolution, res.plantId);
                }
            });
    } catch (error) {
    }
}