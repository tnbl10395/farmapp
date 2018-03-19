import { connect } from 'react-redux';
import TopBar from '../components/TopBar'
import { openSidebar, openAlert } from '../actions/Action';

const mapStateToProps = (state) => ({

});
const mapDispatchToProps = (dispatch) => ({
    openSidebar: () => {
        dispatch(openSidebar());
    },
    openAlert: () => {
        dispatch(openAlert());
    }
});

export default connect (mapStateToProps,mapDispatchToProps)(TopBar);