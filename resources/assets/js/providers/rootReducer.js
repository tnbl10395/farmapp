import { CHOOSE_OPTION_SIDEBAR, LOAD_CONTENT } from "../actions/TypeAction";

const initialState = {
    admin_device_component: true,
    admin_user_component: false,
    admin_data_component: false,
    admin_solution_component: false,
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
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
            return {
                ...state,
            }

        // case LOAD_CONTENT: 

        default:
            return {
                ...state
            }
    }

}

export default Reducer;