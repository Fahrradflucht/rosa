import { push } from 'react-router-redux';
import * as Cookies from 'js-cookie';
import { httpGet, httpPost } from '../lib/fetchHelpers';

const { protocol, host } = window.location;
const baseUrl = `${protocol}//${host}`;
const sessionUrl = `${baseUrl}/api/admin/v1/session`;

export const login = (email, password, rememberMe = false) => {
    return dispatch => {
        dispatch(requestSession());
        return httpPost(sessionUrl, {
            session: {
                email,
                password
            }
        })
        .then(data => {
            if(rememberMe) {
                // Don't just change this to more then 3 days. This should be
                // the same time the issued JWT is valid. (See config.exs)
                Cookies.set('RosaJWT', data.jwt, { expires: 3 });
            } else {
                Cookies.set('RosaJWT', data.jwt);
            }
            dispatch(setUser(data.user));
            dispatch(push('/admin'));
        })
        .catch(error => {
            error.response.json()
            .then(data => {
                dispatch(setError(data.error))
            })
        });
    };
}

export const rehydrateSession = () => {
    return dispatch => {
        dispatch(requestSession());
        return httpGet(sessionUrl)
        .then(data => {
            dispatch(setUser(data.user));
        })
        .catch(error => {
            error.response.json()
            .then(data => {
                dispatch(setError(data.error))
                dispatch(push('/admin/login'))
            })
        })
    };
};

export const logout = () => {
    return dispatch => {
        dispatch(deleteSession());
        Cookies.remove('RosaJWT');
        dispatch(push('/admin/login'));
    }
}


const requestSession = () => {
    return {
        type: 'REQUEST_SESSION'
    }
}

const setUser = (user) => {
    return {
        type: 'SET_SESSION_USER',
        user
    }
}

const setError = (error) => {
    return {
        type: 'SET_SESSION_ERROR',
        error
    }
}

const deleteSession = () => {
    return {
        type: 'DELETE_SESSION'
    }
}