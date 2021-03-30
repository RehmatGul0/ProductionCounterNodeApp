import "reflect-metadata";
import { Response, Request } from "express";
import {JsonController, Req, Res, Post, Get } from "routing-controllers";
import { DeviceStatisticsService } from "../services/DeviceStatisticsService";
import { DeviceStatistics } from "../classes/DeviceStatistics";

@JsonController()
export class DeviceStatisticsController {
    constructor(
        private readonly deviceStatisticsService: DeviceStatisticsService,
    ) {}

    @Post('/api/deviceStatistics')
    public async addDeviceStatistics(@Req() req: Request, @Res() res: Response): Promise<Response> {
        const deviceStatistics = new DeviceStatistics(
            req.body.productionCount ,
            req.body.productionCountRecordedAt ,
            req.body.deviceStatus,
            req.body.deviceId);
        const status = await this.deviceStatisticsService.addDeviceStatistics(deviceStatistics);
        if ( status ) {
            return res.status(200).send({message: 'Success'});
        } else {
            return res.status(400).send({message: 'Something went wrong'});
        }
    }

    @Get('/api/deviceStatistics')
    public async getLatestDeviceStatistics(@Req() req: Request, @Res() res: Response): Promise<Response> {
        try{
            const deviceStatistics = await this.deviceStatisticsService.getLatestDeviceStatistics();
            return res.status(200).send({message: 'Success', result : deviceStatistics});
        } catch (error) {
            return res.status(400).send({message: 'Something went wrong'});
        }
    }

    @Get('/api/deviceStatistics/:deviceId')
    public async getLatestDeviceStatisticsByDeviceId(@Req() req: Request, @Res() res: Response): Promise<Response> {
        try{
            const deviceId = req.params.deviceId;
            const deviceStatistics = await this.deviceStatisticsService.getDeviceStatisticsByDeviceId(deviceId);
            return res.status(200).send({message: 'Success', result : deviceStatistics});
        } catch (error) {
            return res.status(400).send({message: 'Something went wrong'});
        }
    }
}
