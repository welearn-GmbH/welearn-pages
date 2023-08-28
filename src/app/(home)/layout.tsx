'use client';

import Link from 'next/link';
import {FC, PropsWithChildren} from 'react';
import Button from '../../components/shared/button/button';
import styles from './layout.module.css';

const HomeLayout: FC<PropsWithChildren> = ({children}) => {
    const cards = [1, 2, 3, 4, 5, 6];

    return (
        <div className={styles.cards}>
            {cards.map(card => (
                <div key={card} className={styles.card}>{card}</div>
            ))}
            <Link href={'/course/ayylmao'}>
                <Button>OPEN MODAL</Button>
            </Link>
            {children}
        </div>
    );
};

export default HomeLayout;
