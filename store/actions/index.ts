import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import * as actionsTypes from './types';
import axios from 'axios'
import { Professor, Projector } from '../types'
import AsyncStorage from '@react-native-community/async-storage';
import { Credentials } from '../../shared/models';
import { ToastAndroid } from 'react-native'
import api from '../../utils/api'
import { Device } from 'react-native-ble-plx';
import store from '..';

export function loadProjectorsSuccess(projectors : Projector[]) : actionsTypes.ProjectorsActions {
    return {
        type: actionsTypes.LOAD_PROJECTORS_SUCCESS,
        projectors, 
   } 
}
export function loadProjectorsFailure(message: string) : actionsTypes.ProjectorsActions {
    return {
        type: actionsTypes.LOAD_PROJECTORS_FAILURE,
        message,
    }
}
export function loadProjectorsRequest() : actionsTypes.ProjectorsActions {
    return {
        type: actionsTypes.LOAD_PROJECTORS_REQUEST
    }
}

export function authenticateProfessorSuccess(professor: Professor) : actionsTypes.AuthenticateProfessorSuccess{
    return {
        type: actionsTypes.AUTHENTICATE_PROFESSOR_SUCCESS,
        professor,
    }
}
export function authenticateProfessorFailure(message: string) : actionsTypes.AuthenticateProfessorFailure{
    return {
        type: actionsTypes.AUTHENTICATE_PROFESSOR_FAILURE,
        message
    }
}
export function authenticateProfessorRequest() : actionsTypes.AuthenticateProfessorRequest {
    return {
        type: actionsTypes.AUTHENTICATE_PROFESSOR_REQUEST
    }
}
export function authenticateProfessor(credentials: Credentials): any{
    return async function (dispatch : ThunkDispatch<{},{},AnyAction>) {
        dispatch(authenticateProfessorRequest());
        axios.post(`${process.env.EXPO_PUBLIC_API_URL}/users/login`, credentials)
            .then(async professor => {
                console.log(professor.data);
                dispatch(authenticateProfessorSuccess(professor.data))
                await AsyncStorage.setItem("token", JSON.stringify(professor.data))
            })
            .catch(error => {
                ToastAndroid.showWithGravity(error.response.data.message, 2000, ToastAndroid.BOTTOM);
                dispatch(authenticateProfessorFailure(error.response.data.message));
            })   
    }
}
export function loadProfessor(): any {
    return async function (dispatch: ThunkDispatch<{}, {}, AnyAction>) {
        const stringProfessor = await AsyncStorage.getItem("token");
        if (stringProfessor) {
            dispatch(authenticateProfessorRequest());
            let professor = JSON.parse(stringProfessor)
            dispatch(authenticateProfessorSuccess(professor))           
        }
    }
}
export function loadProjectors(): any{
    return async function (dispatch: ThunkDispatch<{}, {}, AnyAction>) {
        const professor = store.getState().professors.professor.professorInfo
        dispatch(loadProjectorsRequest());
        (await api(professor.accessToken)).get(`/projectors/all/${professor.id}`)
            .then(projectors => {
                console.log("WORKS")
                dispatch(loadProjectorsSuccess(projectors.data))
            })
            .catch(error => {
                dispatch(loadProjectorsFailure(error.message))
                console.log(error);
            })
    }
}
export function logOutProfessor() : actionsTypes.LogOutProfessor{
    return {
        type: actionsTypes.LOG_OUT_PROFESSOR,
        professor:
        {
            professorInfo: null,
            loading: false,
            message: '',
        }
    }
}
export function registerDevice(device : Device): actionsTypes.RegisterDevice{
    return {
        type: actionsTypes.REGISTER_DEVICE,
        device
    }   
}
export function unregisterDevice(device: Device): actionsTypes.UnregisterDevice{
    return {
        type: actionsTypes.UNREGISTER_DEVICE,
        device
    }
}
export function connectDevice(device: Device): actionsTypes.ConnectDevice{
    return {
        type: actionsTypes.CONNECT_DEVICE,
        device
    }
}