// MAJOR REDUX DISPATCHER FUNCTIONS SIGNATURES
// FLOW : ActionTypes -> Actions -> Dispatcher -> Reducers -> Store ===> RERENDER
import { Device } from "react-native-ble-plx";
import { Credentials } from "./shared/models";
export function authenticateProfessor(credentials: Credentials) : void;
export function loadProjectors(): void;
export function loadProfessor(): void;
export function logOutProfessor(): void;
export function toggleBluetooth(isBluetoothActivated: boolean): void;
export function registerDevice(device: Device): void;
export function unregisterDevice(device: Device): void;
export function connectDevice(device: Device): void;
export function addMessage(id: number, text: string, status: string): void;
export function deleteMessage(id: number): void;