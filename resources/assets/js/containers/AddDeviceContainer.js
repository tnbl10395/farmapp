import { connect } from 'react-redux';
import { AddDeviceComponent } from '../components/AddDeviceComponent';
import { saveInput, submitAddDeviceForm, submitAddDeviceUserForm, getDataDevices, closeMessage } from '../actions/Action';
import { submitAddDeviceFormAPI, submitAddDeviceUserFormAPI, getDataDevicesAPI } from '../api/api';

const mapStateToProps = (state) => ({
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDeviceComponent);