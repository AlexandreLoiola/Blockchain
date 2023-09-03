import { IData } from "./IData";

export interface IBlock {
    index: number,
    timestamp: string,
    previousHash: string,
    hash: string,
    data: IData,
    nonce: number
}