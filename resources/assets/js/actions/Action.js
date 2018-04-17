import {
    CHOOSE_OPTION_SIDEBAR,
    OPEN_SIDEBAR,
    GET_DATA_DEVICES,
    GET_DATA_VALUES,
    GET_DATA_USERS,
    GET_DATA_SOLUTIONS,
    CHANGE_DISPLAY_DATA_SCREEN,
    GET_REAL_CHART_BASED_ON_HOUR,
    GET_OLD_CHART_BASED_ON_HOUR,
    GET_DEVICES_OF_USER,
    CHANGE_INTERVAL,
    GET_OLD_CHART_BASED_ON_DAY,
    SAVE_DEVICE,
    GET_REAL_CHART_BASED_ON_DAY,
    OPEN_MODAL,
    CLOSE_MODAL,
    SAVE_INPUT,
    SUBMIT_ADD_DEVICE_FORM,
    SUBMIT_ADD_USER_FORM,
    SUBMIT_LOGIN,
    TOKEN_EXPIRED,
    OPEN_ALERT,
    CLOSE_ALERT,
    SUBMIT_ADD_DEVICE_USER_FORM,
    DELETE_DEVICE,
    CLOSE_MESSAGE,
    DELETE_USER,
    DELETE_DATA,
    LOAD_DEVICE_UPDATE,
    LOAD_USER_UPDATE,
    SHOW_MESSAGE,
    GET_ONE_DEVICE,
    GET_CURRENT_DEVICE,
    GET_ONE_LOCATION,
    HIDE_SIDEBAR,
    SHOW_SIDEBAR,
    CHANGE_INTERVAL_DASHBOARD,
    CHECK_VALIDATE_LOGIN,
    GET_DETAIL_INFORMATION_DEVICE
} from "./TypeAction";
//Custom UI
export const chooseOptionSidebar = (option) => {
    return {
        type: CHOOSE_OPTION_SIDEBAR,
        option
    }
}

export const openSidebar = () => {
    return {
        type: OPEN_SIDEBAR,
    }
}
//Get all information of devices to show it on table
export const getDataDevices = (loadData) => {
    return {
        type: GET_DATA_DEVICES,
        loadData
    }
}
//Get all value of devices to show it on table
export const getDataValues = (loadData) => {
    return {
        type: GET_DATA_VALUES,
        loadData
    }
}
//get all information of users to show it on table
export const getDataUsers = (loadData) => {
    return {
        type: GET_DATA_USERS,
        loadData
    }
}

export const getDataSolutions = (loadData) => {
    return {
        type: GET_DATA_SOLUTIONS,
        loadData
    }
}

export const changeDisplayDataScreen = () => {
    return {
        type: CHANGE_DISPLAY_DATA_SCREEN,
    }
}

export const getRealChartBasedOnHour = (loadData, device, date) => {
    return {
        type: GET_REAL_CHART_BASED_ON_HOUR,
        loadData,
        device,
        date
    }
}

export const getRealChartBasedOnDay = (loadData, device, date) => {
    return {
        type: GET_REAL_CHART_BASED_ON_DAY,
        loadData,
        device,
        date
    }
}

export const getOldChartBasedOnHour = (loadData, device, date) => {
    return {
        type: GET_OLD_CHART_BASED_ON_HOUR,
        loadData,
        device,
        date
    }
}

export const getOldChartBasedOnDay = (loadData, device, date) => {
    return {
        type: GET_OLD_CHART_BASED_ON_DAY,
        loadData,
        device,
        date
    }
}

export const getDeviceOfUser = (loadData) => {
    return {
        type: GET_DEVICES_OF_USER,
        loadData
    }
}

export const changeInterval = (option, loadData, device, date) => {
    return {
        type: CHANGE_INTERVAL,
        option,
        loadData,
        device,
        date
    }
}

export const saveDevice = () => {
    return {
        type: SAVE_DEVICE
    }
}

export const openModal = (object, element) => {
    return {
        type: OPEN_MODAL,
        object,
        element
    }
}

export const closeModal = () => {
    return {
        type: CLOSE_MODAL,

    }
}

export const saveInput = (name, value) => {
    return {
        type: SAVE_INPUT,
        name,
        value
    }
}

export const submitAddDeviceForm = (message) => {
    return {
        type: SUBMIT_ADD_DEVICE_FORM,
        message
    }
}

export const submitAddDeviceUserForm = (message) => {
    return {
        type: SUBMIT_ADD_DEVICE_USER_FORM,
        message
    }
}

export const submitAddUserForm = (message) => {
    return {
        type: SUBMIT_ADD_USER_FORM,
        message
    }
}

export const login = (user, token) => {
    return {
        type: SUBMIT_LOGIN,
        user,
        token
    }
}

export const checkToken = () => {
    return {
        type: TOKEN_EXPIRED
    }
}

export const openAlert = (title, id) => {
    return {
        type: OPEN_ALERT,
        title,
        id
    }
}

export const closeAlert = () => {
    return {
        type: CLOSE_ALERT
    }
}
//show message
export const showMessage = (message) => {
    return {
        type: SHOW_MESSAGE,
        message
    }
}
//action delete
export const deleteDevice = () => {
    return {
        type: DELETE_DEVICE,
    }
}

export const deleteUser = () => {
    return {
        type: DELETE_USER,
    }
}

export const deleteData = () => {
    return {
        type: DELETE_DATA,
    }
}

export const closeMessage = () => {
    return {
        type: CLOSE_MESSAGE
    }
}

export const loadDeviceUpdate = (loadData) => {
    return {
        type: LOAD_DEVICE_UPDATE,
        loadData
    }
}

export const loadUserUpdate = (loadData) => {
    return {
        type: LOAD_USER_UPDATE,
        loadData
    }
}

export const getOneDevice = (loadData) => {
    return {
        type: GET_ONE_DEVICE,
        loadData
    }
}

export const getCurrentData = (loadData) => {
    return {
        type: GET_CURRENT_DEVICE,
        loadData
    } 
}

export const getOneLocation = (loadData) => {
    return {
        type: GET_ONE_LOCATION,
        loadData
    }
}

export const hideSidebar = () => {
    return {
        type: HIDE_SIDEBAR
    }
}

export const showSidebar = () => {
    return {
        type: SHOW_SIDEBAR
    }
}

export const changeIntervalDashboard = (loadData, device, date, interval) => {
    return {
        type: CHANGE_INTERVAL_DASHBOARD,
        loadData,
        device,
        date,
        interval
    }
}

export const checkValidateLogin = () => {
    return {
        type: CHECK_VALIDATE_LOGIN
    }
}
//
export const getDetailInformationDevice = (loadData) => {
    return {
        type: GET_DETAIL_INFORMATION_DEVICE,
        loadData
    }
}