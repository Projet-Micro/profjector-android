/* eslint-disable no-bitwise */
import { PermissionsAndroid, Platform,ToastAndroid } from "react-native";
import {
  BleManager,
  Device,
} from "react-native-ble-plx";
import * as ExpoDevice from "expo-device";
import { useSelector } from "react-redux";
import { GlobalState } from "../store/types";
import { loadProjectors, registerDevice, toggleBluetooth, addMessage } from '../index'
import { generateId } from "../utils/generateId";
import { unregisterDevice } from "../index";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { encode as btoa,decode as atob } from 'base-64'
import { ProjectorInfo } from "../shared/models";
type RootStackParamList = {
  BorrowModal: ProjectorInfo,
  Home : undefined
}
interface BluetoothLowEnergyApi {
  requestPermissions(): Promise<boolean>;
  scanForPeripherals(): void;
  writePayload(device : Device,projectorId : number,professorId: number, professorToken : string,navigation : NativeStackNavigationProp<RootStackParamList, "BorrowModal", undefined>,rent : boolean): void;
  connectToDevice: (deviceId: Device) => Promise<void>;
  disconnectFromDevice: (device : Device) => void;
}

function useBLE(): BluetoothLowEnergyApi {
  const allDevices = useSelector((state: GlobalState) => state.devices)
  const SERVICE_UUID = "19B10000-E8F2-537E-4F6C-D104768A1214";
  const characteristicUUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";
  let str: string = '';
  var bleManager : BleManager;
  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };
  const scanForPeripherals = async() => {
    bleManager = new BleManager();
        let state : string = await bleManager.state();
    let isWorking = (state === "PoweredOn");
    toggleBluetooth(isWorking);
    bleManager.onStateChange(state => {

      if (state === "PoweredOn" && !isWorking) {
        isWorking = true;
        toggleBluetooth(isWorking);
      }
      else if (state !== "PoweredOn" && isWorking)
      {
        isWorking = false;
        toggleBluetooth(isWorking);
      }
    })
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
      }
      if (device && device.name?.includes("ESP") && allDevices.devices.filter(dev => dev.id == device.id).length == 0) {
        registerDevice(device);
        bleManager.stopDeviceScan();
      }
    
    });
  }
  const connectToDevice = async (device: Device) => {
    if (bleManager)
      bleManager.destroy();
    bleManager = new BleManager();
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      await deviceConnection.discoverAllServicesAndCharacteristics();
    } catch {
       addMessage(generateId(), "Failed to connect! Please try again !", "danger");
    }
  };

  const disconnectFromDevice =async(device : Device) => {
    try {
      await bleManager.cancelDeviceConnection(device.id);
    } catch {
    }  
      bleManager.destroy();
      unregisterDevice(device);
  };

  const readCharacteristics = (device: Device, navigation: NativeStackNavigationProp<RootStackParamList, "BorrowModal", undefined>): void => {
    bleManager.monitorCharacteristicForDevice(device.id, SERVICE_UUID, characteristicUUID, (error, characteristic) => {
      if (characteristic?.value) {
        const data: string = atob(characteristic?.value);
        str = str + data;
        if (str[str.length - 1] == '#') {
          const response = JSON.parse(str.split('#')[0]);
          if (response && response.status === 200) {
            disconnectFromDevice(device).then(() => {
              loadProjectors();
              addMessage(generateId(),response.response.message, "success");
            })
          }
          else if (response && response.status !== 200) {
            disconnectFromDevice(device).then(() => {
              addMessage(generateId(), "Unable to connect. Try Again !", "danger");
            })
          }
          str = "";
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
          else {
            navigation.navigate("Home")
          }


        }
      }
    })
  }
    
  const writePayload = async (device: Device, projectorId: number, professorId: number, professorToken: string, navigation : NativeStackNavigationProp<RootStackParamList, "BorrowModal", undefined>,rent : boolean) => {
    readCharacteristics(device, navigation)
    let jsonString: string;
    if (!rent) {
      jsonString = JSON.stringify({
        projectorId,
        professorId,
        startDate: new Date(),
        professorToken,
        rent
      })
    }
    else
    {
      jsonString = JSON.stringify({
        projectorId,
        endDate: new Date(),
        professorToken,
        rent
      })
    }

    const data = btoa(jsonString);
      await device.writeCharacteristicWithResponseForService(
        SERVICE_UUID,
        characteristicUUID,
        data
    ) 

  }
    

  return {
    scanForPeripherals,
    requestPermissions,
    connectToDevice,
    disconnectFromDevice,
    writePayload
  };
}

export default useBLE;