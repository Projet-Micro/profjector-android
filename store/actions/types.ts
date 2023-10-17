import { ProfessorState, ProjectorsState } from "../types";

export const LOAD_PROJECTORS = "PROJECTORS/LOAD_PROJECTORS";
export const LOAD_PROJECTS_SUCCESS = "PROJECTORS/LOAD_PROJECTS_SUCCESS";
export const LOAD_PROJECTS_FAILURE = "PROJECTORS/LOAD_PROJECTS_FAILURE"
export const AUTHENTICATE_PROFESSOR = "PROFESSORS/LOAD_PROFESSOR";
export const AUTHENTICATE_PROFESSOR_SUCCESS = "PROFESSORS/AUTHENTICATE_PROFESSOR_SUCCESS";
export const AUTHENTICATE_PROFESSOR_FAILURE = "PROFESSORS/AUTHENTICATE_PROFESSOR_FAILURE";
export interface LoadProjectors{
    type: typeof LOAD_PROJECTORS;
}
export interface LoadProjectsSuccess{
    type: typeof LOAD_PROJECTS_SUCCESS,
    projectors: ProjectorsState[]
}
export interface LoadProjectorsFailure{
    type: typeof LOAD_PROJECTS_FAILURE,
    message: string
}
export interface AuthenticateProfessor{
    type: typeof AUTHENTICATE_PROFESSOR,
    credentials: {
        email: string;
        password: string;
    }
}
export interface AuthenticateProfessorSuccess{
    type: typeof AUTHENTICATE_PROFESSOR_SUCCESS,
    professor: ProfessorState
}
export interface AuthenticateProfessorFailure{
    type: typeof AUTHENTICATE_PROFESSOR_FAILURE,
    message: string
}
export type ProjectorsActions =
    LoadProjectors
    | LoadProjectsSuccess;
export type ProfessorsActions =
    AuthenticateProfessor
    | AuthenticateProfessorSuccess
    | AuthenticateProfessorFailure
