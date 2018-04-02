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
    SHOW_SIDEBAR,
    HIDE_SIDEBAR
} from "../actions/TypeAction";

const initialState = {
    token: null,
    token_expired: false,
    //dashboard
    nameDevice: null,
    codeDevice: null,
    currentHumidity: null,
    currentTemperature: null,
    latitude: null,
    longitude: null,
    //side bar
    admin_dashboard_component: true,
    admin_device_component: false,
    admin_user_component: false,
    admin_data_component: false,
    admin_solution_component: false,
    sideBar: true,
    //
    data_devices: [],
    data_values: [],
    data_users: [],
    data_solutions: [],
    table: false,
    humidity_chart: [],
    temperature_chart: [],
    all_devices: [],
    select_device: null,
    select_date: '',
    checkInterval: false,
    interval: 0,
    modal: false,
    object_form: null,
    //save value of input form
    value_name_device: '',
    value_code_device: '',
    value_date_device: new Date(),
    value_username_user: '',
    value_password_user: '',
    value_fullname_user: '',
    value_address_user: '',
    value_phone_user: '',
    value_role_user: '0',
    //call message
    message_success: false,
    message_fail: false,
    //call alert
    alert: false,
    title_alert: '',
    //save id to update
    id_update: '',
    //save id to delete
    id_delete: '',
    //breadcrumb
    breadcrumb: 'Dashboard',
};

const edit = (direct, id) => ('<a href="/#/' + direct + '/update/' + id + '" style="border-radius: 5px; padding: 5px 5px 5px 6px; background-color:#3498db; color:#fff;margin-right:10px;" class="fa fa-edit"></a>');
const remove = (direct, id) => ('<a href="/#/' + direct + '/delete/' + id + '" style="border-radius: 5px; padding: 5px 7px 5px 7px; background-color:#e74c3c; color:#fff" class="fa fa-remove"></a>');
const actRemove = (direct, id) => ('<div style="text-align: center">' + remove(direct, id) + '</div>');
const act = (direct, id) => ('<div style="text-align: center">' + edit(direct, id) + remove(direct, id) + '</div>');

