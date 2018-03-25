import { connect } from 'react-redux';
import UpdateDeviceComponent from '../components/UpdateDeviceComponent';
import { loadDeviceUpdateAPI } from '../api/api';
import { loadDeviceUpdate } from '../actions/Action';

const mapStateToProps = (state) => ({
    sideBar: state.sideBar,
    inputName: state.value_name_device,
    inputCode: state.value_code_device,
    inputDate: state.value_date_device
});

const mapDispatchToProps = (dispatch) => ({
    loadData: (id) => {
        loadDeviceUpdateAPI(dispatch, loadDeviceUpdate, id);
    }
});

export default connect (mapStateToProps, mapDispatchToProps) (UpdateDeviceComponent);