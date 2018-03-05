import { connect } from 'react-redux';
import Content from '../components/Content';
import { loadContent } from '../actions/Action';

const mapStateToProps = (state) => ({

});
const mapDispatchToProps = (dispatch) => ({
    loadContent: (option) => {
        dispatch(loadContent(option));
    }
});

export default connect (mapStateToProps,mapDispatchToProps)(Content);