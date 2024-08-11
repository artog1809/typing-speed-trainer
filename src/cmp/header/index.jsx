import styles from "./header.module.css"
import useStore from "../../store/useStore";
import { generate } from 'random-words';


const Header = () => {

    const { words, setWords, setDisplayText, reset } = useStore(state => ({
        words: state.words,
        setWords: state.setWords,
        setDisplayText: state.setDisplayText,
        reset: state.reset,
    }));

    const handleWordCountChange = (count) => {
        setWords(count);
        // Generate new text based on the selected word count
        const newText = generate(count).join(' ');
        reset();
        setDisplayText(newText);
    };

    return (
        <div className={styles.header}>
            <div className={styles.left}>Typing Test</div>
            <div className={styles.right}>
                <span>words</span>
                <span>
                { [20, 30, 40, 50].map(count => (
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