import { useEffect } from "react";
import { generate } from "random-words";
import styles from "./text.module.css";
import useStore from "../../store/useInput";

const Text = () => {
    const setDisplayText = useStore((state) => state.setDisplayText);
    const displayText = useStore((state) => state.displayText);

    useEffect(() => {
        const generatedText = generate(20).join(' ');
        setDisplayText(generatedText); 
    }, [setDisplayText]);

    return (
        <div className={styles.field}>
        </div>
    )
}

export default Text;