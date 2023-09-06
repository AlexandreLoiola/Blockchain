import Blockchain from "./Blockchain";
import { IBlock } from "../interfaces/IBlock";
import Block from "./Block";
import { IData } from "../interfaces/IData";

describe("Classe Blockchain", () => {
  let blockchain: Blockchain;
  let genesisBlock: IBlock;
  let data: IData;
  let notValidChain: Block[];

  beforeAll(() => {
    blockchain = new Blockchain();
    genesisBlock = Block.createGenesisBlock();
    data = { amount: 12 };

    const newBlock1 = Block.mineBlock(1, genesisBlock, data)!;
    const newBlock2 = Block.mineBlock(1, genesisBlock, data)!;
    notValidChain = [genesisBlock, newBlock1, newBlock2]
  });

  it("Deve ter um bloco gênesis em cada nova instância de Blockchain", () => {
    const blockchain = new Blockchain();
    expect(blockchain.chain).toContainEqual(genesisBlock);
  })

  describe("Método replaceChain", () => {
    it("Deve substituir a cadeia por uma nova cadeia", () => {
      const newBlock1 = Block.mineBlock(1, genesisBlock, {amount: 10})!;
      const newChain: Block[] = [Block.createGenesisBlock(), newBlock1];
      const isReplaced = blockchain.replaceChain(newChain);
      
      expect(isReplaced).toBe(true);
      expect(blockchain.chain).toEqual(newChain);
    });
    it("Deve retornar falso se a cadeia enviada seja menor que a atual", () => {
      const newChain: Block[] = [Block.createGenesisBlock()];
      const isReplaced = blockchain.replaceChain(newChain);

      expect(isReplaced).toBe(false);
    });
    it('Deve retornar falso se a cadeia não for válida', () => {
      const isReplaced = blockchain.replaceChain(notValidChain);
      expect(isReplaced).toBe(false);
    });
  });

  describe("Método isValidChain", () => {
    it("Deve verificar se uma cadeia é válida", () => {
      const newBlock1 = Block.mineBlock(1, genesisBlock, data)!;
      const newChain: Block[] = [Block.createGenesisBlock(), newBlock1];

      const isValid = blockchain.isValidChain(newChain);
      expect(isValid).toBe(true);
    });

    it("Deve verificar se o hash do bloco anterior é igual ao previousHash do sucessor", () => {
      const isValid = blockchain.isValidChain(notValidChain);
      expect(isValid).toBe(false);
    })
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

  describe('adjustDifficulty', () => {
    it('deve aumentar a dificuldade se o tempo entre os blocos for menor que 5000ms', () => {
      const currentBlock = Block.mineBlock(2, genesisBlock, data)!;
      blockchain.difficulty = 0;
      const newDifficulty = blockchain.adjustDifficulty(currentBlock);
      expect(newDifficulty).toBe(blockchain.difficulty);
    });
  
    it('deve diminuir a dificuldade se o tempo entre os blocos for maior que 5000ms', () => {
      const currentBlock = Block.mineBlock(1, genesisBlock, data)!;
      blockchain.difficulty = 3;
      const newDifficulty = blockchain.adjustDifficulty(currentBlock);
      expect(newDifficulty).toBe(blockchain.difficulty);  
    });
  });
});
