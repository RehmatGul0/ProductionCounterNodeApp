import "reflect-metadata";
import { Response, Request } from "express";
import {JsonController, Req, Res, Post, Get } from "routing-controllers";
import { DeviceInformation } from "../classes/DeviceInformation";
import { DeviceInformationService } from "../services/DeviceInformationService";

@JsonController()
export class DeviceInformationController {
    constructor(
        private readonly deviceInformationService: DeviceInformationService,
    ) {}

    @Post('/api/deviceInformation')
    public async addDeviceInformation(@Req() req: Request, @Res() res: Response): Promise<Response> {
        const deviceStatistics = new DeviceInformation(
            req.body.deviceName);
        const status = await this.deviceInformationService.addDeviceInformation(deviceStatistics);
        if ( status ) {
            return res.status(200).send({message: 'Success'});
        } else {
            return res.status(400).send({message: 'Something went wrong'});
        }
    }

    @Get('/api/deviceInformation')
    public async getDeviceInformation(@Req() req: Request, @Res() res: Response): Promise<Response> {
        try{
            const deviceInformation = await this.deviceInformationService.getDeviceInformation();
            if ( !deviceInformation ) {
                throw new Error();
            }
            return res.status(200).send({message: 'Success', result : deviceInformation});
        } catch (error) {
            return res.status(400).send({message: 'Something went wrong'});
        }
    }

    
}
