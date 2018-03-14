import { connect } from 'react-redux';
import { AddDeviceComponent } from '../components/AddDeviceComponent';
import { saveInput, submitAddDeviceForm } from '../actions/Action';
import { submitAddDeviceFormAPI } from '../api/api';

const mapStateToProps = (state) => ({
    inputName: state.value_name_device,
    inputCode: state.value_code_device,
    inputDate: state.value_date_device
});

const mapDispatchToProps = (dispatch) => ({
    saveInput: (name, value) => {
        dispatch(saveInput(name, value))
    },
    submitForm: (name, date, code) => {
        submitAddDeviceFormAPI(dispatch, submitAddDeviceForm, name, date, code);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDeviceComponent);