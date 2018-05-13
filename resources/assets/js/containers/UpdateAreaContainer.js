import { connect } from 'react-redux';
import { UpdateAreaComponent } from '../components/UpdateAreaComponent';
import { closeModal, closeMessage, getListArea, getListDeviceNoActive } from '../actions/Action';
import { getListAreaApi, getListDeviceNoActiveApi } from '../api/api';

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
        updateAreaApi(
            dispatch,
            {
                deviceId: deviceId,
                name: name,
            },
            updateArea,
            getListAreaApi,
            getListArea,
            getListDeviceNoActiveApi,
            getListDeviceNoActive
        )
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAreaComponent);