import { useEffect, useRef } from "react";
import useStore from "../../store/useInput";
import styles from "./input.module.css";

const Input = () => {
    const inputText = useStore((state) => state.inputText);
    const setInputText = useStore((state) => state.setInputText);
    const displayText = useStore((state) => state.displayText);
    const wordCount = useStore((state) => state.wordCount);
    const incrementWordCount = useStore((state) => state.incrementWordCount);

    const inputRef = useRef(null);

    useEffect(() => {
        // Автоматически фокусируемся на скрытом input при загрузке компонента
        inputRef.current.focus();
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;

        if (value.endsWith(' ')) {
            incrementWordCount(); // Увеличиваем счетчик слов при вводе пробела
        }

        setInputText(value);
    };

    const handleClick = () => {
        // Фокусируемся на скрытом input при клике на любом месте компонента
        inputRef.current.focus();
    };

    const renderTextWithHighlight = () => {
        return displayText.split('').map((char, index) => {
            let color = 'black';
            let textDecoration = 'none';

            if (inputText[index]) {
                color = inputText[index] === char ? 'green' : 'red';
            }

            if (index === inputText.length) {
                textDecoration = 'underline';
            }

            return (
                <span
                    key={index}
                    style={{ color, textDecoration }}
                >
                    {char}
                </span>
            );
        });
    };

    return (
        <div className={styles.input} onClick={handleClick}> {/* Клик по компоненту фокусирует инпут */}
            <div className={styles.wordCount}>Счетчик слов: {wordCount}</div> {/* Счетчик слов */}
            <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={handleChange}
                className={styles.hiddenInput} // Применяем скрытие через CSS
            />
            <div className={styles.display}>{renderTextWithHighlight()}</div> {/* Отображение текста с подсветкой и подчеркиванием */}
        </div>
    )
}

export default Input;