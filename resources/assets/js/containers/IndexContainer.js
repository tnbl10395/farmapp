import { connect } from 'react-redux';
import Index from '../components/Index';
import { getDeviceOfUserAPI, deleteDeviceAPI } from '../api/api';
import { getDeviceOfUser, closeModal, closeAlert, deleteDevice, } from '../actions/Action';

const mapStateToProps = (state) => ({
    sideBar: state.sideBar,
    modal: state.modal,
    object: state.object_form,
    token: state.token,
    alert: state.alert,
    title: state.title_alert,
    id: state.id_delete
});
const mapDispatchToProps = (dispatch) => ({
    getDevicesOfUser: () => {
        getDeviceOfUserAPI(dispatch, getDeviceOfUser);
    },
    closeModal: () => {
        dispatch(closeModal());
    },
    closeAlert: () => {
        dispatch(closeAlert());
    },
    delete: (id) => {
        deleteDeviceAPI(dispatch, deleteDevice, id)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);