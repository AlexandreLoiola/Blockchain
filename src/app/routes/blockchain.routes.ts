import { Router } from "express";
import Blockchain from "../../blockchain/Blockchain";
import P2PServer from "../P2PServer";

export default function createBlockchainRouter(
  p2pserver: P2PServer,
  blockchain: Blockchain
) {
  const blockchainRouter = Router();

  blockchainRouter.get("/", (req, res) => {
    // #swagger.path = '/api/blockchain'
    // #swagger.tags = ['Blockchain']
    // #swagger.description = 'Endpoint para obter a blockchain.'
    return res.json(blockchain.chain);
  });

  blockchainRouter.get("/:index", (req, res) => {
    // #swagger.path = '/api/blockchain/{index}/'
    // #swagger.tags = ['Blockchain']
    // #swagger.description = 'Endpoint para obter um bloco específico.'
    // #swagger.parameters['index'] = { description: 'Índice do bloco.' }
    const block = blockchain.chain.find(
      (block) => block.index === Number(req.params.index)
    );
    if (block) {
      return res.json(block);
    } else {
      return res.status(404).json({ error: "Bloco não encontrado" });
    }
  });

  blockchainRouter.post("/addblock", (req, res) => {
// #swagger.path = '/api/blockchain/addblock/'
    // #swagger.tags = ['Blockchain']
    // #swagger.description = 'Endpoint para adicionar um novo bloco à blockchain.'
    /* #swagger.parameters['novoBloco'] = {
         in: 'body',
         description: 'Dados do novo bloco.',
         required: true,
         type: 'object',
         schema: {
            type: 'object',
            properties: {
                index: { type: 'number' },
                timestamp: { type: 'string' },
                previousHash: { type: 'string' },
                hash: { type: 'string' },
                data: { 
                    "amount": {type: 'number}
                },
                nonce: { type: 'number' }
            }
         }
      } */
    blockchain.addBlock(req.body);
    p2pserver.syncChain();
    return res.redirect("/api/blockchain/");
  });

  blockchainRouter.get("/details", (req, res) => {
    // #swagger.path = '/api/blockchain/details/'
    // #swagger.tags = ['Blockchain']
    // #swagger.description = 'Endpoint para obter a dificuldade atual da blockchain.'
    return res.json(
      `A dificuldade atual da blockchain é de: ${blockchain.difficulty}`
    );
  });

  return blockchainRouter;
}
