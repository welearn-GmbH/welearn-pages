import Image from 'next/image';
import {FC} from 'react';
import menuLogo from '../../../../public/images/menu.svg';
import styles from './menu.module.css';

const Menu: FC = () => {
    return (
        <button id="menu" className={styles.menu}>
            <Image src={menuLogo} alt="M" />
        </button>
    );
};

export default Menu;
