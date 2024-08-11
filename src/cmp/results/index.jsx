import useStore from "../../store/useInput";
import styles from "./results.module.css";

const Results = () => {
    const wpm = useStore((state) => state.wpm);
    const incorrectCount = useStore((state) => state.incorrectCount);
    const reset = useStore((state) => state.reset);

    const handleRestart = () => {
        reset(); // Сбрасываем состояние и начинаем заново
    };

    return (
        <div className={styles.results}>
            <h1>Результаты</h1>
            <p>Скорость печати: {wpm} слов в минуту</p>
            <p>Количество неправильных символов: {incorrectCount}</p>
            <button onClick={handleRestart}>Начать заново</button>
        </div>
    );
}

export default Results;