import { connect } from 'react-redux';
import ActionSolutionComponent from '../components/ActionSolutionComponent';
import { saveInput, submitAddUserForm, getDataUsers, closeMessage, closeModal, showMessage } from '../actions/Action';
import { submitAddUserFormAPI, getDataUsersAPI, updateUserAPI } from '../api/api';

const mapStateToProps = (state) => ({
    messageSuccess: state.message_success,
    messageFail: state.message_fail,
    id: state.id_update
});

const mapDispatchToProps = (dispatch) => ({
    saveInput: (name, value) => {
        dispatch(saveInput(name, value))
    },
    submitForm: (username, password, fullname, address, phone, role) => {
        submitAddUserFormAPI(dispatch, submitAddUserForm, username, password, fullname, address, phone, role, getDataUsers, getDataUsersAPI);
    },
    closeMessage: () => {
        dispatch(closeMessage());
    },
    closeModal: () => {
        dispatch(closeModal());
    },
    updateForm: (id, object) => {
        updateUserAPI(dispatch, showMessage, id, object, getDataUsers, getDataUsersAPI);
    }
});

export default connect (mapStateToProps,mapDispatchToProps)(ActionSolutionComponent);