import React from 'react';

const WithAuthentication = () => (Component) => {
    class ComponentWithAuthentication extends React.PureComponent {
        render() {
            return <Component {...this.props} />;
        }
    }

    return ComponentWithAuthentication;
};

export default WithAuthentication;
