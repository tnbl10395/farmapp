import { connect } from 'react-redux';
import Index from '../components/Index';

const mapStateToProps = (state) => ({
    sideBar: state.sideBar,
});
const mapDispatchToProps = (dispatch) => ({
    getDataDevices: () => {
        getDataDevicesAPI(dispatch,getDataDevices);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);