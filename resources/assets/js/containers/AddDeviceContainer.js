import { connect } from 'react-redux';
import { AddDeviceComponent } from '../components/AddDeviceComponent';
import { saveInput, submitAddDeviceForm, submitAddDeviceUserForm, getDataDevices, closeMessage, updateDevice } from '../actions/Action';
import { submitAddDeviceFormAPI, submitAddDeviceUserFormAPI, getDataDevicesAPI, updateDeviceAPI } from '../api/api';

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
        submitAddDeviceUserFormAPI(dispatch, submitAddDeviceUserForm, code)
    },
    closeMessage: () => {
        dispatch(closeMessage());
    },
    updateFormAdmin: (id, object) => {
        updateDeviceAPI(dispatch, updateDevice, id, object, getDataDevices, getDataDevicesAPI);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDeviceComponent);