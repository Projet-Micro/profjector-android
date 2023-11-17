// MAJOR REDUX DISPATCHER FUNCTIONS SIGNATURES
// FLOW : ActionTypes -> Actions -> Dispatcher -> Reducers -> Store ===> RERENDER
import { Credentials } from "./shared/models";
export function authenticateProfessor(credentials: Credentials) : void;
export function loadProjectors(): void;
export function loadProfessor(): void;
export function logOutProfessor(): void;