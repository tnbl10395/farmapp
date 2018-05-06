import { connect } from 'react-redux';
import PlantComponent from '../components/PlantComponent';
import { openModal, openAlert, getOneInformationPlant, getOneSolution } from '../actions/Action';
import { getOneInformationPlantApi, getOneSolutionApi } from '../api/api';

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
    getOnePlant: (plantId) => {
        getOneInformationPlantApi(dispatch, getOneInformationPlant, getOneSolutionApi, getOneSolution, plantId);
    }
});

export default connect (mapStateToProps,mapDispatchToProps)(PlantComponent);