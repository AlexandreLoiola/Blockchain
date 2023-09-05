import { IData } from "../interfaces/IData";
import Block from "./Block";

class Blockchain {
  private _chain: Block[];
  private _difficulty: number;

  constructor() {
    // Inicia a cadeia de blocos com o bloco gênesis
    this._chain = [Block.createGenesisBlock()];
    this._difficulty = 4;
  }

  // Adiciona um bloco válido a cadeia
  addBlock(data: IData): Block {
    const previousBlock = this.getPreviousBlock();
    const block = Block.mineBlock(this.difficulty, previousBlock, data)!;

    this.adjustDifficulty(block);
    this.chain.push(block);

    return block;
  }

  // Pega o penúltimo bloco da cadeia
  getPreviousBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  isValidChain(chain: Block[]): boolean {
    // Verifica se a assinatura de blocos estão corretos
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const previousBlock = chain[i - 1];
      if (block.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  // Troca a cadeia atual por uma de maior poder computacional
  replaceChain(newChain: Block[]): boolean {
    if (newChain.length <= this.chain.length) {
      console.log("A cadeia recebida não é maior que a cadeia atual");
      return false;
    } else if (!this.isValidChain(newChain)) {
      console.log("A cadeia recebida não é válida");
      return false;
    }
    console.log("Substituindo a blockchain pela nova cadeia...");
    this.chain = newChain;
    return true;
  }

  // Reajusta a dificuldade da blockchain a partir da força computacional da rede;
  adjustDifficulty(currentBlock: Block): number {
    const previousBlock = this.getPreviousBlock();
    const timeDiff =
      parseInt(currentBlock.timestamp) - parseInt(previousBlock.timestamp);
    this.difficulty =
      timeDiff > 5000 ? this.difficulty - 1 : this.difficulty + 1;
    console.log(
      `Diferença de tempo: ${timeDiff} | Dificuldade: ${this.difficulty}`
    );
    return this.difficulty;
  }

  // Getters e Setters
  public get chain(): Block[] {
    return this._chain;
  }
  public set chain(value: Block[]) {
    this._chain = value;
  }

  public get difficulty(): number {
    return this._difficulty;
  }
  public set difficulty(value: number) {
    this._difficulty = value;
  }
}

export default Blockchain;
