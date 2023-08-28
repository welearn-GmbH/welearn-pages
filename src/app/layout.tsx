import '../styles/reset.css';
import '../styles/globals.css';
import '../styles/theme.css';
import '../styles/typography.css';
import type {Metadata} from 'next';
import {Outfit, Open_Sans} from 'next/font/google';
import Nav from '../components/nav/nav';
import styles from './layout.module.css';
import classNames from 'classnames';
import Footer from '../components/footer/footer';

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
