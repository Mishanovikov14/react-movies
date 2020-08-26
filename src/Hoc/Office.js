import { Component } from 'react';
import PT from 'prop-types';

class Office extends Component {
    state = {
        data:null
    }

    handleDataChange = nexData => {
        this.setState({ data: nexData });
    }

    render() {
        const { data } = this.state;
        const { children } = this.props;

        return children({
            data,
            onClick: this.handleDataChange
        });
    }
}

Office.propTypes = {
    children: PT.func.isRequired  
};

export default Office;
