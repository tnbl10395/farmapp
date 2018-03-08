import { connect } from 'react-redux';
import UserComponent from '../components/UserComponent';


const mapStateToProps = (state) => ({
    sideBar: state.sideBar,
});
const mapDispatchToProps = (dispatch) => ({

});

export default connect (mapStateToProps,mapDispatchToProps)(UserComponent);