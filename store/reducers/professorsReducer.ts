import { ProfessorState } from "../types"
import { AUTHENTICATE_PROFESSOR_SUCCESS, AUTHENTICATE_PROFESSOR_FAILURE } from "../actions/types"
import { createReducer } from "../../utils/createReducer"
const initialState = {
    professor:
    {
        firstName: '',
        lastName: '',
        email: '',
        status: -1,
        NIC: '',
        message:'',
    }
}
const professorReducer = {
    [AUTHENTICATE_PROFESSOR_SUCCESS]:
    (state: ProfessorState,
    { professor }) =>
    ({
        ...state,
        professor: {
            ...professor
        }
    }),
    [AUTHENTICATE_PROFESSOR_FAILURE]:
    (state: ProfessorState, { message }) =>
    ({
        ...state,
        professor:
        {
            firstName: '',
            lastName: '',
            email: '',
            status: -1,
            NIC: '',
            message
        }
    })
}
export default (state = initialState, action: ProfessorState) => createReducer(professorReducer, state, action);