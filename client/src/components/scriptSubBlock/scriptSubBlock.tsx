import React, { FC, memo, useState } from "react";
import styles from './scriptSubBlock.module.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Импорт стилей


const ScriptSubBlock: FC = () => {
    const [time, setTime] = useState('');
    const [action, setAction] = useState('');
    const [sound, setSound] = useState('');
    const [light, setLight] = useState('')
    const [videoMain, setVideoMain] = useState('');
    const [videoSecond, setVideoSecond] = useState('');
    const [note, setNote] = useState('');

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

    return (
        <div className={styles.scriptBlock}>
            <div className={styles.valueBlock}>
                <div className={styles.valueNote}>
                    Время
                </div>
                <input type="text" className={styles.smallTextInput} value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <div className={styles.valueBlock}>
                <div className={styles.valueNote}>
                    Действие
                </div>
                <ReactQuill className={styles.actionField} theme="snow" value={action} onChange={setAction}  modules={modules} formats={formats} />
            </div>
            <div className={styles.valueBlock}>
                <div className={styles.valueNote}>
                    Звук
                </div>
                <textarea className={styles.textInput} value={sound} onChange={(e) => setSound(e.target.value)} />
            </div>
            <div className={styles.valueBlock}>
                <div className={styles.valueNote}>
                    Свет
                </div>
                <textarea className={styles.textInput} value={light} onChange={(e) => setLight(e.target.value)} />
            </div>
            <div className={styles.valueBlock}>
                <div className={styles.valueNote}>
                    Видео (центральный экран)
                </div>
                <textarea className={styles.textInput} value={videoMain} onChange={(e) => setVideoMain(e.target.value)} />
            </div>
            <div className={styles.valueBlock}>
                <div className={styles.valueNote}>
                    Видео (боковые экраны)
                </div>
                <textarea className={styles.textInput} value={videoSecond} onChange={(e) => setVideoSecond(e.target.value)} />
            </div>
            <div className={styles.valueBlock}>
                <div className={styles.valueNote}>
                    Примечание
                </div>
                <textarea className={styles.textInput} value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
        </div>
    )
}

export default memo(ScriptSubBlock);