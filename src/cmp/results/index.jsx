import useStore from "../../store/useStore";
import styles from "./results.module.css";

const Results = () => {
    const wpm = useStore((state) => state.wpm); 
    const cpm = useStore((state) => state.cpm);
    const incorrectCount = useStore((state) => state.incorrectCount);
    const reset = useStore((state) => state.reset);

    const handleRestart = () => {
        reset(); // сбрасываем состояние и начинаем заново
    };

    // отрисовываем экран результатов
    return (
        <div className={styles.results}>
            <div className={styles.container}>
                <div className={styles.result}>
                    {wpm}
                    <p className={styles.title}>wpm</p>
                </div>
                <div className={styles.result}>
                    {cpm}
                    <p className={styles.title}>cpm</p>
                </div>
                <div className={styles.result}>
                    {incorrectCount}
                    <p className={styles.title}>err</p>
                </div>
            </div>
            <button className={styles.btn} onClick={handleRestart}>try again</button>
        </div>
    );
}

export default Results;