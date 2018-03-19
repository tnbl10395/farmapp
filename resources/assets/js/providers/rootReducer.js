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
    CLOSE_ALERT
} from "../actions/TypeAction";

const initialState = {
    token: null,
    token_expired: false,
    admin_device_component: true,
    admin_user_component: false,
    admin_data_component: false,
    admin_solution_component: false,
    sideBar: true,
    data_devices: [],
    data_values: [],
    data_users: [],
    data_solutions: [],
    table: false,
    humidity_chart: [],
    temperature_chart: [],
    all_devices: [],
    select_device: '',
    select_date: '',
    checkInterval: false,
    interval: 0,
    modal: false,
    object_form: null,
    value_name_device: '',
    value_code_device: '',
    value_date_device: '',
    value_username_user: '',
    value_password_user: '',
    value_fullname_user: '',
    value_address_user: '',
    value_phone_user: '',
    value_role_user: '0',
    alert: false
};

const edit = (direct, id) => ('<a href="/#/' + direct + '/' + id + '" style="border-radius: 5px; padding: 5px 5px 5px 6px; background-color:#3498db; color:#fff;margin-right:10px;" class="fa fa-edit"></a>');
const remove = (direct, id) => ('<a href="" style="border-radius: 5px; padding: 5px 7px 5px 7px; background-color:#e74c3c; color:#fff" class="fa fa-remove"></a>');
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
            var data = [];
            var dt = action.loadData;
            if (dt.length > 0) {
                dt.forEach(obj => {
                    if (obj.status == 1) {
                        var label = "<div class='label label-success col-xs-12 col-sm-12 col-md-10' style='padding:5px;font-size:15px'>Active</div>";
                    } else {
                        var label = "<div class='label label-primary col-xs-12 col-sm-12 col-md-10' style='padding:5px;font-size:15px'>Inactive</div>";
                    }
                    data.push([
                        obj.id,
                        obj.name,
                        obj.manufacturing_date,
                        obj.code,
                        label,
                        obj.updated_at,
                        act("device", obj.id)]);
                });
            }
            return {
                ...state,
                data_devices: data
            }
        case GET_DATA_VALUES:
            var data = [];
            var dt = action.loadData;
            if (dt.length > 0) {
                dt.forEach(obj => {
                    data.push([
                        obj.id,
                        obj.name,
                        obj.humidity,
                        obj.temperature,
                        obj.updated_at,
                        obj.status,
                        actRemove("data", obj.id)]);
                });
            }
            return {
                ...state,
                data_values: data
            }
        case GET_DATA_USERS:
            var data = [];
            var dt = action.loadData;
            if (dt.length > 0) {
                dt.forEach(obj => {
                    data.push([
                        obj.id,
                        obj.username,
                        obj.fullname,
                        obj.address,
                        obj.phone,
                        act("user", obj.id)]);
                });
            }
            return {
                ...state,
                data_users: data
            }
        case GET_DATA_SOLUTIONS:
            var data = [];
            var dt = action.loadData;
            if (dt.length > 0) {
                dt.forEach(obj => {
                    data.push([
                        obj.id,
                        obj.temperature,
                        obj.humidity,
                        obj.solution,
                        obj.updated_at,
                        act("solution", obj.id)]);
                });
            }
            return {
                ...state,
                data_solutions: data
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
                case "device":
                    return {
                        ...state,
                        admin_device_component: true,
                        admin_user_component: false,
                        admin_data_component: false,
                        admin_solution_component: false,
                    }
                case "user":
                    return {
                        ...state,
                        admin_device_component: false,
                        admin_user_component: true,
                        admin_data_component: false,
                        admin_solution_component: false,
                    }
                case "data":
                    return {
                        ...state,
                        admin_device_component: false,
                        admin_user_component: false,
                        admin_data_component: true,
                        admin_solution_component: false,
                    }
                case "solution":
                    return {
                        ...state,
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
            return {
                ...state,
                modal: true,
                object_form: action.object
            }
        case CLOSE_MODAL:
            return {
                ...state,
                modal: false,
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
            return {
                ...state,
                value_name_device: '',
                value_code_device: '',
                value_date_device: '',
            }
        case SUBMIT_ADD_USER_FORM:
            return {
                ...state,
                value_username_user: '',
                value_password_user: '',
                value_fullname_user: '',
                value_address_user: '',
                value_phone_user: '',
                value_role_user: '0',
            }
        case SUBMIT_LOGIN:
            sessionStorage.setItem('token', action.token);
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
                alert: true
            }
        case CLOSE_ALERT:
            return {
                ...state,
                alert: false
            }
        default:
            return {
                ...state,
            }
    }

}

export default Reducer;