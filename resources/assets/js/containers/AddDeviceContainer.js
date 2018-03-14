import { connect } from 'react-redux';
import { AddDeviceComponent } from '../components/AddDeviceComponent';
import { saveInputText } from '../actions/Action';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    saveInputText: (name, value) => {
        dispatch(saveInputText(name, value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDeviceComponent);