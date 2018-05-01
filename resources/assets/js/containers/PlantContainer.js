import { connect } from 'react-redux';
import PlantComponent from '../components/PlantComponent';
import { openModal, openAlert } from '../actions/Action';

const mapStateToProps = (state) => ({
    plants: state.plantsOfUser,
    sideBar: state.sideBar,
});

const mapDispatchToProps = (dispatch) => ({
    openModal: (object, element) => {
        dispatch(openModal(object, element));
    },
    openAlert: (title, id) => {
        dispatch(openAlert(title, id));
    },
});

export default connect (mapStateToProps,mapDispatchToProps)(PlantComponent);