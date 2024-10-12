import { Block } from "./block";


export interface Script {
    id?: number;
    scriptTitle: string;
    scriptDescription: string;
    location: string;
    date: Date;
    blocks?: Block[]; // Исправлен тип на Block[]
}