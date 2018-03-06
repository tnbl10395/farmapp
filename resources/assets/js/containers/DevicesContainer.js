import { connect } from 'react-redux';
import DevicesComponent from '../components/DevicesComponent';
import { chooseOptionSidebar } from "../actions/Action";

const mapStateToProps = (state) => ({
    sideBar: state.sideBar
});
const mapDispatchToProps = (dispatch) => ({
});

export default connect (mapStateToProps,mapDispatchToProps)(DevicesComponent);