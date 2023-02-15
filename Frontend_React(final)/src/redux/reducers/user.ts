import { AnyAction } from 'redux';
import { LOGIN } from '../actions/types';
import { AppState } from '../store';

export interface IUserReducer {
    username:string,
    password:string,
    token:string
}

export const userReducerInit: IUserReducer = {
    username:'',
    password:'',
    token:''
};


const userReducer = (state = userReducerInit, action: AnyAction): AppState => {
    switch (action.type) {
        case LOGIN:
            return action.payload;
            // return{
            //     // username:action.payload.username,
            //     // password:action.payload.username,
            //     // token:action.payload.token
            // };


}
return state;
};

export default userReducer;
