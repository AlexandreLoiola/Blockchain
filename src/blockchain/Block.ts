import crypto from "crypto";

import { IBlock } from "../interfaces/IBlock";
import { IData } from "../interfaces/IData";
import { genesisBlockData } from "./genesisBlockData";

class Block implements IBlock {
  constructor(
    public index: number,
    public timestamp: string,
    public previousHash: string,
    public hash: string,
    public nonce: number,
    public data: IData
  ) {}

  // Cria o Bloco Genesis
  static createGenesisBlock(): IBlock {
    return new this(
      genesisBlockData.index,
      genesisBlockData.timestamp,
      genesisBlockData.previousHash,
      genesisBlockData.hash,
      genesisBlockData.nonce,
      genesisBlockData.data
    );
  }

  // Tenta minerar o bloco. Isto é: Procura um "nonce" que satisfaça a dificuldade da Blochain;
  static mineBlock(
    blockchainDifficult: number,
    previousBlock: IBlock,
    data: IData
  ) {
    try {
      let index: number = previousBlock.index;
      let hash: string;
      let timestamp: string;
      let nonce: number = 0;
      const previousHash: string = previousBlock.hash;

      do {
        nonce++;
        timestamp = Date.now().toString();
        hash = Block.calculateHash(index, timestamp, previousHash, data, nonce);
      } while (
        hash.substring(0, blockchainDifficult) !==
        "0".repeat(blockchainDifficult)
      );
      index++;

      return new this(index, timestamp, previousHash, hash, nonce, data);
    } catch (error: any) {
      console.error(`Falha na mineração do bloco: ${error.message} `);
    }
  }

  static calculateHash(
    index: number,
    timestamp: string,
    previousHash: string,
    data: IData,
    nonce: number
  ): string {
    return crypto
      .createHash("sha256")
      .update(
        `${index}${timestamp}${previousHash}${JSON.stringify(data)}${nonce}`
      )
      .digest("hex");
  }
}

export default Block;
