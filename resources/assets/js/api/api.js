export const URL = "http://116.98.208.44:3000/";
// export const URL = "http://localhost:3000/";

export const getDataDevicesAPI = (dispatch, getDataDevices) => {
    try {
        var data = [];
        fetch(URL + "api/devices", {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((res) => {
                res.forEach(element => {
                    data.push(element)
                });
                dispatch(getDataDevices(data));
            });
    } catch (error) {
    }
}

export const getDataValuesAPI = (dispatch, getDataValues) => {
    try {
        var data = [];
        fetch(URL + "api/data")
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
        fetch(URL + "api/users")
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
        fetch(URL + "api/solutions")
            .then((response) => response.json())
            .then((res) => {
                res.forEach(element => {
                    data.push(element)
                });
                dispatch(getDataSolutions(data));
            });
    } catch (error) {
    }
}

export const getRealChartBasedOnHourAPI = (dispatch, getRealChartBasedOnHour, device) => {
    try {
        var data = [];
        fetch(URL + "api/data-real-chart-hour/" + device)
            .then((response) => response.json())
            .then((res) => {
                if (res.length > 0) {
                    res.forEach(element => {
                        data.push(element)
                    });
                }
                var time = new Date();
                dispatch(getRealChartBasedOnHour(data,device,time));
            });
    } catch (error) {
    }
}

export const getRealChartBasedOnDayAPI = (dispatch, getRealChartBasedOnDay, device) => {
    try {
        var data = [];
        fetch(URL + "api/data-real-chart-day/" + device)
            .then((response) => response.json())
            .then((res) => {
                if (res.length > 0) {
                    res.forEach(element => {
                        data.push(element)
                    });
                }
                var time = new Date();
                dispatch(getRealChartBasedOnDay(data,device,time));
            });
    } catch (error) {
    }
}

export const getOldChartBasedOnHourAPI = (dispatch, getOldChartBasedOnHour, device, date, time) => {
    try {
        var data = [];
        fetch(URL + "api/data-old-chart-hour", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
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
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
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
        fetch(URL + "api/manages")
            .then((response) => response.json())
            .then((res) => {
                if (res.length > 0) {
                    res.forEach(element => {
                        data.push(element)
                    });
                }
                dispatch(getDeviceOfUser(data));
            });
    } catch (error) {
    }
}