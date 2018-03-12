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
    GET_OLD_CHART_BASED_ON_DAY
} from "./TypeAction";

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

export const getDataDevices = (loadData) => {
    return {
        type: GET_DATA_DEVICES,
        loadData
    }
}

export const getDataValues = (loadData) => {
    return {
        type: GET_DATA_VALUES,
        loadData
    }
}

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

export const getRealChartBasedOnHour = (loadData, deivce, date) => {
    return {
        type: GET_REAL_CHART_BASED_ON_HOUR,
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

export const changeInterval = (option) => {
    return {
        type: CHANGE_INTERVAL,
        option
    }
}