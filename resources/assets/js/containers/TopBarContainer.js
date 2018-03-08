import { connect } from 'react-redux';
import TopBar from '../components/TopBar'
import { openSidebar } from '../actions/Action';

const mapStateToProps = (state) => ({

});
const mapDispatchToProps = (dispatch) => ({
    openSidebar: () => {
        dispatch(openSidebar());
    }
});

export default connect (mapStateToProps,mapDispatchToProps)(TopBar);