const initValueHour = () => {
    var array = [];
    for (var i = 0; i < 60; i++) {
        array.push(0);
    }
    return array;
}
const initValueDay = () => {
    var array = [];
    for (var i = 0; i < 24; i++) {
        array.push(0);
    }
    return array;
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_DEVICES:
            return {
                ...state,
                data_devices: action.loadData
            }

        case GET_DATA_VALUES:
            return {
                ...state,
                data_values: action.loadData
            }

        case GET_DATA_USERS:
            return {
                ...state,
                data_users: action.loadData
            }

        case GET_DATA_SOLUTIONS:
            return {
                ...state,
                data_solutions: action.loadData
            }

        case GET_REAL_CHART_BASED_ON_HOUR:
            var humidity = initValueHour();
            var temperature = initValueHour();
            if (action.loadData.length > 0) {
                action.loadData.forEach(element => {
                    humidity.splice(parseInt(element.min), 1, element.humidity);
                    temperature.splice(parseInt(element.min), 1, element.temperature);
                });
            }
            return {
                ...state,
                humidity_chart: humidity,
                temperature_chart: temperature,
                select_device: action.device,
                select_date: action.date
            }

        case GET_REAL_CHART_BASED_ON_DAY:
            var humidity = initValueDay();
            var temperature = initValueDay();
            if (action.loadData.length > 0) {
                action.loadData.forEach(element => {
                    humidity.splice(parseInt(element.h), 1, element.humidity);
                    temperature.splice(parseInt(element.h), 1, element.temperature);
                });
            }
            return {
                ...state,
                humidity_chart: humidity,
                temperature_chart: temperature,
                select_device: action.device,
                select_date: action.date
            }

        case GET_OLD_CHART_BASED_ON_HOUR:
            var humidity = initValueHour();
            var temperature = initValueHour();
            if (action.loadData.length > 0) {
                action.loadData.forEach(element => {
                    humidity.splice(parseInt(element.min), 1, element.humidity);
                    temperature.splice(parseInt(element.min), 1, element.temperature);
                });
            }
            return {
                ...state,
                humidity_chart: humidity,
                temperature_chart: temperature,
                select_device: action.device,
                select_date: action.date
            }

        case GET_OLD_CHART_BASED_ON_DAY:
            var humidity = initValueDay();
            var temperature = initValueDay();
            if (action.loadData.length > 0) {
                action.loadData.forEach(element => {
                    humidity.splice(parseInt(element.h), 1, element.humidity);
                    temperature.splice(parseInt(element.h), 1, element.temperature);
                });
            }
            return {
                ...state,
                humidity_chart: humidity,
                temperature_chart: temperature,
                select_device: action.device,
                select_date: action.date
            }

        case GET_DEVICES_OF_USER:
            return {
                ...state,
                all_devices: action.loadData,
                select_device: action.loadData[0].id,
            }

        case SAVE_DEVICE:
            return {
                ...state,
                select_device: state.all_devices[0].id,
            }

        case CHANGE_DISPLAY_DATA_SCREEN:
            return {
                ...state,
                table: !state.table,
            }

        case CHOOSE_OPTION_SIDEBAR:
            switch (action.option) {
                case "":
                    return {
                        ...state,
                        breadcrumb: 'Dashboard',
                        admin_dashboard_component: true,
                        admin_device_component: false,
                        admin_user_component: false,
                        admin_data_component: false,
                        admin_solution_component: false,
                    }
                case "device":
                    return {
                        ...state,
                        breadcrumb: 'Device',
                        admin_dashboard_component: false,
                        admin_device_component: true,
                        admin_user_component: false,
                        admin_data_component: false,
                        admin_solution_component: false,
                    }
                case "user":
                    return {
                        ...state,
                        breadcrumb: 'User',
                        admin_dashboard_component: false,
                        admin_device_component: false,
                        admin_user_component: true,
                        admin_data_component: false,
                        admin_solution_component: false,
                    }
                case "data":
                    return {
                        ...state,
                        breadcrumb: 'Data',
                        admin_dashboard_component: false,
                        admin_device_component: false,
                        admin_user_component: false,
                        admin_data_component: true,
                        admin_solution_component: false,
                    }
                case "solution":
                    return {
                        ...state,
                        breadcrumb: 'Solution',
                        admin_dashboard_component: false,
                        admin_device_component: false,
                        admin_user_component: false,
                        admin_data_component: false,
                        admin_solution_component: true,
                    }
                default:
                    return {
                        ...state,
                    }
            }

        case OPEN_SIDEBAR:
            return {
                ...state,
                sideBar: !state.sideBar
            }

        case SHOW_SIDEBAR:
            return {
                ...state,
                sideBar: true,
            }

        case HIDE_SIDEBAR:
            return {
                ...state,
                sideBar: false,
            }

        case CHANGE_INTERVAL:
            if (action.option == "1 Hour") {
                var humidity = initValueHour();
                var temperature = initValueHour();
                if (action.loadData.length > 0) {
                    action.loadData.forEach(element => {
                        humidity.splice(parseInt(element.min), 1, element.humidity);
                        temperature.splice(parseInt(element.min), 1, element.temperature);
                    });
                }
            } else {
                var humidity = initValueDay();
                var temperature = initValueDay();
                if (action.loadData.length > 0) {
                    action.loadData.forEach(element => {
                        humidity.splice(parseInt(element.h), 1, element.humidity);
                        temperature.splice(parseInt(element.h), 1, element.temperature);
                    });
                }
            }
            return {
                ...state,
                checkInterval: !state.checkInterval,
                interval: action.option,
                humidity_chart: humidity,
                temperature_chart: temperature,
                select_device: action.device,
                select_date: action.date
            }

        case OPEN_MODAL:
            switch (action.object.title) {
                case 'UPDATE DEVICE':
                    state.id_update = action.element.id;
                    state.value_name_device = action.element.name;
                    state.value_code_device = action.element.code;
                    state.value_date_device = action.element.manufacturing_date;
                    break;
                case 'UPDATE USER':
                    state.id_update = action.element.id;
                    state.value_fullname_user = action.element.fullname;
                    state.value_address_user = action.element.address;
                    state.value_phone_user = action.element.phone;
                    state.value_role_user = action.element.role;
                    break;
            }
            return {
                ...state,
                modal: true,
                object_form: action.object,
                message_success: false,
                message_fail: false,
            }

        case CLOSE_MODAL:
            return {
                ...state,
                modal: false,
                value_name_device: '',
                value_code_device: '',
                value_date_device: new Date(),
                value_username_user: '',
                value_password_user: '',
                value_fullname_user: '',
                value_address_user: '',
                value_phone_user: '',
                value_role_user: '0',
            }

        case SAVE_INPUT:
            switch (action.name) {
                case 'DEVICE_NAME':
                    return {
                        ...state,
                        value_name_device: action.value
                    }
                case 'DEVICE_CODE':
                    return {
                        ...state,
                        value_code_device: action.value
                    }
                case 'DEVICE_DATE':
                    return {
                        ...state,
                        value_date_device: action.value
                    }
                case 'USER_USERNAME':
                    return {
                        ...state,
                        value_username_user: action.value
                    }
                case 'USER_PASSWORD':
                    return {
                        ...state,
                        value_password_user: action.value
                    }
                case 'USER_FULLNAME':
                    return {
                        ...state,
                        value_fullname_user: action.value
                    }
                case 'USER_ADDRESS':
                    return {
                        ...state,
                        value_address_user: action.value
                    }
                case 'USER_PHONE':
                    return {
                        ...state,
                        value_phone_user: action.value
                    }
                case 'USER_ROLE':
                    return {
                        ...state,
                        value_role_user: action.value
                    }
            }

        case SUBMIT_ADD_DEVICE_FORM:
            if (action.message == true) {
                return {
                    ...state,
                    message_success: true,
                    message_fail: false,
                    value_name_device: '',
                    value_code_device: '',
                }
            } else {
                return {
                    ...state,
                    message_fail: true,
                    message_success: false,
                }
            }

        case SUBMIT_ADD_DEVICE_USER_FORM:
            if (action.message == true) {
                return {
                    ...state,
                    message_success: true,
                    message_fail: false,
                    value_code_device: '',
                }
            } else {
                return {
                    ...state,
                    message_fail: true,
                    message_success: false,
                    value_code_device: '',
                }
            }

        case SUBMIT_ADD_USER_FORM:
            if (action.message == true) {
                return {
                    ...state,
                    message_success: true,
                    message_fail: false,
                    value_username_user: '',
                    value_password_user: '',
                    value_fullname_user: '',
                    value_address_user: '',
                    value_phone_user: '',
                    value_role_user: '0',
                }
            } else {
                return {
                    ...state,
                    message_fail: true,
                    message_success: false,
                }
            }

        case SUBMIT_LOGIN:
            sessionStorage.setItem('token', action.token);
            sessionStorage.setItem('profile', JSON.stringify(action.user));
            return {
                ...state,
                token: action.token
            }

        case TOKEN_EXPIRED:
            return {
                ...state,
                token_expired: true
            }

        case OPEN_ALERT:
            return {
                ...state,
                alert: true,
                title_alert: action.title,
                id_delete: action.id
            }

        case CLOSE_ALERT:
            return {
                ...state,
                alert: false
            }

        case DELETE_DEVICE:
            return {
                ...state,
                alert: false,
                id_delete: '',
            }

        case DELETE_USER:
            return {
                ...state,
                alert: false,
                id_delete: '',
            }

        case DELETE_DATA:
            return {
                ...state,
                alert: false,
                id_delete: '',
            }

        case CLOSE_MESSAGE:
            return {
                ...state,
                message_success: false,
                message_fail: false
            }
        case LOAD_DEVICE_UPDATE:
            return {
                ...state,
                value_name_device: action.loadData.name,
                value_code_device: action.loadData.code,
                value_date_device: action.loadData.manufacturing_date,
            }
        case LOAD_USER_UPDATE:
            return {
                ...state,
                value_fullname_user: action.loadData.fullname,
                value_address_user: action.loadData.address,
                value_phone_user: action.loadData.phone,
                value_role_user: action.loadData.role,
            }
        case SHOW_MESSAGE:
            if (action.message == true) {
                return {
                    ...state,
                    message_success: true,
                    message_fail: false,
                }
            } else {
                return {
                    ...state,
                    message_fail: true,
                    message_success: false,
                }
            }
        case GET_ONE_DEVICE:
            return {
                ...state,
                nameDevice: action.loadData.name,
                codeDevice: action.loadData.code,
            }
        case GET_CURRENT_DEVICE:
            return {
                ...state,
                currentHumidity: action.loadData.humidity,
                currentTemperature: action.loadData.temperature
            }
        case GET_ONE_LOCATION:
            return {
                ...state,
                latitude: action.loadData.latitude,
                longitude: action.loadData.longitude
            }
        default:
            return {
                ...state,
            }
    }
}

export default Reducer;