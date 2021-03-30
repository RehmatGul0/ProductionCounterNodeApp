export class DeviceStatistics {
    private _productionCount : number;
    private _productionCountRecordedAt: Date;
    private _deviceStatus: boolean;
    private _deviceId: string;
    private _id: string;

    constructor (productionCount: number, productionCountRecordedAt: Date, deviceStatus: boolean,  deviceId: string, id?: string) {
        this._productionCount = productionCount;
        this._productionCountRecordedAt = new Date(productionCountRecordedAt);
        this._deviceStatus = deviceStatus;
        this._deviceId = deviceId;
        this._id = id || '';
    }

    get productionCount (): number {
        return this._productionCount;
    }

    get productionCountRecordedAt (): Date {
        return this._productionCountRecordedAt;
    }

    get deviceStatus (): boolean {
        return this._deviceStatus;
    }

    get deviceId(): string {
        return this._deviceId;
    }

    toString() : string {
        return `Production Count: ${this.productionCount}, 
        Production Count RecordedAt: ${this.productionCountRecordedAt},
        Device Status: ${this.deviceStatus},
        Device Id: ${this.deviceId}`;
    }
}