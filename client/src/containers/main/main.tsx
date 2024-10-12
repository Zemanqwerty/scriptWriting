// Main.tsx
import React, { FC, memo, useContext, useEffect, useState } from "react";
import styles from './main.module.css'
import ScriptBlock from "../../components/scriptBlock";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Context } from "../..";
import { useParams } from "react-router-dom";
import ScriptService from "../../service/scriptService";
import { SubBlock } from "../../models/subBlock";
import { Block } from "../../models/block";
import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun, AlignmentType, WidthType } from "docx";
import { saveAs } from "file-saver";

const Main: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { store } = useContext(Context);

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

    const saveChanges = () => {
        if (id) {
            store.updateScript(parseInt(id), scriptTitle, scriptDescription, scriptLocation, scriptDate!, blocks);
        }
    };



    const generateDocx = () => {
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({ text: scriptTitle, bold: true}),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({ text: scriptDescription}),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            children: [
                                new TextRun({ text: `Место: ${scriptLocation}`}),
                            ],
                        }),
                        new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            children: [
                                new TextRun({ text: `Дата: ${scriptDate!.toString().split('T')[0]}`}),
                            ],
                        }),
                        new Table({
                            rows: [
                                new TableRow({
                                    children: [
                                        new TableCell({
                                            children: [new Paragraph({ text: "Время", style: "bold"})],
                                            width: { size: 10, type: WidthType.PERCENTAGE },
                                        }),
                                        new TableCell({
                                            children: [new Paragraph({ text: "Действие", style: "bold"})],
                                            width: { size: 30, type: WidthType.PERCENTAGE },
                                        }),
                                        new TableCell({
                                            children: [new Paragraph({ text: "Звук", style: "bold"})],
                                            width: { size: 15, type: WidthType.PERCENTAGE },
                                        }),
                                        new TableCell({
                                            children: [new Paragraph({ text: "Свет", style: "bold"})],
                                            width: { size: 15, type: WidthType.PERCENTAGE },
                                        }),
                                        new TableCell({
                                            children: [new Paragraph({ text: "Видео (центральный экран)", style: "bold"})],
                                            width: { size: 15, type: WidthType.PERCENTAGE },
                                        }),
                                        new TableCell({
                                            children: [new Paragraph({ text: "Видео (боковые экраны)", style: "bold"})],
                                            width: { size: 15, type: WidthType.PERCENTAGE },
                                        }),
                                        new TableCell({
                                            children: [new Paragraph({ text: "Примечание", style: "bold",})],
                                            width: { size: 20, type: WidthType.PERCENTAGE },
                                        }),
                                    ],
                                }),
                                ...blocks.flatMap(block => {
                                    return [
                                        new TableRow({
                                            children: [
                                                new TableCell({
                                                    rowSpan: 1,
                                                    columnSpan: 7,
                                                    children: [new Paragraph({ text: block.blockTitle, style: "bold", alignment: AlignmentType.CENTER })],
                                                }),
                                            ],
                                        }),
                                        ...block.subBlocks.map((subBlock, index) => {
                                            return new TableRow({
                                                children: [
                                                    new TableCell({
                                                        children: [new Paragraph({ text: subBlock.time })],
                                                        width: { size: 10, type: WidthType.PERCENTAGE },
                                                    }),
                                                    new TableCell({
                                                        children: [new Paragraph({ text: subBlock.action.replace(/<[^>]+>/g, '') })],
                                                        width: { size: 30, type: WidthType.PERCENTAGE },
                                                    }),
                                                    new TableCell({
                                                        children: [new Paragraph({ text: subBlock.sound })],
                                                        width: { size: 15, type: WidthType.PERCENTAGE },
                                                    }),
                                                    new TableCell({
                                                        children: [new Paragraph({ text: subBlock.light })],
                                                        width: { size: 15, type: WidthType.PERCENTAGE },
                                                    }),
                                                    new TableCell({
                                                        children: [new Paragraph({ text: subBlock.videoMain })],
                                                        width: { size: 15, type: WidthType.PERCENTAGE },
                                                    }),
                                                    new TableCell({
                                                        children: [new Paragraph({ text: subBlock.videoSecond })],
                                                        width: { size: 15, type: WidthType.PERCENTAGE },
                                                    }),
                                                    new TableCell({
                                                        children: [new Paragraph({ text: subBlock.note })],
                                                        width: { size: 20, type: WidthType.PERCENTAGE },
                                                    }),
                                                ],
                                            });
                                        }),
                                    ];
                                }),
                            ],
                        }),
                    ],
                },
            ],
        });

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, `${scriptTitle}.docx`);
        });
    };



    useEffect(() => {
        const getScriptData = async () => {
            try {
                if (id) {
                    const response = await ScriptService.getScriptById(parseInt(id));

                    setScriptTitle(response.data.scriptTitle);
                    setScriptDescription(response.data.scriptDescription);
                    setScriptLocation(response.data.location);
                    setScriptDate(response.data.date);
                    setBlocks(response.data.blocks || []);
                }
            } catch (error) {
                console.error("Error fetching script:", error);
            }
        };

        getScriptData();
    }, [id]);

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
            <div className={styles.blockList}>
                {blocks.map((block, blockIndex) => (
                    <ScriptBlock
                        key={blockIndex}
                        block={block}
                        onAddSubBlock={() => addSubBlock(blockIndex)}
                        onUpdateBlock={(updatedBlock) => {
                            const updatedBlocks = [...blocks];
                            updatedBlocks[blockIndex] = updatedBlock;
                            setBlocks(updatedBlocks);
                        }}
                    />
                ))}
            </div>
            <div className={styles.bottomBtns}>
                <div className={styles.addBlock} onClick={saveChanges}>
                    Сохранить изменения
                </div>
                <div className={styles.addBlock} onClick={addBlock}>
                    Добавить блок
                </div>
                <div className={styles.btnToDoc} onClick={generateDocx}>
                    В монтажный лист
                </div>
            </div>
        </div>
    )
}

export default memo(Main);