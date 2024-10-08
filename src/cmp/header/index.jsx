import styles from "./header.module.css"
import useStore from "../../store/useStore";
import { generate } from 'random-words';
import { useEffect } from "react";


const Header = () => {

    const { words, setWords, setDisplayText, reset, setCharacters, displayText } = useStore(state => ({
        words: state.words,
        setWords: state.setWords,
        displayText: state.displayText,
        setCharacters: state.setCharacters,
        setDisplayText: state.setDisplayText,
        reset: state.reset,
    }));

    // получить количество символов в тексте
    useEffect(() => {
        setCharacters(displayText.length);
    }, [displayText])
    

    // изменить количество символов в тексте
    const handleWordCountChange = (count) => {
        setWords(count);
        const newText = generate(count).join(' ');
        setCharacters(newText.length);
        reset();
        setDisplayText(newText);
    };

    return (
        <div className={styles.header}>
            <div className={styles.left}>Typing Test</div>
            <div className={styles.right}>
                <span>words</span>
                <span>
                { [10, 20, 30, 40, ].map(count => (
                        <button
                            key={count}
                            className={count === words ? styles.active : ''}
                            onClick={() => handleWordCountChange(count)}
                        >
                            {count} &nbsp;
                        </button>
                )) }
                </span>
            </div>            
        </div>
    )
}

export default Header;