import Blockchain from "./Blockchain";
import { IBlock } from "../interfaces/IBlock";
import Block from "./Block";
import { IData } from "../interfaces/IData";

describe("Classe Blockchain", () => {
  let blockchain: Blockchain;
  let genesisBlock: IBlock;
  let data: IData;

  beforeAll(() => {
    blockchain = new Blockchain();
    genesisBlock = Block.createGenesisBlock();
    data = { amount: 12 };
  });

  describe("Nova consulta", () => {
    it("Deve substituir a cadeia por uma nova cadeia", () => {
      const newBlock1 = Block.mineBlock(1, genesisBlock, {amount: 10})!;
      const newChain: Block[] = [Block.createGenesisBlock(), newBlock1];
      const isReplaced = blockchain.replaceChain(newChain);
      
      expect(isReplaced).toBe(true);
      expect(blockchain.chain).toEqual(newChain);
    });
  });

  describe("Método addBlock", () => {
    it("Deve adicionar um bloco à cadeia", () => {
      const newBlock = blockchain.addBlock(data);
      expect(newBlock).toBeInstanceOf(Block);
      expect(blockchain.chain).toContain(newBlock);
    });
  });

  it("Deve verificar se a cadeia é válida", () => {
    const isValid = blockchain.isValidChain(blockchain.chain);
    expect(isValid).toBe(true);
  });
});
