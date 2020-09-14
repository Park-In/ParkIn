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
        case 'AUTHENTICATE':
            return ({
                ...state,
                currentUser: {
                    id: action.user.id,
                    token: action.user.token,
                    tokenExpiry: action.user.tokenExpiry,
                    location: action.user.location
                }
            })
        case 'FETCH_USERS':
            // console.log('action users', action.users);
            let usersArr = [];
            for (const user in action.users) {
                usersArr.push({
                    id: action.users[user].id,
                    email: action.users[user].email,
                    password: action.users[user].password,
                    token: action.users[user].token,
                    tokenExpiry: action.users[user].tokenExpiry,
                    location: action.users[user].location
                })
            }
            return ({
                ...state,
                users: usersArr
            })
        default:
            return state;
    }
}