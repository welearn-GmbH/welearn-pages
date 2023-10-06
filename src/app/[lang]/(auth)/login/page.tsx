'use client';

import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {ChangeEvent, FC, FormEvent} from 'react';
import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import Button from '../../../../components/shared/button/Button';
import Input from '../../../../components/shared/input/Input';
import {AuthService} from '../../../../services/auth/auth.service';
import styles from './page.module.css';

interface ILoginStore {
    username: string;
    password: string;
    usernameChanged: (value: ChangeEvent<HTMLInputElement>) => void;
    passwordChanged: (value: ChangeEvent<HTMLInputElement>) => void;
}

const useLoginStore = create(
    immer<ILoginStore>(set => ({
        username: '',
        password: '',
        usernameChanged: (e: ChangeEvent<HTMLInputElement>) =>
            set(state => {
                state.username = e.currentTarget.value;
            }),
        passwordChanged: (e: ChangeEvent<HTMLInputElement>) =>
            set(state => {
                state.password = e.currentTarget.value;
            }),
    })),
);

const LoginPage: FC = () => {
    const {password, passwordChanged, usernameChanged, username} =
        useLoginStore();

    const router = useRouter();

    const {isError, error, isLoading, isSuccess, mutate} = useMutation({
        mutationFn: () => {
            return AuthService.login({username, password});
        },
        onSuccess: () => {
            router.push('/');
        },
    });

    const login = async (e: FormEvent) => {
        e.preventDefault();
        mutate();
    };

    return (
        <form className={styles.form} onSubmit={login}>
            <Input
                value={username}
                onChange={usernameChanged}
                placeholder="Email"
            />
            <Input
                value={password}
                onChange={passwordChanged}
                placeholder="Password"
                type="password"
            />
            {isError && (
                <div>
                    <p>ERROR:</p>
                </div>
            )}
            <Button isLoading={isLoading || isSuccess} type="submit">
                Login
            </Button>
        </form>
    );
};

export default LoginPage;
