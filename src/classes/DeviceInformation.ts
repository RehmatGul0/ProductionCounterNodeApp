export class DeviceInformation {
    private _deviceId: string;
    private _deviceName: string;

    constructor (deviceName: string, deviceId?: string) {
        this._deviceName = deviceName;
        this._deviceId = deviceId || '';
    }

    get deviceName (): string {
        return this._deviceName;
    }

    get deviceId (): string {
        return this._deviceId;
    }
}