'use client';

import classNames from 'classnames';
import {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    FC,
    PropsWithChildren,
} from 'react';
import Spinner from '../spinner/Spinner';
import styles from './button.module.css';

type IButtonProps = Pick<
    DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >,
    'onClick' | 'type'
> &
    PropsWithChildren & {
        isLoading?: boolean;
    };

const Button: FC<IButtonProps> = ({
    children,
    type = 'button',
    isLoading,
    ...rest
}) => {
    return (
        <button className={styles.button} type={type} {...rest}>
            <div
                className={classNames(styles.buttonInner, {
                    [styles.buttonInnerHidden]: isLoading,
                })}
            >
                {children}
            </div>
            {isLoading && (
                <div className={styles.spinnerContainer}>
                    <Spinner size="s" className={styles.spinner} />
                </div>
            )}
        </button>
    );
};

export default Button;
