import mongoose from 'mongoose';
import { IDeviceStatisticsDocument } from 'src/interface/SharedInterface';
const deviceStatisticsSchema: mongoose.Schema = new mongoose.Schema({
    productionCount : { type: Number, required :true },
    productionCountRecordedAt: {type: Date, required :true},
    deviceStatus: {type: Boolean, required :true},
    deviceId: { type: String, required :true }
});

export const DeviceStatisticsModel: mongoose.Model<IDeviceStatisticsDocument> = 
mongoose.model<IDeviceStatisticsDocument>('DeviceStatistics',deviceStatisticsSchema);