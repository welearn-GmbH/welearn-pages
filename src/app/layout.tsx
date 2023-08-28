import classNames from 'classnames';
import type {Metadata} from 'next';
import {Open_Sans, Outfit} from 'next/font/google';
import Footer from '../components/footer/footer';
import Nav from '../components/nav/nav';
import '../styles/globals.css';
import '../styles/reset.css';
import '../styles/theme.css';
import '../styles/typography.css';
import styles from './layout.module.css';

const outfit = Outfit({subsets: ['latin']});
const opensans = Open_Sans({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'wedog',
    description: 'wedog is awesome',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body className={classNames(outfit.className, opensans.className)}>
                <Nav />
                <main className={styles.main}>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
