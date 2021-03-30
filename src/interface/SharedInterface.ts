import { Document } from "mongoose";
export interface IDeviceInformationDocument extends Document {
    deviceName: string;
}

export interface IDeviceStatisticsDocument extends Document {
    productionCount : number;
    productionCountRecordedAt: Date;
    deviceStatus: boolean;
    deviceId: string;
}
