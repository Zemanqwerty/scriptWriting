// ScriptSubBlock.tsx
import React, { FC, memo, useState } from "react";
import styles from './scriptSubBlock.module.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Импорт стилей
import { SubBlock } from "../../models/subBlock";

interface ScriptSubBlockProps {
    subBlock: SubBlock;
    onUpdateSubBlock: (updatedSubBlock: SubBlock) => void;
}

const ScriptSubBlock: FC<ScriptSubBlockProps> = ({ subBlock, onUpdateSubBlock }) => {
    const [time, setTime] = useState(subBlock.time);
    const [action, setAction] = useState(subBlock.action);
    const [sound, setSound] = useState(subBlock.sound);
    const [light, setLight] = useState(subBlock.light);
    const [videoMain, setVideoMain] = useState(subBlock.videoMain);
    const [videoSecond, setVideoSecond] = useState(subBlock.videoSecond);
    const [note, setNote] = useState(subBlock.note);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet',
        'link', 'image'
    ];

    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>, field: keyof SubBlock) => (value: string) => {
        setter(value);
        onUpdateSubBlock({ ...subBlock, [field]: value });
    };

    return (
        <div className={styles.scriptBlock}>
            <div className={styles.valueBlock}>
                <div className={styles.valueNote}>
                    Время
                </div>
                <input type="text" className={styles.smallTextInput} value={time} onChange={(e) => handleChange(setTime, 'time')(e.target.value)} />
            </div>
            <div className={styles.valueBlock}>
                <div className={styles.valueNote}>
                    Действие
                </div>
                <ReactQuill className={styles.actionField} theme="snow" value={action} onChange={handleChange(setAction, 'action')} modules={modules} formats={formats} />
            </div>
            <div className={styles.valueBlock}>
                <div className={styles.valueNote}>
                    Звук
                </div>
                <textarea className={styles.textInput} value={sound} onChange={(e) => handleChange(setSound, 'sound')(e.target.value)} />
            </div>
            <div className={styles.valueBlock}>
                <div className={styles.valueNote}>
                    Свет
                </div>
                <textarea className={styles.textInput} value={light} onChange={(e) => handleChange(setLight, 'light')(e.target.value)} />
            </div>
            <div className={styles.valueBlock}>
                <div className={styles.valueNote}>
                    Видео (центральный экран)
                </div>
                <textarea className={styles.textInput} value={videoMain} onChange={(e) => handleChange(setVideoMain, 'videoMain')(e.target.value)} />
            </div>
            <div className={styles.valueBlock}>
                <div className={styles.valueNote}>
                    Видео (боковые экраны)
                </div>
                <textarea className={styles.textInput} value={videoSecond} onChange={(e) => handleChange(setVideoSecond, 'videoSecond')(e.target.value)} />
            </div>
            <div className={styles.valueBlock}>
                <div className={styles.valueNote}>
                    Примечание
                </div>
                <textarea className={styles.textInput} value={note} onChange={(e) => handleChange(setNote, 'note')(e.target.value)} />
            </div>
        </div>
    )
}

export default memo(ScriptSubBlock);