import { connect } from 'react-redux';
import Index from '../components/Index';
import { getDeviceOfUserAPI } from '../api/api';
import { getDeviceOfUser, closeModal,  } from '../actions/Action';

const mapStateToProps = (state) => ({
    sideBar: state.sideBar,
    modal: state.modal,
    object: state.object_form
});
const mapDispatchToProps = (dispatch) => ({
    getDevicesOfUser: () => {
        getDeviceOfUserAPI(dispatch,getDeviceOfUser);
    },
    closeModal: () => {
        dispatch(closeModal());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);