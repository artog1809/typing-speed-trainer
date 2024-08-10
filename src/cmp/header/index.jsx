import styles from "./header.module.css"

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.left}>Typing Speed Trainer</div>
            <div className={styles.right}>
                <span>words</span>
                <span>20 30 40 50</span>
            </div>            
        </div>
    )
}

export default Header;