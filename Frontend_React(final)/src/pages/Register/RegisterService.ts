import axios from 'axios';
import { toast } from 'react-toastify';
import './Register.css';

const registerUser = async (fullname: string, username: string, password: string) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/register', {
            fullname,
            username,
            password,
        });
        // eslint-disable-next-line no-console
        console.log(response.data);
        toast.success(' Registration Completed', {
            position: 'top-left',
            autoClose: 5001,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 1,
            theme: 'dark',
        });
        setTimeout(() => {
            window.location.href = 'http://localhost:3000/';
        }, 5000);
    } catch (error) {
        toast.error('Registration Failed!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    }
};

export default registerUser;
