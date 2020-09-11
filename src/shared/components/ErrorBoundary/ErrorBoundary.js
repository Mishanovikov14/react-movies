import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PT from 'prop-types';

class ErrorBoundary extends Component {
    state = {
        error: null
    }

    static getDerivedStateFromError(error) {
        return { error };
    }

    render() {
        const { error } = this.state;
        const { children } = this.props;

        if (error) return <Redirect to="/error" />;

        return children;
    }
}

ErrorBoundary.propTypes = {
    children: PT.node.isRequired
};

export default ErrorBoundary;
