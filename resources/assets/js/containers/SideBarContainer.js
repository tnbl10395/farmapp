import { connect } from 'react-redux';
import SideBar from '../components/SideBar';
import { chooseOptionSidebar } from "../actions/Action";

const mapStateToProps = (state) => ({
    admin_device_component: state.admin_device_component,
    admin_user_component: state.admin_user_component,
    admin_data_component: state.admin_data_component,
    admin_solution_component: state.admin_solution_component
});
const mapDispatchToProps = (dispatch) => ({
    chooseOption: (option) => {
        dispatch(chooseOptionSidebar(option));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
