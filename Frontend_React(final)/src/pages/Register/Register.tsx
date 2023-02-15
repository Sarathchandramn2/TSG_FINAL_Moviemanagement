import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import registerUser from './RegisterService';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBIcon, MDBRow, MDBCol, MDBCardImage } from 'mdb-react-ui-kit';

const Register = () => {
    const [fullname, setfullname] = useState('');
    const [usernameReg, setusernameReg] = useState('');
    const [passwordReg, setpasswordReg] = useState('');
    const [error, setError] = useState<{
        fullname?: string;
        usernameReg?: string;
        passwordReg?: string;
        confpasswordReg?: string;
    }>({});

    // Validation for the Registration fields
    const validate = () => {
        const newError: { fullname?: string; lastname?: string; usernameReg?: string; passwordReg?: string } = {};
        if (!fullname) {
            newError.fullname = 'Fullname is required';
        }
        if (!usernameReg) {
            newError.usernameReg = 'Username is required';
        } else if (
            !usernameReg.match('^[a-zA-Z0-9_+&-]+(?:\\.[a-zA-Z0-9_+&-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{1,7}$')
        ) {
            // eslint-disable-next-line max-len
            newError.usernameReg =
                // eslint-disable-next-line max-len
                'Email must contain a valid username followed by @ symbol, a domain name after @ .com, .net, .org, etc.';
        }

        if (!passwordReg) {
            newError.passwordReg = 'Password is required';
        } else if (!passwordReg.match('^(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,}$')) {
            // eslint-disable-next-line max-len
            newError.passwordReg =
                // eslint-disable-next-line max-len
                'Password must contain at least 5 characters and contain at least 1 uppercase letter, 1 number, and 1 special character';
        }

        setError(newError);
        return Object.keys(newError).length === 0;
    };

    // Recalling function for Register
    const Handleclick = (e: any) => {
        e.preventDefault();
        if (validate()) {
            registerUser(fullname, usernameReg, passwordReg);
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
                                src="https://t4.ftcdn.net/jpg/02/81/77/17/360_F_281771704_pPFkanzB6YuKGbHIpXhHgcAwrJ0ZT4W9.jpg"
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
                                    Register your Account
                                </h5>
                                {error.fullname && <span className="error">{error.fullname}</span>}
                                <MDBInput
                                    wrapperClass="mb-4"
                                    label="FullName"
                                    id="formControlLg"
                                    type="text"
                                    value={fullname}
                                    onChange={(e) => setfullname(e.target.value)}
                                    size="lg"
                                />
                                {error.usernameReg && <span className="error">{error.usernameReg}</span>}

                                <MDBInput
                                    wrapperClass="mb-4"
                                    label="Username"
                                    id="formControlLg"
                                    type="email"
                                    value={usernameReg}
                                    onChange={(e) => setusernameReg(e.target.value)}
                                    size="lg"
                                />
                                {error.passwordReg && <span className="error">{error.passwordReg}</span>}
                                <MDBInput
                                    wrapperClass="mb-4"
                                    label="Password"
                                    id="formControlLg"
                                    type="password"
                                    value={passwordReg}
                                    onChange={(e) => setpasswordReg(e.target.value)}
                                    size="lg"
                                />
                                <button type="button" className="btn btn-outline-success" onClick={Handleclick}>
                                    Register
                                </button>
                                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                                    Already have an account ? <br></br>
                                    <Link to="/" className="text fw-bold" text-color="green">
                                        Login
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
export default Register;
