import { connect } from 'react-redux';
import FinalFormComponent from '../components/FinalFormComponent';
import { closeFinalForm, getOneSolution, closeMessage, updatePlant, updateSolution, updatePhase, changePhaseName } from '../actions/Action';
import { getOneSolutionApi, updatePlantApi, updateSolutionApi, updatePhaseApi } from '../api/api';

const mapStateToProps = (state) => ({
    plant: state.detailPlant,
    phases: state.detailPhases,
    solutions: state.detailSolution,
    messageSuccess: state.message_success,
    phaseName: state.phaseName
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
    updateSolution: (description, solutionId) => {
        updateSolutionApi(dispatch, updateSolution, description, solutionId);
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
    }
});

export default connect (mapStateToProps,mapDispatchToProps)(FinalFormComponent);