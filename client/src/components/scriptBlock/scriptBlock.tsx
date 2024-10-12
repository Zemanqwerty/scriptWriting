// ScriptBlock.tsx
import React, { FC, memo, useState } from "react";
import styles from './scriptBlock.module.css'
import ScriptSubBlock from "../scriptSubBlock";
import { SubBlock } from "../../models/subBlock";
import { Block } from "../../models/block";

interface ScriptBlockProps {
    block: Block;
    onAddSubBlock: () => void;
    onUpdateBlock: (updatedBlock: Block) => void;
}

const ScriptBlock: FC<ScriptBlockProps> = ({ block, onAddSubBlock, onUpdateBlock }) => {
    const [blockTitle, setBlockName] = useState(block.blockTitle);

    const handleBlockNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newBlockName = e.target.value;
        setBlockName(newBlockName);
        onUpdateBlock({ ...block, blockTitle: newBlockName });
    };

    return (
        <div className={styles.block}>
            <div className={styles.blockTitle}>
                <div className={styles.blockTitleText}>
                    Название бока
                </div>
                <input type="text" className={styles.blockNameInput} value={blockTitle} onChange={handleBlockNameChange} />
            </div>
            <div className={styles.subBlocksList}>
                {block.subBlocks.map((subBlock, subBlockIndex) => (
                    <ScriptSubBlock
                        key={subBlockIndex}
                        subBlock={subBlock}
                        onUpdateSubBlock={(updatedSubBlock) => {
                            const updatedSubBlocks = [...block.subBlocks];
                            updatedSubBlocks[subBlockIndex] = updatedSubBlock;
                            onUpdateBlock({ ...block, subBlocks: updatedSubBlocks });
                        }}
                    />
                ))}
            </div>
            <div className={styles.bottomMenu}>
                <div className={styles.addSubBlock} onClick={onAddSubBlock}>
                    Добавить подблок
                </div>
            </div>
        </div>
    )
}

export default memo(ScriptBlock);