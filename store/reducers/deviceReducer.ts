import { DeviceActions, REGISTER_DEVICE, UNREGISTER_DEVICE, CONNECT_DEVICE, TOGGLE_BLUETOOTH } from "../actions/types";
import { DeviceState } from "../types";
import { createReducer } from "../../utils/createReducer";
const initialState : DeviceState= {
    devices: [],
    connectedDevice: null,
    loading: false,
    isBluetoothActivated: false,
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
    }),
    [TOGGLE_BLUETOOTH]: (state: DeviceState, { isBluetoothActivated }) => ({
        ...state,
        isBluetoothActivated
    })
}
export default (state = initialState, action: DeviceActions) => createReducer(deviceReducer, state, action);