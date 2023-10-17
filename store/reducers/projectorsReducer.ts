import { ProjectorsState } from "../types"
import { LOAD_PROJECTS_FAILURE, LOAD_PROJECTS_SUCCESS, ProjectorsActions } from "../actions/types"
import { createReducer } from "../../utils/createReducer"
const initialState = {
    projectors: [],
    message:'',
}
const projectorsReducer = {
    [LOAD_PROJECTS_SUCCESS]: (state: ProjectorsState[], { projectors }) =>
    ({
        ...state,
        projectors: [...projectors],
        message: ''
    }),
    [LOAD_PROJECTS_FAILURE]: (state: ProjectorsState[], { message }) =>
    ({
        ...state,
        projectors: [],
        message
    })
}
export default (state = initialState, action: ProjectorsActions) => createReducer(projectorsReducer, state, action);