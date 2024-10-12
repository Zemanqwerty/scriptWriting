import { SubBlock } from "./subBlock";

export interface Block {
    id?: number;
    blockTitle: any;
    subBlocks: SubBlock[]
}