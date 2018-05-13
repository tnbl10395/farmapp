import { connect } from 'react-redux';
import { AddSensorComponent } from '../components/AddSensorComponent';
import { closeModal, addSensor, getListSensors } from '../actions/Action';
import { addSensorApi, getListSensorsApi } from '../api/api';

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

    onSubmitSensor: (deviceId, name, spec, date, madeIn, picture, code) => {
        addSensorApi(
            dispatch,
            {
                deviceId: deviceId,
                name: name,
                spec: spec,
                date: date,
                madeIn: madeIn,
                picture: picture,
                code: code
            },
            addSensor,
            getListSensorsApi,
            getListSensors
        )
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSensorComponent);