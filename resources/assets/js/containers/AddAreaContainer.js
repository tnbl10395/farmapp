import { connect } from 'react-redux';
import { AddAreaComponent } from '../components/AddAreaComponent';
import { closeModal, closeMessage, addArea, getListArea, getListDeviceNoActive } from '../actions/Action';
import { getListAreaApi, addAreaApi, getListDeviceNoActiveApi } from '../api/api';

const mapStateToProps = (state) => ({
    messageSuccess: state.message_success,
    messageFail: state.message_fail,
    listDevices: state.listDeviceNoActive,
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => {
        dispatch(closeModal());
    },

    closeMessage: () => {
        dispatch(closeMessage());
    },

    onSubmitArea: (deviceId, name) => {
        addAreaApi(
            dispatch,
            {
                deviceId: deviceId,
                name: name,
            },
            addArea,
            getListAreaApi,
            getListArea,
            getListDeviceNoActiveApi,
            getListDeviceNoActive
        )
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAreaComponent);