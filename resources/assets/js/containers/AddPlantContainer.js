import { connect } from 'react-redux';
import { AddPlantComponent } from '../components/AddPlantComponent';
import { closeModal } from '../actions/Action';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => {
        dispatch(closeModal());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPlantComponent);