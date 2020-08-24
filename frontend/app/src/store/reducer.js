


const initialState = {
    user: {
        email: ''
    },
    auth: {
        accessToken: '',
        refreshToken: ''
    }
}



const reducer = (state = initialState, action, payload) => {
    if (action.type === 'LOGIN') {
        return {
            ...state,
            auth: {
                ...state.auth,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            }
        }
    }
    return state
}


export default reducer;