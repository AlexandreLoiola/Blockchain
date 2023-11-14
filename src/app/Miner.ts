import Blockchain from "../blockchain/Blockchain";
import TransactionPool from "../mempool/TransactionPool";
import P2PServer from "./P2PServer";

export default class Miner {
  private _blockchain: Blockchain;
  private _transactionPool: TransactionPool;
  private _p2pServer: P2PServer;

  constructor(blockchain: Blockchain, transactionPool: TransactionPool, p2pServer: P2PServer) {
    this._blockchain = blockchain;
    this._transactionPool = transactionPool;
    this._p2pServer = p2pServer;
  }

  mine() {
    const validTransactions = this.transactionPool.transactions;

    const block = this.blockchain.addBlock(validTransactions);
    this.p2pServer.syncChain();
    this.transactionPool.clear();
    this.p2pServer.syncClearTransactionPool();

    return block;
  }

  public get blockchain(): Blockchain {
    return this._blockchain;
  }
  public set blockchain(value: Blockchain) {
    this._blockchain = value;
  }

  public get transactionPool(): TransactionPool {
    return this._transactionPool;
  }
  public set transactionPool(value: TransactionPool) {
    this._transactionPool = value;
  }

  public get p2pServer(): P2PServer {
    return this._p2pServer;
  }
  public set p2pServer(value: P2PServer) {
    this._p2pServer = value;
  }
}
