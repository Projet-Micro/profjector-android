// EXPORT ALL DISPATCHER FUNCTIONS TO EXPOSE THEM DIRECTLY WITHOUT DISPATCH METHOD
import {
    authenticateProfessor,
    loadProjectors,
    loadProfessor,
    logOutProfessor,
    registerDevice,
    unregisterDevice,
    connectDevice,
    toggleBluetooth,
    addMessage,
    deleteMessage
} from './store/dispatcher'
export {
    authenticateProfessor,
    loadProjectors,
    loadProfessor,
    logOutProfessor,
    registerDevice,
    unregisterDevice,
    connectDevice,
    toggleBluetooth,
    addMessage,
    deleteMessage
};