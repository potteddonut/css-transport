import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link className={styles.navitem} href="/">Home</Link>
            <Link className={styles.navitem} href="/">Bus Arrival Information</Link>
            <Link className={styles.navitem} href="/">Realtime traffic map</Link>
            <Link className={styles.navitem} href="/">Parking space availability map</Link>
            <Link className={styles.navitem} href="./causeway">Causeway Traffic Feed</Link>
        </nav>
    );
}
