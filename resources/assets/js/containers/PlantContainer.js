import { connect } from 'react-redux';
import PlantComponent from '../components/PlantComponent';
import { getPlantsOfUser, openModal, openAlert } from '../actions/Action';
import { getPlantsOfUserApi } from '../api/api';

const mapStateToProps = (state) => ({
    plants: state.plantsOfUser,
    sideBar: state.sideBar,
});

const mapDispatchToProps = (dispatch) => ({
    getPlantsOfUser: () => {
        getPlantsOfUserApi(dispatch, getPlantsOfUser);
    },
    openModal: (object, element) => {
        dispatch(openModal(object, element));
    },
    openAlert: (title, id) => {
        dispatch(openAlert(title, id));
    },
});

export default connect (mapStateToProps,mapDispatchToProps)(PlantComponent);