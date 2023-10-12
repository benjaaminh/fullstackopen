import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'
const initialState = null
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser(state,action){
            return action.payload
        },
        logoutUser(state,action){
            state=null
            return state
        },//cant logout
        setLogin(state,action){
            return action.payload
        }
    }
})

export const {setUser, logoutUser, setLogin} = userSlice.actions

export const initializeUser = () =>{
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON);
          dispatch(setUser(user))
          blogService.setToken(user.token);
        }
    }
}

export const login = (username,password) =>{
    return async dispatch => {
    try {
        const user = await loginService.login({
          username,
          password,
        });
        blogService.setToken(user.token);
        window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
        dispatch(setLogin(user)); //remember to dispatch actions
      } catch (exception) {
        console.log(exception);
        dispatch(setNotification(("failed: wrong username or password"),5))
      }
    }
}

export const logout = () => {
    return async dispatch => {
    window.localStorage.clear();
    dispatch(logoutUser())
    }
}

export default userSlice.reducer