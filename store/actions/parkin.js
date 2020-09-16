const SIGNUP = 'SIGNUP';
const SIGNIN = 'SIGNIN';
const AUTHENTICATE = 'AUTHENTICATE';
const FETCH_USERS = 'FETCH_USERS';
const FETCH_PARKS = 'FETCH_PARKS';
const FETCH_GEO = 'FETCH_GEO';



import { useAsyncStorage } from '@react-native-community/async-storage';
const { setItem, getItem } = useAsyncStorage('@userData')


export const signUp = (email, password, location) => {
    return async dispatch => {
        const signResponse = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDFn8x6ak_xrSVDtgW7V_nA2w4bq44iTEQ'
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                })
            }
        );
        if (!signResponse.ok) {
            const res = await signResponse.json()
            throw new Error(res.error.errors[0].message)
        }
        const signResData = await signResponse.json();


        const addToDbRes = await fetch('https://parkin-techathon.firebaseio.com/users.json'
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    location: location,
                    id: signResData.localId,
                    token: signResData.idToken,
                    tokenExpiry: signResData.expiresIn,
                })
            });
        if (!addToDbRes.ok) {
            const res = await addToDbRes.json()
            throw new Error(res.error.errors[0].message)
        }
        const addResData = await addToDbRes.json();

        const tokenExpiryDate = new Date(new Date().getTime() + parseInt(signResData.expiresIn) * 1000);

        const userData = {
            id: signResData.localId,
            token: signResData.idToken,
            tokenExpiry: tokenExpiryDate.toISOString(),
            location: location
        }

        dispatch({ type: SIGNUP, user: userData });
        setUserToDevice(userData)


    };
};

export const signIn = (email, password, location) => {
    return async dispatch => {

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDFn8x6ak_xrSVDtgW7V_nA2w4bq44iTEQ'
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                })
            }
        );
        if (!response.ok) {
            const res = await response.json()
            throw new Error(res.error.errors[0].message)
        }
        const resData = await response.json();
        const tokenExpiryDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);

        const userData = {
            id: resData.localId,
            token: resData.idToken,
            tokenExpiry: tokenExpiryDate.toISOString(),
            location: location
        }

        dispatch({ type: SIGNIN, user: userData });
        setUserToDevice(userData)
    };
};

const setUserToDevice = (userInfo) => {
    const userData = JSON.stringify({
        id: userInfo.id,
        token: userInfo.token,
        tokenExpiry: userInfo.tokenExpiry,
        location: userInfo.location
    })
    setItem(userData);
}

export const authenticate = (userData) => {
    return{ type: AUTHENTICATE, user: userData}
}

export const fetchUsers = () => {
    return async dispatch => {
        const getFromDbRes = await fetch('https://parkin-techathon.firebaseio.com/users.json');
        if (!getFromDbRes.ok) {
            const res = await getFromDbRes.json()
            throw new Error(res.error.errors[0].message)
        }
        const getResData = await getFromDbRes.json();
        dispatch({ type: FETCH_USERS, users: getResData })

    }
}

export const offerPark = (userData) => {
    return async dispatch => {
        const response = await fetch('https://parkin-techathon.firebaseio.com/parks.json'
        ,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                parkOwner: userData.id,
                location: userData.location,
            })
        })
        if(!response.ok){
            const res = await response.json()
            throw new Error(res.error.errors[0].message)
        }

        const parkData = await response.json();
    }
}


export const fetchParks = () => {
    return async dispatch => {
        const getFromDbRes = await fetch('https://parkin-techathon.firebaseio.com/parks.json');
        if (!getFromDbRes.ok) {
            const res = await getFromDbRes.json()
            throw new Error(res.error.errors[0].message)
        }
        const getResData = await getFromDbRes.json();
        dispatch({ type: FETCH_PARKS, parks: getResData })

    }
}

export const fetchGeo = () => {
    return async dispatch => {
        const getFromDbRes = await fetch('https://parkin-techathon.firebaseio.com/parks.json');
        if (!getFromDbRes.ok) {
            const res = await getFromDbRes.json()
            throw new Error(res.error.errors[0].message)
        }
        const getResData = await getFromDbRes.json();
        dispatch({ type: FETCH_GEO, searchGeo: getResData })

    }
}