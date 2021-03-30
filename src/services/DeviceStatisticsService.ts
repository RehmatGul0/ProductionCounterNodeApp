import "reflect-metadata";
import { DeviceStatistics } from "../classes/DeviceStatistics";
import { Socket } from "../classes/Socket";
import { Service } from "typedi";
import { DeviceStatisticsModel } from "../models/DeviceStatisticsModel";
import { IDeviceStatisticsDocument } from "../interface/SharedInterface";
import { DeviceInformationService } from "./DeviceInformationService";
import { DeviceInformation } from "../classes/DeviceInformation";

@Service()
export class DeviceStatisticsService {
    constructor(private readonly socket: Socket, private deviceInformationService: DeviceInformationService) { }

    public async addDeviceStatistics(deviceStatistics: DeviceStatistics)
    : Promise < boolean > {
        try {
            await DeviceStatisticsModel.create({
                productionCount: deviceStatistics.productionCount,
                productionCountRecordedAt: deviceStatistics.productionCountRecordedAt,
                deviceStatus: deviceStatistics.deviceStatus,
                deviceId: deviceStatistics.deviceId
            });
            this.socket.pushDeviceStatistics(deviceStatistics)
            return true;
        } catch (error) {
            return false;
        }
    }

    public async getDeviceStatisticsByDeviceId(deviceId: string): Promise < DeviceStatistics[] >{
        try {
            let deviceStatisticsResult : IDeviceStatisticsDocument[] = await DeviceStatisticsModel
            .find({deviceId: deviceId}).sort('-_id').limit(1).exec();

            let deviceStatistics: DeviceStatistics[] = deviceStatisticsResult.length ? 
            deviceStatisticsResult.map( deviceStatistics =>
                new DeviceStatistics(
                    deviceStatistics.productionCount,
                    deviceStatistics.productionCountRecordedAt,
                    deviceStatistics.deviceStatus,
                    deviceStatistics.deviceId,
                    deviceStatistics.id)) : [];
            return deviceStatistics
        } catch (error) {
            return null;
        }
    }

    public async getLatestDeviceStatistics(): Promise < DeviceStatistics[] >{
        try {
            let deviceInformation: DeviceInformation [] = await this.deviceInformationService.getDeviceInformation();
            const latestDeviceStatistics: Promise<DeviceStatistics[]>[] = deviceInformation.map(async deviceInfo => {
                return this.getDeviceStatisticsByDeviceId(deviceInfo.deviceId);
            })
            return (await Promise.all(latestDeviceStatistics)).flat();
        } catch (error) {
            return null;
        }
    }
}
