import { connect } from 'react-redux';
import SideBar from '../components/SideBar';
import { chooseOptionSidebar } from "../actions/Action";

const mapStateToProps = (state) => ({
    admin_dashboard_component:  state.admin_dashboard_component,
    admin_device_component: state.admin_device_component,
    admin_user_component: state.admin_user_component,
    admin_data_component: state.admin_data_component,
    admin_plant_component: state.admin_plant_component,
    admin_area_component: state.admin_area_component,
    sideBar: state.sideBar
});
const mapDispatchToProps = (dispatch) => ({
    chooseOption: (option) => {
        dispatch(chooseOptionSidebar(option));
    },
    loadContent: (option) => {
        dispatch(chooseOptionSidebar(option));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
