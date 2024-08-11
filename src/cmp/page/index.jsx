import styles from "./page.module.css"
import Header from "../header"
import Input from "../input"
import useStore from "../../store/useStore"
import Results from "../results"

const Page = () => { 
    
    const screen = useStore((state) => state.screen);

    return (
        <div className={styles.page}>
            <Header />
            {/* <Text /> */}
            {screen === 'typing' ? <Input /> : <Results />}

        </div>
    )
  

}

export default Page;