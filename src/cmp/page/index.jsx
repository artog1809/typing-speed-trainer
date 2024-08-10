import styles from "./page.module.css"
import Header from "../header"
import Text  from "../text"
import Input from "../input"

const Page = () => { 

    return (
        <div className={styles.page}>
            <Header />
            <Text />
            <Input />
        </div>
    )
  

}

export default Page;