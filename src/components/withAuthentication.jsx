import React from 'react';

const approvedQueryStringKey = 'approved';
const tokenQueryStringKey = 'request_token';

const WithAuthentication = (authentication, getQueryString) => (Component) => {
    class ComponentWithAuthentication extends React.PureComponent {
        constructor(props) {
            super(props);

            this.state = {
                isAuthenticated: false,
                isAuthenticating: false,
                authenticationError: false,
            };

            this.authenticate = this.authenticate.bind(this);
        }

        componentWillMount() {
            const isAuthenticated = authentication.isAuthenticated();

            if (isAuthenticated) {
                this.setState({ isAuthenticated });
                return;
            }

            const params = getQueryString();
            if (!params.has(approvedQueryStringKey) || !params.has(tokenQueryStringKey)) {
                return;
            }

            const approved = params.get(approvedQueryStringKey);
            if (approved.toLowerCase() !== 'true') { return; }

            const requestToken = params.get(tokenQueryStringKey);
            authentication.createSession(requestToken)
                .then((authenticationResult) => {
                    this.updateFromAuthenticationResult(authenticationResult);
                });
        }

        authenticate() {
            this.setState({ isAuthenticating: true });

            authentication.authenticate(window.location.href)
                .then((authenticationResult) => {
                    this.updateFromAuthenticationResult(authenticationResult);
                });
        }

        updateFromAuthenticationResult(authenticationResult) {
            this.setState({
                isAuthenticated: authenticationResult.authenticated,
                isAuthenticating: authenticationResult.redirecting,
                authenticationError: (authenticationResult.tokenError || authenticationResult.sessionError),
            });
        }

        render() {
            return (<Component
                {...this.props}
                isAuthenticated={this.state.isAuthenticated}
                isAuthenticating={this.state.isAuthenticating}
                authenticate={this.authenticate}
                authenticationError={this.state.authenticationError}
            />);
        }
    }

    return ComponentWithAuthentication;
};

export default WithAuthentication;
