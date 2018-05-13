import { connect } from 'react-redux';
import Index from '../components/Index';
import { getDeviceOfUserAPI, deleteDeviceAPI, getDataDevicesAPI, deleteUserAPI, getDataUsersAPI, deleteDataAPI, getDataValuesAPI, getAlldevicesActiveApi, getPlantsOfUserApi, deleteSensorAPI, getListSensorsApi, getListDeviceNoActiveApi } from '../api/api';
import { getDeviceOfUser, closeModal, closeAlert, deleteDevice, getDataDevices, deleteUser, getDataUsers, deleteData, getDataValues, getAlldevicesActive, getPlantsOfUser, deleteSensor, getListSensors, getListDeviceNoActive } from '../actions/Action';

const mapStateToProps = (state) => ({
    sideBar: state.sideBar,
    modal: state.modal,
    object: state.object_form,
    token: state.token,
    alert: state.alert,
    title: state.title_alert,
    id: state.id_delete,
    breadcrumb: state.breadcrumb,
    isFinalForm: state.isFinalForm
});
const mapDispatchToProps = (dispatch) => ({
    getDevicesOfUser: () => {
        getDeviceOfUserAPI(dispatch, getDeviceOfUser);
    },
    closeAlert: () => {
        dispatch(closeAlert());
    },
    delete: (title, id) => {
        switch (title) {
            case 'DELETE_DEVICE':
                deleteDeviceAPI(dispatch, deleteDevice, id, getDataDevices, getDataDevicesAPI)
                break;
            case 'DELETE_USER':
                deleteUserAPI(dispatch, deleteUser, id, getDataUsers, getDataUsersAPI)
                break;
            case 'DELETE_DATA':
                deleteDataAPI(dispatch, deleteData, id, getDataValues, getDataValuesAPI)
                break;
            case 'DELETE_SENSOR':
                deleteSensorAPI(dispatch, deleteSensor, id, getListSensorsApi, getListSensors)
                break;
        }
    },
    getAllDevicesActive: () => {
        getAlldevicesActiveApi(dispatch, getAlldevicesActive);
    },
    getPlantsOfUser: () => {
        getPlantsOfUserApi(dispatch, getPlantsOfUser);
    },
    getListDeviceNoActive: () => {
        getListDeviceNoActiveApi(dispatch, getListDeviceNoActive);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);