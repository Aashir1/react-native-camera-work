import actionType from '../constants/constant';
import firebase from 'react-native-firebase';

export default class AuthActions {
    static login(email, password, navigate) {
        return (dispatch) => {
            dispatch(AuthActions.loginRequest());
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user => {
                    console.log(user._user);
                    console.log(navigate);
                    dispatch(AuthActions.loginSucceed(user._user));
                    navigate('Camera');
                })
                .catch((error) => {
                    // dispatch(AuthActions.isError());
                    alert(error.message);
                })
        }
    }
    static signup(name, email, password, navigate) {
        return (dispatch) => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => {
                    dispatch(AuthActions.signupRequest());
                    user.updateProfile({
                        displayName: name
                    })
                        .then(() => {
                            // dispatch(AuthActions.signupSucceed());
                            dispatch(AuthActions.loginSucceed(user._user));
                            console.log(user);
                            console.log(navigate);
                            navigate('Camera');
                        })
                        // .catch(error => {
                        //     dispatch(AuthActions.signupSucceed());
                        //     alert(error.message);
                        // })
                })
                .catch(error => {
                    alert(error.message);
                })
        }
    }

    static signOut(navigate){
        firebase.auth().signOut()
        .then(user=>{
            navigate('Login');
        })
    }

    static loginRequest() {
        return {
            type: actionType.LOGIN_REQUEST
        }
    }
    static loginSucceed(data) {
        return {
            type: actionType.LOGIN_SUCCEED,
            data
        }
    }
    static isError() {
        return {
            type: action.IS_ERROR
        }
    }
    static signupRequest() {
        return {
            type: actionType.SIGNUP_REQUEST
        }
    }
    static signupSucceed() {
        return {
            type: actionType.SIGNUP_SUCCEED
        }
    }
}
