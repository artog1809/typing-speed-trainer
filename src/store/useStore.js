import create from 'zustand';
import { generate } from 'random-words'; // Импорт функции для генерации случайных слов

// Создаем Zustand хранилище
const useStore = create((set) => ({
    words: 20,
    displayText: generate(20).join(' '),
    inputText: '',
    wordCount: 0,
    incorrectCount: 0,
    characters: 0,
    cpm: 0,
    wpm: 0,
    acc: 0,
    screen: 'typing',


    setWords: (count) => set({ words: count }),
    setCharacters: (count) => set({ characters: count }),
    setDisplayText: (text) => set({ displayText: text }),
    setInputText: (text) => set({ inputText: text }),
    incrementWordCount: () => set((state) => ({ wordCount: state.wordCount + 1 })),
    incrementIncorrectCount: () => set((state) => ({ incorrectCount: state.incorrectCount + 1 })),
    setWpm: (wpm) => set({ wpm }),
    setCpm: (cpm) => set({ cpm }),
    setAcc: (acc) => set({ acc }),
    setScreen: (screen) => set({ screen }),


    reset: () => set({
        inputText: '',
        wordCount: 0,
        incorrectCount: 0,
        wpm: 0,
        cpm: 0,
        acc: 0,
        screen: 'typing',
    }),
}));

export default useStore;