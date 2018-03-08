import { CHOOSE_OPTION_SIDEBAR, OPEN_SIDEBAR, GET_DATA_DEVICES, GET_DATA_VALUES } from "../actions/TypeAction";

const initialState = {
    admin_device_component: true,
    admin_user_component: false,
    admin_data_component: false,
    admin_solution_component: false,
    sideBar: true,
    data_devices: [],
    data_values: [],
};

const edit = (id) => ('<a href="/'+id+'" style="border-radius: 5px; padding: 5px 5px 5px 6px; background-color:#3498db; color:#fff;margin-right:10px;" class="fa fa-edit"></a>');
const remove = (id) => ('<a href="" style="border-radius: 5px; padding: 5px 7px 5px 7px; background-color:#e74c3c; color:#fff" class="fa fa-remove"></a>');
const act = (id) => ('<div style="text-align: center">' + edit(id) + remove(id) + '</div>');

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA_DEVICES:
            var data = [];
            var dt = action.loadData;
            dt.forEach(obj => {
                data.push([obj.id, obj.name, obj.manufacturing_date, obj.status, obj.updated_at, act(obj.id)]);
            });
            return {
                ...state,
                data_devices: data
            }
        case GET_DATA_VALUES:
            var data = [];
            var dt = action.loadData;
            dt.forEach(obj => {
                data.push([
                    obj.id, 
                    obj.name, 
                    obj.humidity, 
                    obj.temperature, 
                    obj.latitude, 
                    obj.longitude, 
                    obj.measured_date, 
                    obj.status,
                    act]);
            });
            return {
                ...state,
                data_values: data
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
        default:
            return {
                ...state,
            }
    }

}

export default Reducer;