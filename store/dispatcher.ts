import store from ".";
import * as actions from './actions/index';
import { Credentials } from "../shared/models";
import { Device } from "react-native-ble-plx";
export function authenticateProfessor(credentials : Credentials) {
    store.dispatch(actions.authenticateProfessor(credentials))
}
export function loadProjectors(): void {
    store.dispatch(actions.loadProjectors())
}
export function loadProfessor(): void {
    store.dispatch(actions.loadProfessor())
}
export function logOutProfessor(): void {
    store.dispatch(actions.logOutProfessor())
}
export function registerDevice(device : Device): void {
    store.dispatch(actions.registerDevice(device))
}
export function unregisterDevice(device: Device): void {
    store.dispatch(actions.unregisterDevice(device))
}
export function connectDevice(device: Device): void {
    store.dispatch(actions.connectDevice(device))
}
export function toggleBluetooth(isBluetoothActivated: boolean): void{
    store.dispatch(actions.toggleBluetooth(isBluetoothActivated))
}
export function addMessage(id : number,text : string,status : string): void{
    store.dispatch(actions.addMessage(id, text, status))
}
export function deleteMessage(id: number): void {
    store.dispatch(actions.deleteMessage(id));
}