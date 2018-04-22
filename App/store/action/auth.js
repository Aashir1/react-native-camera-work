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
                    navigate('Tabes');
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
                            navigate('Tabes');
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

    static loadImages(currentUser){

        return (dispatch) =>{
            dispatch({type: actionType.LOAD_IAMGE_AGAIN});
            firebase.database().ref(`/cameraWork/${currentUser.uid}`).once('value', datasnapshot=>{
                let obj = datasnapshot._value;
                Object.keys(obj).map(data=> dispatch(AuthActions.loadImage(obj[data]) ));
            })
        }
    }

    static signOut(navigate){
        console.log('navigate chala: ' ,navigate)
        firebase.auth().signOut()
        .then(user=>{
            navigate('Login');
        })
    }


    static loadImage(image){
        return{
            type: actionType.LOAD_IMAGES,
            image
        }
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
