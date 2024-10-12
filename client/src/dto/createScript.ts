import { Block } from "../models/block";
import { Script as cs } from "../models/script";

export class CreateScript {
    id?: number;
    scriptTitle: string;
    scriptDescription: string;
    location: string;
    date: Date;
    blocks?: Block[]; // Исправлен тип на Block[]

    constructor (
        scriptData: cs
    ) {
        this.id = scriptData.id;
        this.scriptTitle = scriptData.scriptTitle;
        this.scriptDescription = scriptData.scriptDescription;
        this.location = scriptData.location;
        this.date = scriptData.date;
        this.blocks = scriptData.blocks;
    }
}