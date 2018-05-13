import { connect } from 'react-redux';
import AreaComponent from '../components/AreaComponent';
import { openModal, openAlert, getListArea } from "../actions/Action";
import { getListAreaApi } from '../api/api';

const mapStateToProps = (state) => ({
    sideBar: state.sideBar,
    dataSet: state.listArea,
});
const mapDispatchToProps = (dispatch) => ({
    getListArea: () => {
        getListAreaApi(dispatch, getListArea);
    },
    openModal: (object, element) => {
        dispatch(openModal(object, element));
    },
    openAlert: (title, id) => {
        dispatch(openAlert(title, id));
    },
});

export default connect (mapStateToProps,mapDispatchToProps)(AreaComponent);