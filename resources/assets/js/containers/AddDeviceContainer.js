import { connect } from 'react-redux';
import { AddDeviceComponent } from '../components/AddDeviceComponent';
import { saveInput, submitAddDeviceForm, submitAddDeviceUserForm, getDataDevices, closeMessage, closeModal, showMessage, getDeviceOfUser } from '../actions/Action';
import { submitAddDeviceFormAPI, submitAddDeviceUserFormAPI, getDataDevicesAPI, updateDeviceAPI, getDeviceOfUserAPI } from '../api/api';

const mapStateToProps = (state) => ({
    id: state.id_update,
    inputName: state.value_name_device,
    inputCode: state.value_code_device,
    inputDate: state.value_date_device,
    messageSuccess: state.message_success,
    messageFail: state.message_fail
});

const mapDispatchToProps = (dispatch) => ({
    saveInput: (name, value) => {
        dispatch(saveInput(name, value))
    },
    submitFormAdmin: (name, date, code) => {
        submitAddDeviceFormAPI(dispatch, submitAddDeviceForm, name, date, code, getDataDevices, getDataDevicesAPI);
    },
    submitFormUser: (code) => {
        submitAddDeviceUserFormAPI(dispatch, submitAddDeviceUserForm, getDataDevices, getDataDevicesAPI, getDeviceOfUser, getDeviceOfUserAPI, code)
    },
    closeMessage: () => {
        dispatch(closeMessage());
    },
    updateFormAdmin: (id, object) => {
        updateDeviceAPI(dispatch, showMessage, id, object, getDataDevices, getDataDevicesAPI);
    },
    updateFormUser: (id, code) => {
        //
    },
    closeModal: () => {
        dispatch(closeModal());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDeviceComponent);