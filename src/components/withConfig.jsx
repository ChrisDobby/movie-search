import React from 'react';
import Loading from './loading';

const configStorageKey = 'config';

const WithConfig = (ComponentForConfig, actions, storage) => {
    class ConfigComponent extends React.PureComponent {
        constructor(props) {
            super(props);

            this.state = {
                loading: true,
                error: false,
                config: null,
            };
        }

        componentWillMount() {
            const storedConfig = storage.getItem(configStorageKey);
            if (storedConfig) {
                this.setState({
                    loading: false,
                    error: false,
                    config: JSON.parse(storedConfig),
                });
            }
        }

        componentDidMount() {
            if (this.state.config) { return; }

            actions.getConfig()
                .then((config) => {
                    this.setState({
                        loading: false,
                        error: false,
                        config,
                    });

                    storage.setItem(configStorageKey, JSON.stringify(config));
                })
                .catch(() => this.setState({
                    loading: false,
                    error: true,
                    config: null,
                }));
        }

        render() {
            if (this.state.loading) {
                return <Loading />;
            }

            return (
                <div>
                    {this.state.loading && <Loading />}
                    {this.state.error &&
                        <div className="alert alert-danger" role="alert">
                            There was an error loading the movie db configuration.  Refresh to try again.
                        </div>
                    }

                    {!this.state.loading && this.state.config &&
                        <ComponentForConfig {...this.props} config={this.state.config} />}

                </div>);
        }
    }

    return ConfigComponent;
};

export default WithConfig;
