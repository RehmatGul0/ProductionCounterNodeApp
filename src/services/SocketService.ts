import { Server } from "http";
import  { Server as SocketServer }  from 'socket.io';

export class SocketService {

    public createSocketConnection(server: Server): SocketServer {
        let socket= new SocketServer(server, {
            allowEIO3: true,
            cors: {
                origin: "http://localhost:4200",
                credentials: true
            }
        })
        return socket
    }
}
