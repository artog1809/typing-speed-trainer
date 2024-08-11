import { useRef, useState } from "react";
import useStore from "../../store/useStore";
import styles from "./input.module.css";

const Input = () => {
    const inputText = useStore((state) => state.inputText);
    const setInputText = useStore((state) => state.setInputText);
    const displayText = useStore((state) => state.displayText);
    const wordCount = useStore((state) => state.wordCount);
    const chars = useStore((state) => state.characters);
    const incrementWordCount = useStore((state) => state.incrementWordCount);
    const incrementIncorrectCount = useStore((state) => state.incrementIncorrectCount);
    const setScreen = useStore((state) => state.setScreen);
    const setWpm = useStore((state) => state.setWpm);
    const setCpm = useStore((state) => state.setCpm);
    const words = useStore((state) => state.words);
    const refresh = useStore((state) => state.refresh);

    const inputRef = useRef(null);
    const startTimeRef = useRef(null);
    const [timerStarted, setTimerStarted] = useState(false); // состояние для таймера

    // запуск таймера
    const handleStartTimer = () => {
        if (!timerStarted) {
            startTimeRef.current = new Date(); 
            setTimerStarted(true);
            console.log('Timer started');
        }
    };

    const handleChange = (e) => {
        handleStartTimer();
        
        const newInputText = e.target.value;

        // запрет стирать символы
        if (newInputText.length < inputText.length) {
            return;
        }

        // текущий введенный символ
        const currentChar = newInputText[newInputText.length - 1];

        // ожидаемый символ
        const expectedChar = displayText[newInputText.length - 1];

        // проверка, является ли текущий символ буквой
        const isLetter = /^[a-zA-Z]$/.test(currentChar);

        const isSpace = currentChar === ' ';

        // если ожидаемый символ - буква, но пользователь ввел не букву, отменяем ввод
        if (/[a-zA-Z]/.test(expectedChar) && !isLetter) {
            return;
        }

        // если ожидаевы символ - пробел, но пользователь ввел не пробел, отменяем ввод
        if (expectedChar === ' ' && !isSpace) {
            return;
        }

        if (currentChar !== expectedChar) {
            incrementIncorrectCount(); // увеличиваем счетчик неправильных символов
        }

        // записываем введенный текст в стейт
        setInputText(newInputText);


        // если длина текста больше или равно длине ожидаемого текста то закончит ввод и высчитать метрики
        if (newInputText.length >= displayText.length) {
            const endTime = new Date();
            const timeTakenInSeconds = (endTime - startTimeRef.current) / 1000;
            console.log(timeTakenInSeconds, 's')
            const cpm = (chars / timeTakenInSeconds) * 60;
            const wpm = (wordCount / timeTakenInSeconds) * 60;
            setCpm(Math.round(cpm));
            setWpm(Math.round(wpm));
            setScreen('results'); 
            return; 
        }

        if (newInputText.endsWith(' ')) {
            incrementWordCount(); 
        }
    };

    // поймать фокус пользователя
    const handleClick = () => {
        inputRef.current.focus();
    };


    // выделение текста на экране в зависимости от ввода пользователя
    const renderTextWithHighlight = () => {
        return displayText.split('').map((char, index) => {
            let color = '#70829d';
            let textDecoration = 'none';

            if (inputText[index]) {
                color = inputText[index] === char ? '#ced8fb' : 'red';
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
            <div className={styles.header}>
                <div className={styles.wordCount}>{wordCount} / {words}</div>
                <img onClick={refresh} className={styles.refresh} src="src/icons/refresh.svg" />
            </div>
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