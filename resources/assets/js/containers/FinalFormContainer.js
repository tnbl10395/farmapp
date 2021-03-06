import { connect } from 'react-redux';
import FinalFormComponent from '../components/FinalFormComponent';
import { closeFinalForm, getOneSolution, closeMessage, updatePlant, updateSolution, updatePhase, changePhaseName, getPlantsOfUser, closeMessageAlert } from '../actions/Action';
import { getOneSolutionApi, updatePlantApi, updateSolutionApi, updatePhaseApi, getPlantsOfUserApi } from '../api/api';

const mapStateToProps = (state) => ({
    plant: state.detailPlant,
    phases: state.detailPhases,
    solutions: state.detailSolution,
    messageAlert: state.message_alert,
    phaseName: state.phaseName,
    phaseId: state.phaseIdOfSolution
});
const mapDispatchToProps = (dispatch) => ({
    closeForm: () => {
        dispatch( closeFinalForm() );
    },
    getOneSolution: (phaseId, phaseName) => {
        getOneSolutionApi(dispatch, getOneSolution, phaseId);
        dispatch(changePhaseName(phaseName));
    },
    updatePlant: (data, plantId) => {
        updatePlantApi(dispatch, updatePlant, data, plantId);
    },
    closeMessage: () => {
        dispatch(closeMessage());
    },
    updateSolution: (description, solutionId, phaseId) => {
        updateSolutionApi(dispatch, updateSolution, getOneSolutionApi, getOneSolution, description, solutionId, phaseId);
    },
    updatePhase: (name, days, minTem, maxTem, minHum, maxHum, phaseId) => {
        updatePhaseApi(
            dispatch, 
            updatePhase, 
            {
                name: name,
                days: days,
                minTemperature: minTem,
                maxTemperature: maxTem,
                minHumidity: minHum,
                maxHumidity: maxHum
            },
            phaseId
        )
    },
    getPlantsOfUser: () => {
        getPlantsOfUserApi(dispatch, getPlantsOfUser);
    },
    closeMessageAlert: () => {
        dispatch(closeMessageAlert());
    }
});

export default connect (mapStateToProps,mapDispatchToProps)(FinalFormComponent);