import { Device } from "react-native-ble-plx";

export type Professor = {
    firstName: string;
    lastName: string;
    NIC: string;
    email: string;
    status: string;
    accessToken: string;
    id: number;
}
export type ProfessorInfo = {
    professorInfo: Professor | null;
    message: string;
    loading: boolean;
}
export type ProfessorState = {
    professor : ProfessorInfo
}
export type Projector = {
    brand: string;
    serialNumber: string;
    nbrCables: number;
    comment: string;
    id: number;
    status: number;
    createdAt: Date,
    updatedAt: Date,
    rent: boolean,
}
export type ProjectorsState = {
    projectors: Projector[];
    loading: boolean;
    message: string;
    borrowedProjector : Projector | null;
}
export type DeviceState = {
    devices: Device[],
    connectedDevice: null | Device,
    loading : boolean
}
export type GlobalState = {
    projectors: ProjectorsState,
    professors: ProfessorState,
    devices: DeviceState
}