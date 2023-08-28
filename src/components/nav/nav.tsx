import Image from 'next/image';
import Link from 'next/link';
import {FC} from 'react';
import wedogLogo from '../../../public/images/wedog.svg';
import Button from '../shared/button/button';
import Menu from './menu/menu';
import styles from './nav.module.css';

const Nav: FC = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.inner}>
                <Image
                    src={wedogLogo}
                    alt="wedog logo"
                    className={styles.logo}
                />
                <div className={styles.links}>
                    <Link className={styles.link} href="">
                        Kurse
                    </Link>
                    <Link className={styles.link} href="">
                        Trainer
                    </Link>
                    <Link className={styles.link} href="">
                        Gratis-Wissen
                    </Link>
                    <div className={styles.separator} />
                    <Link className={styles.link} href="">
                        Einloggen
                    </Link>
                    <Button>Jetzt kostenlos testen</Button>
                </div>

                <Menu />
            </div>
        </nav>
    );
};

export default Nav;
