import React, { useContext } from 'react';
import { Context } from '../store/appContext';
//import { useHistory } from 'react-router-dom';

const Login = props => {
    const { store, actions } = useContext(Context);
    //const { history } = useHistory();
    const {history} = props;
    return (
        <>
            <h1>Login</h1>
            {
                !!store.error && (
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Holy guacamole!</strong> {store.error}.
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )
            }

            <form className="container" onSubmit={e => actions.handleLogin(e, history)}>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Ingrese Email"
                        defaultValue={store.email}
                        onChange={actions.handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        placeholder="Ingrese password"
                        defaultValue={store.password}
                        onChange={actions.handleChange}
                        required
                    />
                </div>

                <button className="btn btn-primary btn-block">Login</button>

            </form>
        </>
    )
}

export default Login;