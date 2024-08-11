import useStore from "../../store/useStore";
import styles from "./results.module.css";

const Results = () => {
    const wpm = useStore((state) => state.wpm); 
    const cpm = useStore((state) => state.cpm);
    const acc = useStore((state) => state.acc);
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
                    <p className={styles.title}>WPM</p>
                </div>
                <div className={styles.result}>
                    {cpm}
                    <p className={styles.title}>CPM</p>
                </div>
                <div className={styles.result}>
                    {acc}%
                    <p className={styles.title}>ACC</p>
                </div>
            </div>
            <button className={styles.btn} onClick={handleRestart}>try again</button>
        </div>
    );
}

export default Results;