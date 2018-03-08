import { 
    CHOOSE_OPTION_SIDEBAR, 
    OPEN_SIDEBAR, 
    GET_DATA_DEVICES, 
    GET_DATA_VALUES 
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