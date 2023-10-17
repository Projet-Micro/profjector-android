import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Action,AnyAction } from 'redux'
import * as actionsTypes from './types';
import axios from 'axios'
import { ProfessorState, ProjectorsState } from '../types'
import { Credentials } from '../../shared/models';
export function loadProjectorsSuccess(projectors : ProjectorsState[]) {
    return {
        type: actionsTypes.LOAD_PROJECTS_SUCCESS,
        projectors, 
   } 
}
export function loadProjectorsFailure(message: string) {
    return {
        type: actionsTypes.LOAD_PROJECTS_FAILURE,
        message,
    }
}
export function loadProjectorsRequest() {
    return {
        type: actionsTypes.LOAD_PROJECTORS
    }
}

export function authenticateProfessorSuccess(professor: ProfessorState) {
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
        type: actionsTypes.AUTHENTICATE_PROFESSOR
    }
}
export function authenticateProfessor(credentials : Credentials):
    ThunkAction<void,ProfessorState,null,Action<string>>{
    return async function (dispatch:any) {
        dispatch(authenticateProfessorRequest());
        axios.post('https://profjector-back.onrender.com/api/users/login', credentials)
            .then(professor => {
                dispatch(authenticateProfessorSuccess(professor.data))
            })
            .catch(error => {
                dispatch(authenticateProfessorFailure(error.message))
            })   
    }
}
// STILL NOT USABLE
export function loadProjectors():
    ThunkAction<void, ProjectorsState, null, Action<string>>{
    return async function (dispatch : any) {
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