import { CHOOSE_OPTION_SIDEBAR, OPEN_SIDEBAR, GET_DATA_DEVICES, GET_DATA_VALUES, GET_DATA_USERS, GET_DATA_SOLUTIONS, CHANGE_DISPLAY_DATA_SCREEN, GET_REAL_CHART_BASED_ON_HOUR, GET_OLD_CHART_BASED_ON_HOUR, GET_DEVICES_OF_USER, CHANGE_INTERVAL, GET_OLD_CHART_BASED_ON_DAY, SAVE_DEVICE, GET_REAL_CHART_BASED_ON_DAY, OPEN_MODAL, CLOSE_MODAL, SAVE_INPUT_TEXT } from "../actions/TypeAction";

const initialState = {
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
    value_input_device: '',

};

const edit = (id) => ('<a href="/' + id + '" style="border-radius: 5px; padding: 5px 5px 5px 6px; background-color:#3498db; color:#fff;margin-right:10px;" class="fa fa-edit"></a>');
const remove = (id) => ('<a href="" style="border-radius: 5px; padding: 5px 7px 5px 7px; background-color:#e74c3c; color:#fff" class="fa fa-remove"></a>');
const actRemove = (id) => ('<div style="text-align: center">' + remove(id) + '</div>');
const act = (id) => ('<div style="text-align: center">' + edit(id) + remove(id) + '</div>');

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
                    data.push([obj.id, obj.name, obj.manufacturing_date, obj.status, obj.updated_at, act(obj.id)]);
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
                        actRemove]);
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
                        act]);
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
                        act]);
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
        case SAVE_INPUT_TEXT:
            console.log(action.value)
            // switch (action.name) {
            //     case '':
                    
            //         break;
            
            //     default:
            //         break;
            // }
            return {
                ...state,

            }
        default:
            return {
                ...state,
            }
    }

}

export default Reducer;