import Wallet from "./Wallet";
import { ec as EllipticCurve } from "elliptic";
const ec = new EllipticCurve('secp256k1');

describe("Classe Wallet", () => {
  let wallet: Wallet;
  let dataHash: string;

  beforeAll(() => {
    wallet = new Wallet();
    dataHash = "dataHash";
  });

  it("Deve criar uma carteira com um par de chaves e uma chave pública", () => {
    expect(wallet.keyPair).toBeDefined();
    expect(wallet.publicKey).toBeDefined();
  });

  it("Deve assinar uma transação com o hash dos dados", () => {
    const signature = wallet.signTransaction(dataHash);
    expect(signature).toBeDefined();
    expect(ec.keyFromPublic(wallet.publicKey.getPublic('hex'), 'hex').verify(dataHash, signature)).toBe(true);
  });

  describe("Métodos getter e setter", () => {
    it("Deve obter e definir o par de chaves corretamente", () => {
      const newKeyPair = ec.genKeyPair();
      wallet.keyPair = newKeyPair;
      expect(wallet.keyPair).toEqual(newKeyPair);
    });

    it("Deve obter e definir a chave pública corretamente", () => {
      const newPublicKey = ec.keyFromPublic(wallet.keyPair.getPublic('hex'), 'hex');
      wallet.publicKey = newPublicKey;
      expect(wallet.publicKey).toEqual(newPublicKey);
    });
  });
});
