import { connect } from 'react-redux';
import UserComponent from '../components/UserComponent';
import { getDataUsersAPI } from '../api/api';
import { getDataUsers, openModal, openAlert } from '../actions/Action';


const mapStateToProps = (state) => ({
    sideBar: state.sideBar,
    dataSet: state.data_users
});
const mapDispatchToProps = (dispatch) => ({
    getDataUsers: () => {
        getDataUsersAPI(dispatch, getDataUsers);
    },
    openModal: (object, element) => {
        dispatch(openModal(object, element));
    },
    openAlert: (title, id) => {
        dispatch(openAlert(title, id));
    }
});

export default connect (mapStateToProps,mapDispatchToProps)(UserComponent);