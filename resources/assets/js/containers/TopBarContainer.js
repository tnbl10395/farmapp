import { connect } from 'react-redux';
import TopBar from '../components/TopBar'
import { openSidebar, openAlert } from '../actions/Action';

const mapStateToProps = (state) => ({
    sideBar: state.sideBar
});
const mapDispatchToProps = (dispatch) => ({
    openSidebar: () => {
        dispatch(openSidebar());
    },
    openAlert: (title, id) => {
        dispatch(openAlert(title, id));
    }
});

export default connect (mapStateToProps,mapDispatchToProps)(TopBar);