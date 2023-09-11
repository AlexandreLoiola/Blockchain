import { Router } from 'express';
import Blockchain from '../../blockchain/Blockchain';
import P2PServer from '../P2PServer';

export default function createBlockchainRouter (p2pserver: P2PServer, blockchain: Blockchain) {
    const blockchainRouter = Router();

    blockchainRouter.get('/', (req, res) => {
        return res.json(blockchain.chain);
    });

    blockchainRouter.post('/addblock', (req, res) => {
        blockchain.addBlock(req.body);
        p2pserver.syncChain();
        return res.redirect('/api/blockchain/');
    });

    blockchainRouter.get('/details', (req, res) => {
        return res.json(`A dificuldade atual da blockchain é de: ${blockchain.difficulty}`);
    });

    return blockchainRouter;
}