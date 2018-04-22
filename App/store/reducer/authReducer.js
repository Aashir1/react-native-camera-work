import actionType from '../constants/constant';
let initialState = {
    progressBar: false,
    currentUser: {},
    images: [],
}

function authReducer(state = initialState, action) {
    switch (action.type) {
        case actionType.LOGIN_REQUEST:
            console.log('login request');
            return Object.assign({}, state, { progressBar: true });

        case actionType.LOGIN_SUCCEED:
            return Object.assign({}, state, { progressBar: false, currentUser: action.data });

        case actionType.SIGNUP_REQUEST:
            return Object.assign({}, state, { progressBar: true });

        case actionType.SIGNUP_SUCCEED:
            return Object.assign({}, state, { progressBar: false });

        case actionType.LOAD_IMAGES:
            return Object.assign({}, state, {images: [...state.images, action.image]});

        case actionType.LOAD_IAMGE_AGAIN:
            return Object.assign({}, state, {image:[]});

        default:
            return state;
    }
}

export default authReducer;