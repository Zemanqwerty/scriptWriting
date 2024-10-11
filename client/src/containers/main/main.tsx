import React, { FC, memo, useState } from "react";
import styles from './main.module.css'
import ScriptBlock from "../../components/scriptBlock";


const Main: FC = () => {

    const [blocks, setBlocks] = useState<React.ReactElement[]>([<ScriptBlock />]);
    
    const [scriptTitle, setScriptTitle] = useState('');

    const addBlock = () => {
        const newBlock = <ScriptBlock />;
        setBlocks([...blocks, newBlock]);
    };

    return (
        <div className={styles.main}>
            <div className={styles.scriptTitle}>
                <div className={styles.scriptTitleText}>
                    Название сценария
                </div>
                <input className={styles.scriptNameInput} type="text" value={scriptTitle} onChange={(e) => setScriptTitle(e.target.value)} />
            </div>
            <div className={styles.blockList}>
                {blocks.map((block, index) => {
                    return (
                        <div className={styles.subBlocksEl}>
                            {block}
                        </div>
                    )
                })}
            </div>
            <div className={styles.bottomBtns}>
                <div className={styles.addBlock} onClick={addBlock}>
                    Добавить блок
                </div>
                <div className={styles.btnToDoc}>
                    В монтажный лист
                </div>
            </div>
        </div>
    )
}

export default memo(Main);