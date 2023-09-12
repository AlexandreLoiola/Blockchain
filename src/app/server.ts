import express from "express";
import createBlockchainRouter from "./routes/blockchain.routes";
import Blockchain from "../blockchain/Blockchain";
import P2PServer from "./P2PServer";

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../../swagger_output.json');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
app.use(express.json());

const blockchain = new Blockchain();
const p2pserver = new P2PServer(blockchain);

app.use("/api/blockchain", createBlockchainRouter(p2pserver, blockchain));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default function startServer() {
  app.listen(HTTP_PORT, () => {
    console.log(`Servidor ligado na porta: ${HTTP_PORT}`);
  });
  p2pserver.listen();
}