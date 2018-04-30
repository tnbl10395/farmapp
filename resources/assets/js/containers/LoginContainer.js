import { connect } from 'react-redux';
import LoginComponent from '../components/LoginComponent';
import { login, checkValidateLogin } from '../actions/Action';
import { loginAPI } from '../api/api';

const mapStateToProps = (state) => ({
    token_expired: state.token_expired,
    message: state.message_login
});

const mapDispatchToProps = (dispatch) => ({
    login: (username, password) => {
        loginAPI(dispatch, login, checkValidateLogin ,username, password);
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(LoginComponent);