import classNames from 'classnames';
import {DetailedHTMLProps, FC, InputHTMLAttributes} from 'react';
import styles from './Input.module.css';

interface IInputProps
    extends Pick<
        DetailedHTMLProps<
            InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >,
        'value' | 'onChange' | 'style' | 'className' | 'placeholder' | 'type'
    > {}

const Input: FC<IInputProps> = ({className, ...rest}) => {
    return <input className={classNames(styles.input, className)} {...rest} />;
};

export default Input;
