import {StaticImport} from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React, {FC} from 'react';

interface ILinkAppProps {
	image: StaticImport;
}

const LinkApp: FC<ILinkAppProps> = ({image}) => {
	return <Image src={image} alt="app" />;
};

export default LinkApp;
