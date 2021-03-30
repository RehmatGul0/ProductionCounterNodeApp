import "reflect-metadata";
import { Service } from "typedi";
import { DeviceInformation } from "../classes/DeviceInformation";
import { DeviceInformationModel } from "../models/DeviceInformationModel";
import { IDeviceInformationDocument } from "../interface/SharedInterface";

@Service()
export class DeviceInformationService {

    public async addDeviceInformation(deviceInformation: DeviceInformation)
    : Promise < boolean > {
        try {
            await DeviceInformationModel.create({
                deviceName: deviceInformation.deviceName
            });
            return true;
        } catch (error) {
            return false;
        }
    }
    
    public async getDeviceInformation(): Promise < DeviceInformation [] >{
        try {
            let deviceInformation: DeviceInformation[] = [];
            let deviceInformationResult: Array<IDeviceInformationDocument> = await DeviceInformationModel.find().exec();
            deviceInformation = deviceInformationResult.map((deviceInfo: IDeviceInformationDocument) => {
                return new DeviceInformation(deviceInfo.deviceName, deviceInfo.id);
            });

            return deviceInformation
        } catch (error) {
            return null;
        }
    }
}
