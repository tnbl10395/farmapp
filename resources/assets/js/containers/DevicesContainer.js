import { connect } from 'react-redux';
import DevicesComponent from '../components/DevicesComponent';
import { chooseOptionSidebar, getDataDevices, openModal, openAlert } from "../actions/Action";
import { getDataDevicesAPI, loadDeviceUpdateAPI } from '../api/api';

const mapStateToProps = (state) => ({
    sideBar: state.sideBar,
    dataSet: state.data_devices,
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
    // openUpdate: (id) => {
    //     loadDeviceUpdateAPI(dispatch, loadDeviceUpdate, id);
    // }
});

export default connect (mapStateToProps,mapDispatchToProps)(DevicesComponent);