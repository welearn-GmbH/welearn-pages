import Link from 'next/link';
import {FC} from 'react';
import styles from './NavGuest.module.css';

interface INavGuestProps {}

const NavGuest: FC<INavGuestProps> = () => {
    return (
        <nav className={styles.nav}>
            <p>Is authorized</p>
            <Link href={'/logout'}>Logout</Link>
        </nav>
    );
};

export default NavGuest;
