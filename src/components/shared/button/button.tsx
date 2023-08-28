import React, {FC, PropsWithChildren} from 'react';
import styles from './button.module.css';

interface IButtonProps extends PropsWithChildren {}

const Button: FC<IButtonProps> = ({children}) => {
	return <button className={styles.button}>{children}</button>;
};

export default Button;
