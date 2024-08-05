import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useEffect, useReducer, useRef } from 'react';
import { formReducer, INITIAL_STATE } from './JournalForm.state';

function JournalForm({onSubmit}) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();

	const focusError = (isValid) => {
		switch(true) {
		case !isValid.post:
			postRef.current.focus();
			break;
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.post || ! !isValid.title) {
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({type: 'RESET_VALIDITY'});
			}, 2000);
		}

		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({type: 'CLEAR'});
		}
	}, [isFormReadyToSubmit, onSubmit, values]);

	const onChange = (e) => {
		dispatchForm({type: 'SET_VALUE', payload: {[e.target.name]: e.target.value}});
	};

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({type: 'SUBMIT'});
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>	
			<div>
				<input type='text' name='title' ref={titleRef} onChange={onChange} value={values.title} className={`${styles['input']} ${isValid.title ? '' : styles['invalid']}`}></input>		
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src='calendar.svg' alt='Иконка календаря'></img>
					<span>Дата</span>
				</label>
				<input type='date' name='date' id="date" ref={dateRef} onChange={onChange} value={values.date} className={`${styles['input']} ${isValid.date ? '' : styles['invalid']}`}/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src='folder.svg' alt='Иконка папки'></img>
					<span>Метки</span>
				</label>
				<input type='text' name='tag' id="tag" onChange={onChange} value={values.tag} className={styles['input']}/>
			</div>
			<textarea name='post' id='' cols={30} rows={10} ref={postRef} onChange={onChange} value={values.post} className={`${styles['input']} ${isValid.post ? '' : styles['invalid']}`}></textarea>
			<Button text={'Сохранить'}></Button>
		</form>
		
	);
}

export default JournalForm;