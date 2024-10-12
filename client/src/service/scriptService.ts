import { Script as CreateScript } from "../models/script";
import $api from "../http";
import { Axios, AxiosResponse } from "axios";


export default class ScriptService {
    static async createScript(scriptData: CreateScript) {
        const res = await $api.post(`scripts/create`, scriptData, {withCredentials: true});
        if (res.status !== 201) {
            throw new Error();
        }
        return res;
    }

    static async updateScript(scriptData: CreateScript) {
        const res = await $api.put(`scripts/${scriptData.id}`, scriptData, {withCredentials: true});
        if (res.status !== 200) {
            throw new Error();
        }
        return res;
    }

    static async getAllScripts(): Promise<AxiosResponse<CreateScript[]>> {
        const res = await $api.get(`scripts/all`, {withCredentials: true});
        if (res.status !== 200) {
            throw new Error();
        }
        return res;
    }

    static async getScriptById(id: number): Promise<AxiosResponse<CreateScript>> {
        const res = await $api.get(`scripts/${id}`, {withCredentials: true});
        if (res.status !== 200) {
            throw new Error();
        }
        return res;
    }

    

    // static async getFilialsForApplication(): Promise<AxiosResponse<FilialsResponse[]>> {
    //     try {
    //         const res = await $api.get<FilialsResponse[]>(`applications/getFilials`, {withCredentials: true});
    //         if (res.status !== 200) {
    //             throw new Error();
    //         }
    //         return res;
    //     } catch {
    //         return await $apiLocalNetwork.get<FilialsResponse[]>(`applications/getFilials`, {withCredentials: true});
    //     }
    // }
}