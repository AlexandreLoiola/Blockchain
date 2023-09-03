import { IBlock } from "../interfaces/IBlock";

export const genesisBlockData: IBlock = {
  index: 0,
  timestamp: `${Date.now().toString()}`,
  previousHash: "-------",
  hash: "Genesis Block",
  nonce: 0,
  data: { amount: 0 },
};
