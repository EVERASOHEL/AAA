// import { machineId, machineIdSync } from "node-machine-id";

// var macaddress = require("macaddress");
const DeviceUUID = require("device-uuid");

export const getAllMACaddress = () => {
    console.log(`getAllMACaddress`);

    //   macaddress.one((err, mac) => {
    //     console.log("Mac address for this host: %s", mac);
    //   });

    //   macaddress.all((err, data) => {
    //     console.log("macaddress all: ", data);
    //   });

    //   console.log(`networkInterfaces: `, macaddress.networkInterfaces());

    return "98912984-c4e9-5ceb-8000-03882a0485e4";
};

// const getMachineId = async () => {
//   let macId = await machineId();
//   console.log(`getMachineId macId: `, macId);

//   let macId2Original = await machineId({ original: true });
//   console.log(`getMachineId macId2Original: `, macId2Original);
// };

export const getMachineID = () => {
    console.log(`getMachineID`);

    // getMachineId();

    // let id = machineIdSync();
    // console.log(`getMachineID id: `, id);

    // let id2 = machineIdSync({ original: true });
    // console.log(`getMachineID id2: `, id2);

    return "98912984-c4e9-5ceb-8000-03882a0485e4";
};

export const getDeviceUUID = () => {
    return DeviceUUID.DeviceUUID().get();
};

export const getDeviceDetails = () => {
    const uuid = getDeviceUUID();

    var deviceDetails = DeviceUUID.DeviceUUID().parse();
    deviceDetails.uuid = uuid;

    return deviceDetails;
};
