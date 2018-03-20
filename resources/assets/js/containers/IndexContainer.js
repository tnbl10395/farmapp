import { connect } from 'react-redux';
import Index from '../components/Index';
import { getDeviceOfUserAPI } from '../api/api';
import { getDeviceOfUser, closeModal, closeAlert, } from '../actions/Action';

const mapStateToProps = (state) => ({
    sideBar: state.sideBar,
    modal: state.modal,
    object: state.object_form,
    token: state.token,
    alert: state.alert,
    title: state.title_alert
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);