import {StaticImport} from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React, {FC} from 'react';
import styles from './linkSocial.module.css';

interface ILinkSocialProps {
	image: StaticImport;
}

const LinkSocial: FC<ILinkSocialProps> = ({image}) => {
	return (
		<a href="" className={styles.social}>
			<Image src={image} alt="social" />
		</a>
	);
};

export default LinkSocial;
