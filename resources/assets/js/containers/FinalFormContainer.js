import { connect } from 'react-redux';
import FinalFormComponent from '../components/FinalFormComponent';
import { closeFinalForm, getOneSolution } from '../actions/Action';
import { getOneSolutionApi } from '../api/api';

const mapStateToProps = (state) => ({
    plant: state.detailPlant,
    phases: state.detailPhases,
    solutions: state.detailSolution
});
const mapDispatchToProps = (dispatch) => ({
    closeForm: () => {
        dispatch( closeFinalForm() );
    },
    getOneSolution: (phaseId) => {
        getOneSolutionApi(dispatch, getOneSolution, phaseId);
    }
});

export default connect (mapStateToProps,mapDispatchToProps)(FinalFormComponent);