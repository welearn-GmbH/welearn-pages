import classNames from 'classnames';
import {FC} from 'react';
import styles from './Spinner.module.css';

interface ISpinnerProps {
    size?: 's' | 'm' | 'l';
    className?: string;
}

const Spinner: FC<ISpinnerProps> = ({size = 's', className}) => {
    const heightWidth = {s: 24, m: 64, l: 128}[size];

    return (
        <div className={classNames(styles.container, className)}>
            <svg
                width={heightWidth}
                height={heightWidth}
                className={styles.svg}
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="50" cy="50" r="45" />
            </svg>
        </div>
    );
};

export default Spinner;
