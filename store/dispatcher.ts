import store from ".";
import * as actions from './actions/index';
import { Credentials } from "../shared/models";
export function authenticateProfessor(credentials : Credentials) {
    store.dispatch(actions.authenticateProfessor(credentials))
}
export function loadProjectors() {
    store.dispatch(actions.loadProjectors());
}