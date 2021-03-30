import "reflect-metadata";
import mongoose from 'mongoose';
import config from '../config';

export class MongooseService {

    public async createConnection(): Promise<boolean> {
        return new Promise((resolve,reject)=>{
            mongoose.connect(`mongodb://localhost:${config.database.port}/${config.database.name}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },(error) => {
                if (!error) {
                    resolve(true)
                } else {
                    reject(false);
                }
            });
        })
       
    }
}
