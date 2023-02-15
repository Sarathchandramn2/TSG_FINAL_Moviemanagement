import { AnyAction, Dispatch } from 'redux';
import { LOGIN } from './types';
import axios from '../../utils/interceptors';
import { toast } from 'react-toastify';

export const loginApi = (data:any) => async (dispatch: Dispatch<AnyAction>) => {

    try {
        const response = await axios.post('http://localhost:5000/login',{
            username: data.username,
            password: data.password
        });
    if (response.data.message === 'Login Successful') {
            sessionStorage.setItem('access_token',response.data.access_token);
            sessionStorage.setItem('username',data.username);
            sessionStorage.setItem('usertype',response.data.usertype);
            if(response.data.usertype === 2) {
                toast.success('Admin Logged in sucessfully!',
                {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                setTimeout(() => {
                    window.location.href ='http://localhost:3000/home';
                  }, 900);
            } else if(response.data.usertype === 3) {
                toast.success('User Logged in sucessfully!',
                {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                setTimeout(() => {
                    window.location.href ='http://localhost:3000/homes';
                  }, 900);

            }
        } else {
            toast.warn('Incorrect username or password!', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 1,
                theme: 'dark',
            });
        }
        dispatch({
            type: LOGIN,
            payload: response.data,
        });

        return response.data.data;
    } catch (err) {
        toast.warn('Incorrect username or password !!!', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 1,
            theme: 'dark',
        });
    }
    };
