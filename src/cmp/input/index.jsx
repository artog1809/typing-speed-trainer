import useStore from "../../store/useStore";
import styles from "./input.module.css";

const Input = () => {
    const inputText = useStore((state) => state.inputText);
    const setInputText = useStore((state) => state.setInputText);
    const displayText = useStore((state) => state.displayText);
    const wordCount = useStore((state) => state.wordCount);
    const incrementWordCount = useStore((state) => state.incrementWordCount);
    const resetWordCount = useStore((state) => state.resetWordCount);

    const handleChange = (e) => {
        const value = e.target.value;

        if (value.endsWith(' ')) {
            incrementWordCount(); // Увеличиваем счетчик слов при вводе пробела
        }

        setInputText(value);
    };

    const renderTextWithHighlight = () => {
        return displayText.split('').map((char, index) => {
            const color = inputText[index] === char ? 'green' : inputText[index] ? 'red' : 'black';
            return <span key={index} style={{ color }}>{char}</span>;
        });
    };

    return (
        <div className={styles.input}>
            <div className={styles.wordCount}>Счетчик слов: {wordCount}</div> {/* Добавили счетчик слов */}
            <div className={styles.form}>
                <input
                    style={{ backgroundColor: 'white' }}
                    type="text"
                    value={inputText}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.display}>{renderTextWithHighlight()}</div> {/* Отображаем только введенный текст */}
        </div>
    )
}

export default Input;