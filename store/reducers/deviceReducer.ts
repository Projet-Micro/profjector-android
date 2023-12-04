import { DeviceActions, REGISTER_DEVICE, UNREGISTER_DEVICE,CONNECT_DEVICE } from "../actions/types";
import { DeviceState } from "../types";
import { createReducer } from "../../utils/createReducer";
const initialState : DeviceState= {
    devices: [],
    connectedDevice: null,
    loading : false,
}
const deviceReducer = {
    [REGISTER_DEVICE]: (state: DeviceState, { device }) => ({
        ...state,
        devices:
        [...state.devices, device]
    }),
    [UNREGISTER_DEVICE]: (state: DeviceState, { device }) => ({
        ...state,
        devices: [],
        connectedDevice: null,
        loading: false  
    }),
    [CONNECT_DEVICE]: (state: DeviceState, { device }) => ({
        ...state,
        connectedDevice: { ...device },
        loading: true,
    })
}
export default (state = initialState, action: DeviceActions) => createReducer(deviceReducer, state, action);