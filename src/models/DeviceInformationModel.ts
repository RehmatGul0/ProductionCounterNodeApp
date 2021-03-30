import mongoose from 'mongoose';
import { IDeviceInformationDocument } from 'src/interface/SharedInterface';

const deviceInformationSchema = new mongoose.Schema({
    deviceName : { type: String, required :true },
});

export const DeviceInformationModel: mongoose.Model<IDeviceInformationDocument> = 
mongoose.model<IDeviceInformationDocument>('DeviceInformation',deviceInformationSchema);