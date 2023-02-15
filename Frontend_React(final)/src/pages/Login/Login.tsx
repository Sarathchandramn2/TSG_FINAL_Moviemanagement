import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginApi } from '../../redux/actions/authentication';
import { useAppThunkDispatch } from '../../redux/store';


import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBIcon, MDBRow, MDBCol, MDBCardImage } from 'mdb-react-ui-kit';

// Define a functional component for the Login page
const Login = () => {
    // State hook to store the username
    const [username, usernameupdate] = useState('');
    // State hook to store the password
    const [password, passwordupdate] = useState('');
    // Use the dispatch hook from the global store
    const dispatch = useAppThunkDispatch();
    const [error, setError] = useState<{ username?: string; password?: string }>({});

    const validate = () => {
        const newError: { username?: string; password?: string } = {};
        if (!username) {
            newError.username = 'Email is required';
        } else if (!username.match('^[a-zA-Z0-9_+&-]+(?:\\.[a-zA-Z0-9_+&-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{1,7}$')) {
            // eslint-disable-next-line max-len
            newError.username =
                // eslint-disable-next-line max-len
                'Email must contain a valid username followed by @ symbol, a domain name after @ symbol, .com, .net, .org, etc.';
        }
        if (!password) {
            newError.password = 'Password is required';
        } else if (!password.match('^(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,}$')) {
            // eslint-disable-next-line max-len
            newError.password =
                // eslint-disable-next-line max-len
                'Password must contain at least 5 characters and contain at least 1 Uppercase letter, 1 number, and 1 special character';
        }
        setError(newError);
        return Object.keys(newError).length === 0;
    };
    const isValidUsername = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(username);
    // eslint-disable-next-line max-len
    const isValidPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(password);



    const Handleclick = (e: any) => {
        e.preventDefault();
        if (validate()) {
            dispatch(
                loginApi({
                    username,
                    password,
                })
            );
        }
    };

    return (
        <div className="login">
            <MDBContainer className="my-5">
                <MDBCard>
                    <MDBRow className="g-0">
                        <MDBCol md="6">
                            <MDBCardImage
                                // eslint-disable-next-line max-len
                                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/31c910cb-8d57-470c-8b77-41dddf729e11/dekbb47-475e298f-e905-4eee-889c-b201780467ef.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzMxYzkxMGNiLThkNTctNDcwYy04Yjc3LTQxZGRkZjcyOWUxMVwvZGVrYmI0Ny00NzVlMjk4Zi1lOTA1LTRlZWUtODg5Yy1iMjAxNzgwNDY3ZWYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Cju_eQxBMuTGs6vTgPoDEV-EyT1c1TDBMMyZDIczrCw"
                                alt="login form"
                                className="rounded-start w-100"
                            />
                        </MDBCol>

                        <MDBCol md="6">
                            <MDBCardBody className="d-flex flex-column">
                                <div className="d-flex flex-row mt-2">
                                    <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                                    <span className="h1 fw-bold mb-0">Movie Management</span>
                                </div>

                                <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                                    Sign into your account
                                </h5>
                                {error.username && <span className="error">{error.username}</span>}
                                <MDBInput
                                    label="UserName"
                                    id="formControlLg"
                                    type="email"
                                    value={username}
                                    onChange={(e) => usernameupdate(e.target.value)}
                                    size="lg"
                                    className={`${error.username ? 'is-invalid' : isValidUsername ? 'is-valid' : ''}`}
                                    style={{ borderColor: error.username ? 'red' : isValidUsername ? 'green' : '' }}
                                />

                                {error.password && <span className="error">{error.password}</span>}
                                <MDBInput
                                    label="Password"
                                    id="formControlLg"
                                    type="password"
                                    value={password}
                                    onChange={(e) => passwordupdate(e.target.value)}
                                    size="lg"
                                    className={`${error.password ? 'is-invalid' : isValidPassword ? 'is-valid' : ''}`}
                                    style={{ borderColor: error.password ? 'red' : isValidPassword ? 'green' : '' }}
                                />

                                <button type="button" role ='login-button'
                                className="btn btn-outline-success" onClick={Handleclick}>
                                    Login
                                </button>
                                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                                    Dont have an account? <br></br>
                                    <Link to="/register" className="text fw-bold" text-color="green">
                                        Register
                                    </Link>
                                </p>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            </MDBContainer>
        </div>
    );
};
export default Login;
