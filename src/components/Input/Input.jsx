import { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(function Input({ isValid, appearence, ...props }, ref) {
	return (
		<input {...props} ref={ref} className={`${styles['input']}
        ${appearence === 'title' ? styles['input-title'] : ''} 
        ${isValid ? '' : styles['invalid']}`}/>
	);
});

export default Input;