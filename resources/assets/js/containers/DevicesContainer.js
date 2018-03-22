import { connect } from 'react-redux';
import DevicesComponent from '../components/DevicesComponent';
import { chooseOptionSidebar, getDataDevices, openModal, openAlert } from "../actions/Action";
import { getDataDevicesAPI } from '../api/api';

const mapStateToProps = (state) => ({
    sideBar: state.sideBar,
    dataSet: state.data_devices,
    id: state.id_delete,
    alert: state.alert
});
const mapDispatchToProps = (dispatch) => ({
    getDataDevices: () => {
        getDataDevicesAPI(dispatch,getDataDevices);
    },
    openModal: (object) => {
        dispatch(openModal(object));
    },
    openAlert: (title, id) => {
        dispatch(openAlert(title, id));
    },
});

export default connect (mapStateToProps,mapDispatchToProps)(DevicesComponent);