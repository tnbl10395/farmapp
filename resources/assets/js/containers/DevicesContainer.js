import { connect } from 'react-redux';
import DevicesComponent from '../components/DevicesComponent';
import { chooseOptionSidebar, getDataDevices, openModal, openAlert, getListSensors } from "../actions/Action";
import { getDataDevicesAPI, loadDeviceUpdateAPI, getListSensorsApi } from '../api/api';

const mapStateToProps = (state) => ({
    sideBar: state.sideBar,
    dataSet: state.data_devices,
    listSensors: state.listSensors
});
const mapDispatchToProps = (dispatch) => ({
    getDataDevices: () => {
        getDataDevicesAPI(dispatch,getDataDevices);
    },
    openModal: (object, element) => {
        dispatch(openModal(object, element));
    },
    openAlert: (title, id) => {
        dispatch(openAlert(title, id));
    },
    getListSensors: () => {
        getListSensorsApi(dispatch, getListSensors);
    }
});

export default connect (mapStateToProps,mapDispatchToProps)(DevicesComponent);