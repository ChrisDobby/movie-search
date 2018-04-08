import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../loading';

const Section = (DisplayComponent) => {
    class MovieSection extends React.PureComponent {
        constructor(componentProps) {
            super(componentProps);

            this.state = {
                loading: true,
                error: false,
                data: null,
            };
        }

        componentDidMount() {
            this.props.action()
                .then(data => this.setState({
                    loading: false,
                    error: false,
                    data,
                }))
                .catch(() => this.setState({
                    loading: false,
                    error: true,
                    data: null,
                }));
        }

        render() {
            return (
                <div>
                    {this.state.loading && <Loading />}
                    {this.state.error &&
                        <div className="alert alert-danger" role="alert">
                            There was an error loading the data.  Please try again.
                        </div>
                    }
                    {!this.state.loading && this.state.data &&
                        <DisplayComponent data={this.state.data} />}
                </div>
            );
        }
    }

    MovieSection.propTypes = {
        action: PropTypes.func.isRequired,
    };

    return MovieSection;
};

export default Section;
