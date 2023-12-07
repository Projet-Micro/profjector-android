import { Device } from "react-native-ble-plx";
import { Message, Professor, ProfessorInfo, Projector } from "../types";
export const LOAD_PROJECTORS_REQUEST = "PROJECTORS/LOAD_PROJECTORS_REQUEST"
export const LOAD_PROJECTORS_SUCCESS = "PROJECTORS/LOAD_PROJECTORS_SUCCESS";
export const LOAD_PROJECTORS_FAILURE = "PROJECTORS/LOAD_PROJECTORS_FAILURE"
export const AUTHENTICATE_PROFESSOR_REQUEST = "PROFESSORS/AUTHENTICATE_PROFESSOR_REQUEST"
export const AUTHENTICATE_PROFESSOR_SUCCESS = "PROFESSORS/AUTHENTICATE_PROFESSOR_SUCCESS";
export const AUTHENTICATE_PROFESSOR_FAILURE = "PROFESSORS/AUTHENTICATE_PROFESSOR_FAILURE";
export const LOG_OUT_PROFESSOR = "PROFESSORS/LOG_OUT_PROFESSOR";
export const REGISTER_DEVICE = "DEVICE/REGISTER_DEVICE";
export const UNREGISTER_DEVICE = "DEVICE/UNREGISTER_DEVICE";
export const CONNECT_DEVICE = "DEVICE/CONNECT_DEVICE";
export const TOGGLE_BLUETOOTH = "DEVICE/TOGGLE_BLUETOOTH";
export const ADD_MESSAGE = "MESSAGES/ADD_MESSAGE";
export const DELETE_MESSAGE = "MESSAGES/DELETE_MESSAGE";
export interface LoadProjectorsRequest{
    type : typeof LOAD_PROJECTORS_REQUEST
}
export interface LoadProjectorsSuccess{
    type: typeof LOAD_PROJECTORS_SUCCESS,
    projectors: Projector[]
}
export interface LoadProjectorsFailure{
    type: typeof LOAD_PROJECTORS_FAILURE,
    message: string
}
export interface AuthenticateProfessorRequest{
    type: typeof AUTHENTICATE_PROFESSOR_REQUEST,
}
export interface AuthenticateProfessorSuccess{
    type: typeof AUTHENTICATE_PROFESSOR_SUCCESS,
    professor: Professor
}
export interface AuthenticateProfessorFailure{
    type: typeof AUTHENTICATE_PROFESSOR_FAILURE,
    message: string
}
export interface LogOutProfessor{
    type: typeof LOG_OUT_PROFESSOR,
    professor: ProfessorInfo
}
export interface RegisterDevice{
    type: typeof REGISTER_DEVICE,
    device : Device    
}
export interface UnregisterDevice{
    type: typeof UNREGISTER_DEVICE,
    device: Device,
}
export interface ConnectDevice{
    type: typeof CONNECT_DEVICE,
    device: Device
}
export interface ToggleBluetooth{
    type: typeof TOGGLE_BLUETOOTH,
    isBluetoothActivated: boolean
}
export interface AddMessage{
    type: typeof ADD_MESSAGE,
    message: Message
}
export interface DeleteMessage{
    type: typeof DELETE_MESSAGE,
    id: number
}
export type ProjectorsActions =
    LoadProjectorsSuccess
    | LoadProjectorsFailure
    | LoadProjectorsRequest;
export type ProfessorsActions =
    AuthenticateProfessorRequest
    | AuthenticateProfessorSuccess
    | AuthenticateProfessorFailure
    | LogOutProfessor
export type DeviceActions = 
    RegisterDevice
    | UnregisterDevice
    | ConnectDevice
    | ToggleBluetooth
export type MessageActions = 
    AddMessage
    | DeleteMessage