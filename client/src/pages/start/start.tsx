// Main.tsx
import React, { FC, memo, useContext, useEffect, useState } from "react";
import styles from './start.module.css'
import ScriptBlock from "../../components/scriptBlock";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Context } from "../..";
import { useNavigate, useParams } from "react-router-dom";
import ScriptService from "../../service/scriptService";
import { SubBlock } from "../../models/subBlock";
import { Block } from "../../models/block";
import { CreateScript } from "../../dto/createScript";

const Start: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { store } = useContext(Context);

    const navigate = useNavigate();

    const [scriptTitle, setScriptTitle] = useState('');
    const [scriptDescription, setScriptDescription] = useState('');
    const [scriptLocation, setScriptLocation] = useState('');
    const [scriptDate, setScriptDate] = useState<Date | null>(null);
    const [blocks, setBlocks] = useState<Block[]>([]);

    const addBlock = () => {
        const newBlock: Block = {
            id: undefined,
            blockTitle: '',
            subBlocks: []
        };
        setBlocks([...blocks, newBlock]);
    };

    const addSubBlock = (blockIndex: number) => {
        const newSubBlock: SubBlock = {
            id: undefined,
            time: '',
            action: '',
            sound: '',
            light: '',
            videoMain: '',
            videoSecond: '',
            note: ''
        };
        const updatedBlocks = [...blocks];
        updatedBlocks[blockIndex].subBlocks.push(newSubBlock);
        setBlocks(updatedBlocks);
    };

    const createScript = async () => {
        if (scriptDate) {
            const newScript = new CreateScript(
                {
                    location: scriptLocation,
                    scriptTitle: scriptTitle,
                    scriptDescription: scriptDescription,
                    date: scriptDate
                }
            )

            await ScriptService.createScript(newScript).then((response) => {
                const id = response.data.scriptId;

                return navigate(`/${id}`);
            })
        }
    }

    // const saveChanges = () => {
    //     if (id) {
    //         store.updateScript(parseInt(id), scriptTitle, scriptDescription, scriptLocation, scriptDate!, blocks);
    //     }
    // };

    // useEffect(() => {
    //     const getScriptData = async () => {
    //         try {
    //             if (id) {
    //                 const response = await ScriptService.getScriptById(parseInt(id));

    //                 setScriptTitle(response.data.scriptTitle);
    //                 setScriptDescription(response.data.scriptDescription);
    //                 setScriptLocation(response.data.location);
    //                 setScriptDate(response.data.date);
    //                 setBlocks(response.data.blocks || []);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching script:", error);
    //         }
    //     };

    //     getScriptData();
    // }, [id]);

    return (
        <div className={styles.main}>
            <div className={styles.scriptTitle}>
                <div className={styles.scriptTitleText}>
                    Название сценария
                </div>
                <input className={styles.scriptNameInput} type="text" value={scriptTitle} onChange={(e) => setScriptTitle(e.target.value)} />
            </div>
            <div className={styles.scriptTitle}>
                <div className={styles.scriptTitleText}>
                    Краткое описание
                </div>
                <input className={styles.scriptNameInput} type="text" value={scriptDescription} onChange={(e) => setScriptDescription(e.target.value)} />
            </div>
            <div className={styles.scriptTitle}>
                <div className={styles.scriptTitleText}>
                    Место
                </div>
                <input className={styles.scriptNameInput} type="text" value={scriptLocation} onChange={(e) => setScriptLocation(e.target.value)} />
            </div>
            <div className={styles.scriptTitle}>
                <div className={styles.scriptTitleText}>
                    Дата
                </div>
                <DatePicker
                    className={styles.scriptNameInput}
                    selected={scriptDate}
                    onChange={setScriptDate}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select a date"
                />
            </div>
            <div className={styles.bottomBtns}>
                <div className={styles.addBlock} onClick={createScript}>
                    Создать
                </div>
            </div>
        </div>
    )
}

export default memo(Start);