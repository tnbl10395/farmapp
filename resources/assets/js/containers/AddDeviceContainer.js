import { connect } from 'react-redux';
import { AddDeviceComponent } from '../components/AddDeviceComponent';

const mapStateToProps = (state) => ({
    sideBar: state.sideBar
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(AddDeviceComponent);