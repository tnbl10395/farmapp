import { connect } from 'react-redux';
import UpdateDeviceComponent from '../components/UpdateDeviceComponent';
import { loadDeviceUpdateAPI, updateDeviceAPI } from '../api/api';
import { loadDeviceUpdate, updateDevice, closeMessage, saveInput } from '../actions/Action';

const mapStateToProps = (state) => ({
    sideBar: state.sideBar,
    inputName: state.value_name_device,
    inputCode: state.value_code_device,
    inputDate: state.value_date_device,
    messageSuccess: state.message_success,
    messageFail: state.message_fail
});

const mapDispatchToProps = (dispatch) => ({
    loadData: (id) => {
        loadDeviceUpdateAPI(dispatch, loadDeviceUpdate, id);
    },
    update: (id, object) => {
        updateDeviceAPI(dispatch, updateDevice, id, object);
    },
    closeMessage: () => {
        dispatch(closeMessage());
    },
    saveInput: (name, value) => {
        dispatch(saveInput(name, value))
    },
});

export default connect (mapStateToProps, mapDispatchToProps) (UpdateDeviceComponent);