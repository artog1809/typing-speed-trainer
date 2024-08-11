import { useEffect, useRef } from "react";
import useStore from "../../store/useInput";
import styles from "./input.module.css";

const Input = () => {
    const inputText = useStore((state) => state.inputText);
    const setInputText = useStore((state) => state.setInputText);
    const displayText = useStore((state) => state.displayText);
    const wordCount = useStore((state) => state.wordCount);
    const incrementWordCount = useStore((state) => state.incrementWordCount);
    const incrementIncorrectCount = useStore((state) => state.incrementIncorrectCount);
    const setScreen = useStore((state) => state.setScreen);
    const setWpm = useStore((state) => state.setWpm);

    const inputRef = useRef(null);
    const startTimeRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
        startTimeRef.current = new Date(); // Устанавливаем стартовое время
    }, []);

    const handleChange = (e) => {
        const newInputText = e.target.value;

        
        if (newInputText.length > 0 && newInputText[newInputText.length - 1] === ' ' && (inputText[inputText.length - 1] === ' ' || newInputText.length === 1)) {
            return; 
        }

        setInputText(newInputText);

        if (newInputText.length >= displayText.length) {
            const endTime = new Date();
            const timeTakenInSeconds = (endTime - startTimeRef.current) / 1000;
            const wpm = (wordCount / timeTakenInSeconds) * 60;
            setWpm(Math.round(wpm));
            setScreen('results'); 
            return; 
        }

        const trimmedInput = newInputText.trim();
        const words = trimmedInput.split(' ');
        const currentWordIndex = words.length - 1;

        const currentWord = words[currentWordIndex] || '';
        const correctWord = displayText.split(' ')[currentWordIndex] || '';

        if (newInputText.endsWith(' ')) {
            if (currentWord !== correctWord) {
                incrementIncorrectCount(); 
            }
            incrementWordCount(); 
        }
    };

    const handleClick = () => {
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
        <div className={styles.input} onClick={handleClick}>
            <div className={styles.wordCount}>Счетчик слов: {wordCount}</div>
            <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={handleChange}
                className={styles.hiddenInput}
            />
            <div className={styles.display}>{renderTextWithHighlight()}</div>
        </div>
    );
};

export default Input;