import React, { FC, memo, useState } from "react";
import styles from './scriptBlock.module.css'
import ScriptSubBlock from "../scriptSubBlock";



const ScriptBlock: FC = () => {

    const [subBlocks, setSubBlocks] = useState<React.ReactElement[]>([<ScriptSubBlock />]);

    const [blockName, setBlockname] = useState('');

    const addSubBlock = () => {
        const newSubBlock = <ScriptSubBlock />;
        setSubBlocks([...subBlocks, newSubBlock]);
      };

    return (
        <div className={styles.block}>
            <div className={styles.blockTitle}>
                <div className={styles.blockTitleText}>
                    Название бока
                </div>
                <input type="text" className={styles.blockNameInput} value={blockName} onChange={(e) => setBlockname(e.target.value)} />
            </div>
            <div className={styles.subBlocksList}>
                {subBlocks.map((subBlock, index) => {
                    return (
                        <div className={styles.subBlocksEl}>
                            <div className={styles.subBlocksIndex}>
                                {index + 1}
                            </div>
                            {subBlock}
                        </div>
                    )
                })}
            </div>
            <div className={styles.bottomMenu}>
                <div className={styles.addSubBlock} onClick={addSubBlock}>
                    Добавить подблок
                </div>
            </div>
        </div>
    )
}

export default memo(ScriptBlock)