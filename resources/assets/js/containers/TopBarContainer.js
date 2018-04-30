import { connect } from 'react-redux';
import TopBar from '../components/TopBar'
import { openSidebar, openAlert, showSidebar, hideSidebar } from '../actions/Action';

const mapStateToProps = (state) => ({
    sideBar: state.sideBar
});
const mapDispatchToProps = (dispatch) => ({
    openSidebar: () => {
        dispatch(openSidebar());
    },
    openAlert: (title, id) => {
        dispatch(openAlert(title, id));
    },
    showSideBar: () => {
        dispatch(showSidebar());
    },
    hideSideBar: () => {
        dispatch(hideSidebar());
    }
});

export default connect (mapStateToProps,mapDispatchToProps)(TopBar);