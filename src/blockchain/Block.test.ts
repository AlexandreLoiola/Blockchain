import { IBlock } from "../interfaces/IBlock";
import Block from "./Block";
import { genesisBlockData } from "./genesisBlockData";

describe("Classe Bloco", () => {
  let genesisBlock: IBlock;
  let previousBlock: IBlock;

  beforeAll(() => {
    genesisBlock = Block.createGenesisBlock();
    previousBlock = genesisBlock;
  });

  describe("Método mineBlock", () => {
    it("Deve retornar um bloco", () => {
      expect(genesisBlock).toBeInstanceOf(Block);
    });

    it("Deve criar o Bloco Genesis", () => {
      expect(genesisBlock.index).toBe(genesisBlockData.index);
      expect(genesisBlock.previousHash).toBe(genesisBlockData.previousHash);
      expect(genesisBlock.hash).toBe(genesisBlockData.hash);
      expect(genesisBlock.nonce).toBe(genesisBlockData.nonce);
      expect(genesisBlock.data).toBe(genesisBlockData.data);
    });
  });

  describe("Método mineBlock", () => {
    it("Deve retornar um bloco", () => {
      expect(Block.mineBlock(2, genesisBlock, { amount: 0 })).toBeInstanceOf(
        Block
      );
    });
    it("Deve minerar um bloco dado uma certa dificuldade", () => {
      const data = { amount: 10 };
      const difficulty = 2;

      const block = Block.mineBlock(difficulty, previousBlock, data);

      expect(block!.index).toBe(1);
      expect(block!.previousHash).toBe(previousBlock.hash);
      expect(block!.data).toEqual(data);
      expect(block!.hash.substring(0, difficulty)).toBe("0".repeat(difficulty));
    });

    it("Deve logar um erro se ocorrer uma falha na mineração do bloco", () => {
      const spy = jest.spyOn(console, "error").mockImplementation(() => {});

      // Call the mineBlock method in a way that will cause an error
      Block.mineBlock(-1, Block.createGenesisBlock(), { amount: 0 });

      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0]).toMatch(/Falha na mineração do bloco/);

      spy.mockRestore();
    });
  });

  describe("Método calculateHash", () => {
    it("Deve calcular o hash a partir das informações de um bloco", () => {
      const { index, previousHash, data, nonce } = genesisBlock;
      let timestamp = "genesis-time";

      const hash = Block.calculateHash(
        index,
        timestamp,
        previousHash,
        data,
        nonce
      );

      expect(hash).toBe(
        "ad0d019bfc35c324783456b884ee93160bc29c7a70007ead821fec28e5049754"
      );
    });
  });
});
