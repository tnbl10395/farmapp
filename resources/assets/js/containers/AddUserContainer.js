import { connect } from 'react-redux';
import AddUserComponent from '../components/AddUserComponent';
import { saveInput, submitAddUserForm, getDataUsers, closeMessage, closeModal, showMessage } from '../actions/Action';
import { submitAddUserFormAPI, getDataUsersAPI, updateUserAPI } from '../api/api';

const mapStateToProps = (state) => ({
    inputUsername: state.value_username_user,
    inputPassword: state.value_password_user,
    inputFullname: state.value_fullname_user,
    inputAddress: state.value_address_user,
    inputPhone: state.value_phone_user,
    inputRole: state.value_role_user,
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

export default connect (mapStateToProps,mapDispatchToProps)(AddUserComponent);