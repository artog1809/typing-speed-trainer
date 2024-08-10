import create from 'zustand';

// Создаем Zustand хранилище
const useStore = create((set) => ({
    displayText: '',
    inputText: '',
    wordCount: 0,
    setDisplayText: (text) => set({ displayText: text }),
    setInputText: (text) => set({ inputText: text }),
    incrementWordCount: () => set((state) => ({ wordCount: state.wordCount + 1 })),
    resetWordCount: () => set({ wordCount: 0 }),
}));

export default useStore;