import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useContext, useEffect, useReducer, useRef } from 'react';
import { formReducer, INITIAL_STATE } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function JournalForm({onSubmit}) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();
	const {userId} = useContext(UserContext);

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

	useEffect(() => {
		dispatchForm({type: 'SET_VALUE', payload: {userId}});
	}, [userId]);

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
				<Input type='text' name='title' ref={titleRef} onChange={onChange} isValid={isValid.title} value={values.title} appearence={'title'}/>	
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src='calendar.svg' alt='Иконка календаря'></img>
					<span>Дата</span>
				</label>
				<Input type='date' name='date' id="date" ref={dateRef} onChange={onChange} isValid={isValid.date} value={values.date}/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src='folder.svg' alt='Иконка папки'></img>
					<span>Метки</span>
				</label>
				<Input type='text' name='tag' id="tag" onChange={onChange} isValid={true} value={values.tag}/>
			</div>
			<textarea name='post' id='' cols={30} rows={10} ref={postRef} onChange={onChange} value={values.post} className={`${styles['input']} ${isValid.post ? '' : styles['invalid']}`}></textarea>
			<Button>Сохранить</Button>
		</form>
	);
}
			
export default JournalForm;