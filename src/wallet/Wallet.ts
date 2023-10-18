import { ec as EllipticCurve } from "elliptic";

const ec = new EllipticCurve('secp256k1');

class Wallet {

    private _keyPair: EllipticCurve.KeyPair;
    private _publicKey: EllipticCurve.KeyPair;

    constructor() {
        this._keyPair = ec.genKeyPair();
        this._publicKey = ec.keyFromPublic(this.keyPair.getPublic('hex'), 'hex');
    }

    public get keyPair(): any {
        return this._keyPair;
    }
    public set keyPair(value: any) {
        this._keyPair = value;
    }
    public get publicKey(): any {
        return this._publicKey;
    }
    public set publicKey(value: any) {
        this._publicKey = value;
    }
}

export default Wallet;