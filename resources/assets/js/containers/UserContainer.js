import { connect } from 'react-redux';
import UserComponent from '../components/UserComponent';
import { getDataUsersAPI } from '../api/api';
import { getDataUsers } from '../actions/Action';


const mapStateToProps = (state) => ({
    sideBar: state.sideBar,
    dataSet: state.data_users
});
const mapDispatchToProps = (dispatch) => ({
    getDataUsers: () => {
        getDataUsersAPI(dispatch, getDataUsers);
    }
});

export default connect (mapStateToProps,mapDispatchToProps)(UserComponent);