import { connect } from 'react-redux';
import { UpdateSensorComponent } from '../components/UpdateSensorComponent';
import { closeModal, updateSensor, getListSensors } from '../actions/Action';
import { updateSensorApi, getListSensorsApi } from '../api/api';

const mapStateToProps = (state) => ({
    messageSuccess: state.message_success,
    messageFail: state.message_fail
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => {
        dispatch(closeModal());
    },

    closeMessage: () => {
        dispatch(closeMessage());
    },

    onSubmitSensor: (id, deviceId, name, spec, date, madeIn, picture, code) => {
        updateSensorApi(
            dispatch,
            {
                id: id,
                deviceId: deviceId,
                name: name,
                spec: spec,
                date: date,
                madeIn: madeIn,
                picture: picture,
                code: code
            },
            updateSensor,
            getListSensorsApi,
            getListSensors
        )
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSensorComponent);