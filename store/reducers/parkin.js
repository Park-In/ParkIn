const initialState = {
    users: [{
        id: 'u1',
        location: {}
    }],
    currentUser: { name: 'hi' }
};

export default (state = initialState, action) => {
    switch (action.type) {
  
        case 'SIGNUP':
            return ({
                ...state,
                currentUser: {
                    id: action.user.id,
                    token: action.user.token,
                    tokenExpiry: action.user.tokenExpiry,
                    location: action.user.location
                }
            })
        case 'SIGNIN':
            return ({
                ...state,
                currentUser: {
                    id: action.user.id,
                    token: action.user.token,
                    tokenExpiry: action.user.tokenExpiry,
                    location: action.user.location
                }
            })
        default:
            return state;
    }
}