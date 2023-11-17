import { Professor, ProfessorInfo, Projector } from "../types";
export const LOAD_PROJECTORS_REQUEST = "PROJECTORS/LOAD_PROJECTORS_REQUEST"
export const LOAD_PROJECTORS_SUCCESS = "PROJECTORS/LOAD_PROJECTORS_SUCCESS";
export const LOAD_PROJECTORS_FAILURE = "PROJECTORS/LOAD_PROJECTORS_FAILURE"
export const AUTHENTICATE_PROFESSOR_REQUEST = "PROFESSORS/AUTHENTICATE_PROFESSOR_REQUEST"
export const AUTHENTICATE_PROFESSOR_SUCCESS = "PROFESSORS/AUTHENTICATE_PROFESSOR_SUCCESS";
export const AUTHENTICATE_PROFESSOR_FAILURE = "PROFESSORS/AUTHENTICATE_PROFESSOR_FAILURE";
export const LOG_OUT_PROFESSOR = "PROFESSORS/LOG_OUT_PROFESSOR"
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
export type ProjectorsActions =
    LoadProjectorsSuccess
    | LoadProjectorsFailure
    | LoadProjectorsRequest;
export type ProfessorsActions =
    AuthenticateProfessorRequest
    | AuthenticateProfessorSuccess
    | AuthenticateProfessorFailure
    | LogOutProfessor
