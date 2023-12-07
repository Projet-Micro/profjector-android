import { MessagesState } from "../types"
import { MessageActions,ADD_MESSAGE, DELETE_MESSAGE } from "../actions/types"
import { createReducer } from "../../utils/createReducer"
const initialState : MessagesState = {
    messages : []
} 
const messagesReducer = {
    [ADD_MESSAGE]: (state: MessagesState,{ message }) =>
    ({
        ...state,
        messages: [...state.messages,message],
    }),
    [DELETE_MESSAGE]: (state: MessagesState, { id }) => {
        return {
            ...state,
            messages: state.messages.filter(message => message.id !== id)
        }
    }
}
export default (state = initialState, action: MessageActions) => createReducer(messagesReducer, state, action);