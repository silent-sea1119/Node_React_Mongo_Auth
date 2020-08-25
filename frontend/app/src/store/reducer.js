


const initialState = {
    headers: {
        'Content-Type': 'application/json',
    },
    apiURL: {
        url: 'http://localhost:4000'
    },
    user: {
        email: ''
    },
    auth: {
        accessToken: '',
        refreshToken: ''
    }
}



const reducer = (state = initialState, action) => {
    if (action.type === 'LOGIN') {
        console.log(action.payload.accessToken)
        return {
            ...state,
            auth: {
                ...state.auth,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            }
        }
    }

    if (action.type === 'LOGOUT') {
        return {
            ...state,
            auth: {
                ...state.auth,
                accessToken: '',
                refreshToken: ''
            }
        }
    }
    return state
}


export default reducer;