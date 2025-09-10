import React from 'react';
import './index.css';
import { TextField, type TextFieldVariants } from '@mui/material';

interface InputProps {
    name?: string;
    type?: string | 'text';
    size?: 'small' | 'medium';
    variant?: TextFieldVariants | undefined;
    value: string | number | undefined;
    placeholder?: string | '';
    onChange: (value: any) => void;
}

export const Field = (props: InputProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event);
    };
    return (
        <TextField
            size={props.size}
            variant={props.variant}
            type={props.type}
            value={props.value}
            name={props.name}
            placeholder={props.placeholder}
            onChange={props.onChange}
        />
    );
};
