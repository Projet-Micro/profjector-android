import { ProfessorState } from "../types"
import { AUTHENTICATE_PROFESSOR_SUCCESS, AUTHENTICATE_PROFESSOR_FAILURE, AUTHENTICATE_PROFESSOR_REQUEST, ProfessorsActions } from "../actions/types"
import { createReducer } from "../../utils/createReducer"
const initialState : ProfessorState = {
    professor:
    {
        professorInfo: null,
        loading: false,
        message: '',
    }
}
const professorReducer = {
    [AUTHENTICATE_PROFESSOR_REQUEST]:
     (state: ProfessorState) =>
    ({
         ...state,
         professor:
        {
            professorInfo : null,
            loading: true,
            message:'',
        }
    }),
    [AUTHENTICATE_PROFESSOR_SUCCESS]:
    (state: ProfessorState,
    { professor }) =>
    ({
        ...state,
        professor: {
            professorInfo: { ...professor },
            loading: false,
            message:'',
        }
    }),
    [AUTHENTICATE_PROFESSOR_FAILURE]:
    (state: ProfessorState,
    { message }) =>
    ({
        ...state,
        professor:
        {
            professorInfo: null,
            loading: false,
            message
        }
    }),

}
export default (state = initialState, action: ProfessorsActions) => createReducer(professorReducer, state, action);