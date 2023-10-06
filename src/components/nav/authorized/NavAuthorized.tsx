import Link from 'next/link';
import {FC} from 'react';
import styles from './NavAuthorized.module.css';

interface INavAuthorizedProps {}

const NavAuthorized: FC<INavAuthorizedProps> = () => {
    return (
        <nav className={styles.nav}>
            <p>Is authorized</p>
            <Link href={'/logout'}>Logout</Link>
        </nav>
    );
};

export default NavAuthorized;
