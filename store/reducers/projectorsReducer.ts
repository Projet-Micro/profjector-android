import { ProjectorsState } from "../types"
import { LOAD_PROJECTORS_FAILURE, LOAD_PROJECTORS_SUCCESS, LOAD_PROJECTORS_REQUEST, ProjectorsActions } from "../actions/types"
import { createReducer } from "../../utils/createReducer"
const initialState : ProjectorsState = {
    projectors: [],
    message: '',
    loading : false,
} 
const projectorsReducer = {
    [LOAD_PROJECTORS_REQUEST]: (state: ProjectorsState[]) =>
    ({
        ...state,
        projectors: [],
        loading: true,
        message: '',
    }),
    [LOAD_PROJECTORS_SUCCESS]: (state: ProjectorsState[],
    { projectors }) =>
    ({
        ...state,
        projectors: [...projectors],
        message: '',
        loading: false,
    }),
    [LOAD_PROJECTORS_FAILURE]: (state: ProjectorsState[],
    { message }) =>
    ({
        ...state,
        projectors: [],
        message,
        loading: false,
    })
}
export default (state = initialState, action: ProjectorsActions) => createReducer(projectorsReducer, state, action);