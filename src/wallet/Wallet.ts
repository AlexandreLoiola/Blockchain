import { ec as EllipticCurve } from "elliptic";
import TransactionPool from "../mempool/TransactionPool";
import Transaction from "../mempool/Transaction";
import Asset from "../assets/Assets";
const ec = new EllipticCurve("secp256k1");

class Wallet {
  private _keyPair: EllipticCurve.KeyPair;
  private _publicKey: EllipticCurve.KeyPair;
  private _assets: Asset[];

  constructor(privateKey?: string, publicKey?: string) {
    if (privateKey && publicKey) {
      this._keyPair = ec.keyFromPrivate(privateKey);
      this._publicKey = ec.keyFromPublic(publicKey, "hex");
    } else {
      this._keyPair = ec.genKeyPair();
      this._publicKey = ec.keyFromPublic(this._keyPair.getPublic("hex"), "hex");
    }
    this._assets = [];
  }

  createTransaction(
    receiverAddress: string,
    asset: Asset,
    transactionPool: TransactionPool
  ) {
    asset = Asset.create(asset);    
    let transaction = Transaction.createTransaction(this, receiverAddress, asset);
    transactionPool.addTransaction(transaction);
    return transaction;
  }

  signTransaction(dataHash: string): string {
    const sig = this._keyPair.sign(dataHash);
    return sig.toDER("hex");
  }

  exportCredentials(): object {
    return {
      publicKey: this._publicKey.getPublic("hex"),
      privateKey: this._keyPair.getPrivate("hex"),
    };
  }

  public get publicKey(): string {
    return this._keyPair.getPublic("hex");
  }
  public get assets(): Asset[] {
    return this._assets;
  }
  public set assets(value: Asset[]) {
    this._assets = value;
  }
}

export default Wallet;
