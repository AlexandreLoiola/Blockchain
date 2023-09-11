import { Server } from "socket.io";
import socketIOClient from "socket.io-client";

import { ISocketServer } from "../interfaces/ISocketServer";
import { ISocketClient } from "../interfaces/ISocketClient";
import Blockchain from "../blockchain/Blockchain";

const P2P_PORT = Number(process.env.P2P_PORT) || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];

class P2PServer {
  private _sockets: ISocketServer[] | ISocketClient[];
  private _blockchain: Blockchain;

  constructor(blockchain: Blockchain) {
    this._blockchain = blockchain;
    this._sockets = [];
  }

  listen(): void {
    const io = new Server(P2P_PORT);
    io.on("connection", (socket) => {
      console.log(`Conexão estabelecida com o socket: ${socket.id}`);
      this.connectSocket(socket);
    });
    this.connectToPeers();
    console.log(`Servidor p2p ligado na porta: ${P2P_PORT}`);
  }

  connectToPeers(): void {
    peers.forEach((peer) => {
      const socket: ISocketClient = socketIOClient(peer);
      socket.on("connect", () => {
        console.log(`Conectado ao peer: ${peer}`);
        this.connectSocket(socket);
      });
      socket.on('connect_error', (error) => {
        console.log(`Erro ao conectar ao peer: ${peer}`, error);
      });
    });
  }

  connectSocket(socket: any): void {
    this.sockets.push(socket);
    console.log(`Novo socket conectado: ${socket.id}`);

    this.messageHandler(socket);
    this.sendChain(socket);
  }

  messageHandler(socket: ISocketServer | ISocketClient) {
    socket.on('message', (message: any) => {
      const data = JSON.parse(message);
      this.blockchain.replaceChain(data);
    });
  }

  syncChain() {
    this.sockets.forEach(socket => {
      this.sendChain(socket);
    });
  }

  sendChain(socket: ISocketServer) {
    if (socket.connected) {
      socket.send(JSON.stringify(this.blockchain.chain));
    } else {
      console.log('O Socket não está preparado para enviar mensagens');
    }
  }

  public get sockets(): ISocketServer[] | ISocketClient[] {
    return this._sockets;
  }
  public set sockets(value: ISocketServer[] | ISocketClient[]) {
    this._sockets = value;
  }
  
  public get blockchain(): Blockchain {
    return this._blockchain;
  }
  public set blockchain(value: Blockchain) {
    this._blockchain = value;
  }
}
export default P2PServer;

//HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev
//HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev
