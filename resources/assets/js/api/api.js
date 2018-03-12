export const URL = "http://192.168.20.122:8000/";

export const getDataDevicesAPI = (dispatch, getDataDevices) => {
    try {
        var data = [];
        fetch(URL+"api/devices")
        .then((response)=> response.json())
        .then((res)=>{
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
        fetch(URL+"api/data")
        .then((response)=> response.json())
        .then((res)=>{
            res.forEach(element => {
                data.push(element)
            });
            dispatch(getDataValues(data));
        });
    } catch (error) {   
    }
}