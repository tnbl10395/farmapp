import { connect } from 'react-redux';
import { AddSensorComponent } from '../components/AddSensorComponent';
import { closeModal } from '../actions/Action';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => {
        dispatch(closeModal());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSensorComponent);