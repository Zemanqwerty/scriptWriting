// store.ts
import axios from "axios";
import { makeAutoObservable } from "mobx";
import { API_URL } from "../http";
import { CreateScript } from "../dto/createScript";
import ScriptService from "../service/scriptService";
import { Block } from "../models/block";

export default class Store {
    id?: number;
    scriptTitle: string = '';
    scriptDescription: string = '';
    location: string = '';
    date: Date = new Date();
    blocks: Block[] = []; // Убедитесь, что blocks инициализирован как пустой массив

    constructor() {
        makeAutoObservable(this);
    }

    setScriptTitle(value: string) {
        this.scriptTitle = value;
    }

    setScriptDescription(value: string) {
        this.scriptDescription = value;
    }

    setLocation(value: string) {
        this.location = value;
    }

    setDate(value: Date) {
        this.date = value;
    }

    setBlocks(value: Block[]) {
        this.blocks = value;
    }

    updateScript(id: number, scriptTitle: string, scriptDescription: string, location: string, date: Date, blocks: Block[]) {
        console.log(id);
        this.id = id;
        this.scriptTitle = scriptTitle;
        this.scriptDescription = scriptDescription;
        this.location = location;
        this.date = date;
        this.blocks = blocks;

        console.log(this.scriptTitle);
        console.log(this.scriptDescription);
        console.log(this.location);
        console.log(this.date);
        this.blocks.map((block) => {
            console.log(block.blockTitle);
            block.subBlocks.map((subBlock) => {
                console.log(subBlock.time);
            })
        })

        const updatedScript = new CreateScript({
            id: this.id,
            scriptTitle: this.scriptTitle,
            scriptDescription: this.scriptDescription,
            location: this.location,
            date: this.date,
            blocks: this.blocks
        });

        const response = ScriptService.updateScript(updatedScript)
    }

    async createScript() {
        try {
            // Убедитесь, что blocks не является undefined
            const newScript = new CreateScript({
                scriptTitle: this.scriptTitle,
                scriptDescription: this.scriptDescription,
                location: this.location,
                date: this.date,
                blocks: this.blocks
            });
            const response = await ScriptService.createScript(newScript);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }
}