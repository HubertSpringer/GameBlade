import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from './../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		constructor(props) {
			super(props);

			this.reqInterceptior = axios.interceptors.request.use(req => {
				this.setState({error: null});
				return req;
			}); 

			this.resInterceptior = axios.interceptors.response.use(res => res, error => {
				this.setState({error: error});
			});
		}

		state = {
			error: null
		}

		errorConfirmedHandler = () => {
			this.setState({error: null})
		}

		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptior);
			axios.interceptors.response.eject(this.resInterceptior);
		}

		render(){
			return (
				<Auxiliary>
					<Modal
						show={this.state.error}
						modalClosed={this.errorConfirmedHandler}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Auxiliary>
			);
		};
	}
}

export default withErrorHandler;