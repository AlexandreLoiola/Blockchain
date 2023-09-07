import { Router } from 'express';
import Blockchain from '../../blockchain/Blockchain';

const blockchainRouter = Router();
const blockchain = new Blockchain();

blockchainRouter.get('/', (req, res) => {
    return res.json(blockchain.chain);
});

blockchainRouter.post('/addblock', (req, res) => {
    blockchain.addBlock(req.body);
    return res.redirect('/api/blockchain/');
});

blockchainRouter.get('/details', (req, res) => {
    return res.json(`A dificuldade da blockchain atual é de: ${blockchain.difficulty}`);
});

export default blockchainRouter;