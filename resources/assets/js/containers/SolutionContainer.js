import { connect } from 'react-redux';
import SolutionComponent from '../components/SolutionComponent';
import { getDataSolutionsAPI } from '../api/api';
import { getDataSolutions, openModal } from '../actions/Action';

const mapStateToProps = (state) => ({
    sideBar: state.sideBar,
    dataSet: state.data_solutions
});
const mapDispatchToProps = (dispatch) => ({
    getDataSolutions: () => {
        getDataSolutionsAPI(dispatch, getDataSolutions);
    },
    openModal: (object) => {
        dispatch(openModal(object));
    }
});

export default connect (mapStateToProps,mapDispatchToProps)(SolutionComponent);