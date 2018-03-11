export const URL = "http://116.98.208.44:3000/";

export const getDataDevicesAPI = (dispatch, getDataDevices) => {
    try {
        var data = [];
        fetch(URL + "api/devices")
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
                res.forEach(element => {
                    data.push(element)
                });
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

export const getRealChartBasedOnHourAPI = (dispatch, getRealChartBasedOnHour, device, date) => {
    try {
        var data = [];
        fetch(URL + "api/data-real-chart-hour/" + device)
            .then((response) => response.json())
            .then((res) => {
                res.forEach(element => {
                    data.push(element)
                });
                console.log(data)
                // dispatch(getRealChartBasedOnHour(data,device,date));
            });
    } catch (error) {
    }
}

export const getOldChartBasedOnHourAPI = (dispatch, getOldChartBasedOnHour, device, date) => {
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
                res.forEach(element => {
                    data.push(element)
                });
                dispatch(getOldChartBasedOnHour(data,device,date));
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
                res.forEach(element => {
                    data.push(element)
                });
                dispatch(getDeviceOfUser(data));
            });
    } catch (error) {
    }
}