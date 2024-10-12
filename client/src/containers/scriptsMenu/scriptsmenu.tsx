import React, { FC, useEffect, useState } from "react";
import styles from './scriptsMenu.module.css';
import { Script } from "../../models/script";
import ScriptService from "../../service/scriptService";
import { Link } from "react-router-dom";

const ScriptsMenu: FC = () => {
    const [scriptsList, setScriptsList] = useState<Script[]>([]);

    useEffect(() => {
        const getAllScripts = async () => {
            try {
                const response = await ScriptService.getAllScripts();
                // Убедитесь, что response.data действительно массив объектов CreateScript
                if (Array.isArray(response.data)) {
                    setScriptsList(response.data);
                } else {
                    console.error("Expected an array of CreateScript, but got:", response.data);
                }
            } catch (error) {
                console.error("Error fetching scripts:", error);
            }
        };

        getAllScripts();
    }, []);

    return (
        <div className={styles.menu}>
            {/* Здесь вы можете отобразить список скриптов */}
            {scriptsList.map((script, index) => (
                <h3 className={styles.menuEl} key={index}>
                    <Link className={styles.elLink} to={`/${script.id}`}>{script.scriptTitle}</Link>
                </h3>
            ))}
            <Link className={styles.createNew} to={`/`}>Создать новый</Link>
        </div>
    );
};

export default ScriptsMenu;