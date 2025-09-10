import React from 'react';
import { loginSchema, type LoginSchema } from './index.config';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField, Link } from '@mui/material';

const LoginPage = () => {
    const {
        control,
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            login: '',
            password: '',
        },
    });

    const handleLogin = () => {
        console.log(getValues('login'));
        console.log(getValues('password'));
    };
    const handleForm = () => {};
    return (
        <main className='box-border flex flex-col justify-center w-full px-3 h-screen'>
            <div className='box-border w-full h-full flex flex-col pt-12 items-center'>
                <div className='box-border max-w-[500px] w-full h-auto flex flex-col items-start px-3 gap-6'>
                    <h2 className='text-4xl w-auto font-bold text-neutral-800 mx-0 my-0'>
                        Авторизация
                    </h2>
                    <span className='text-base w-auto font-normal text-gray-800'>
                        Введите учетные данные для входа в систему
                    </span>
                    <form
                        className='box-border flex flex-col max-w-md w-full gap-y-6'
                        onSubmit={handleSubmit(handleForm)}
                    >
                        <Controller
                            name='login'
                            control={control}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    size='small'
                                    label='Логин'
                                    inputRef={ref}
                                    fullWidth
                                    error={!!errors.login}
                                    helperText={errors.login?.message}
                                />
                            )}
                        />
                        <Controller
                            name='password'
                            control={control}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    size='small'
                                    type='password'
                                    label='Пароль'
                                    inputRef={ref}
                                    fullWidth
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            )}
                        />
                        <Link className='w-full flex justify-center'>
                            <span className='mx-auto cursor-pointer'>Создать аккаунт</span>
                        </Link>
                        <Button type='submit' variant='contained' onClick={handleLogin}>
                            Войти
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;
