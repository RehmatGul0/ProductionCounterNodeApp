import { Application } from '../server';
import  { Server as SocketServer }  from 'socket.io';
import { DeviceStatistics } from './DeviceStatistics';
export class Socket {
    private readonly socket: SocketServer;
    constructor(){
        this.socket = Application.getSocket();
    }
    pushDeviceStatistics(value: DeviceStatistics) {
        this.socket.emit('DeviceStatistics', value);
    }
}