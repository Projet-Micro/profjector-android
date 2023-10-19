import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Action,AnyAction } from 'redux'
import * as actionsTypes from './types';
import axios from 'axios'
import { Professor, Projector } from '../types'
import AsyncStorage from '@react-native-community/async-storage';
import { Credentials } from '../../shared/models';
export function loadProjectorsSuccess(projectors : Projector[]) {
    return {
        type: actionsTypes.LOAD_PROJECTORS_SUCCESS,
        projectors, 
   } 
}
export function loadProjectorsFailure(message: string) {
    return {
        type: actionsTypes.LOAD_PROJECTORS_FAILURE,
        message,
    }
}
export function loadProjectorsRequest() {
    return {
        type: actionsTypes.LOAD_PROJECTORS_REQUEST
    }
}

export function authenticateProfessorSuccess(professor: Professor) {
    return {
        type: actionsTypes.AUTHENTICATE_PROFESSOR_SUCCESS,
        professor,
    }
}
export function authenticateProfessorFailure(message: string) {
    return {
        type: actionsTypes.AUTHENTICATE_PROFESSOR_FAILURE,
        message
    }
}
export function authenticateProfessorRequest() {
    return {
        type: actionsTypes.AUTHENTICATE_PROFESSOR_REQUEST
    }
}
export function authenticateProfessor(credentials: Credentials): any{
    return async function (dispatch : ThunkDispatch<{},{},AnyAction>) {
        dispatch(authenticateProfessorRequest());
        axios.post('https://profjector-back.onrender.com/api/users/login', credentials)
            .then(async professor => {
                console.log(professor.data);
                dispatch(authenticateProfessorSuccess(professor.data))
                await AsyncStorage.setItem("token", JSON.stringify(professor.data.accessToken))
            })
            .catch(error => {
                console.log(error)
                dispatch(authenticateProfessorFailure(error.response.data.message))
            })   
    }
}
export function loadProfessor(): any {
    return async function (dispatch: ThunkDispatch<{}, {}, AnyAction>) {
        const stringProfessor = await AsyncStorage.getItem("token");
        if (stringProfessor) {
            console.log("INTO LOAD",stringProfessor)
            dispatch(authenticateProfessorRequest());
            let professor = JSON.parse(stringProfessor)
            dispatch(authenticateProfessorSuccess(professor))           
        }
    }
}
// STILL NOT USABLE
export function loadProjectors(): any{
    return async function (dispatch : ThunkDispatch<{},{},AnyAction>) {
        dispatch(loadProjectorsRequest());
        // PROJECTORS API STILL NOT DONE IN THE BACK-END
        axios.get("")
            .then(projectors => {
                dispatch(loadProjectorsSuccess(projectors.data))
            })
            .catch(error => {
                dispatch(loadProjectorsFailure(error.message));
            })
    }
}