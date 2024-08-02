import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useState } from 'react';

function JournalForm({onSubmit}) {
	const [formValidState, setFormValidState] = useState({
		title: true,
		post: true,
		date: true
	});

	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		let isFormValid = true;
		if (!formProps.title?.trim().length) {
			setFormValidState(state => ({...state, title: false}));
			isFormValid = false;
		} else {
			setFormValidState(state => ({...state, title: true}));
		}
		if (!formProps.post?.trim().length) {
			setFormValidState(state => ({...state, post: false}));
			isFormValid = false;
		} else {
			setFormValidState(state => ({...state, post: true}));
		}
		if (!formProps.date) {
			setFormValidState(state => ({...state, date: false}));
			isFormValid = false;
		} else {
			setFormValidState(state => ({...state, date: true}));
		}
		if (!isFormValid) {
			return;
		}
		onSubmit(formProps);
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>	
			<div>
				<input type='text' name='title' className={`${styles['input']} ${formValidState.title ? '' : styles['invalid']}`}></input>		
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src='calendar.svg' alt='Иконка календаря'></img>
					<span>Дата</span>
				</label>
				<input type='date' name='date' id="date" className={`${styles['input']} ${formValidState.date ? '' : styles['invalid']}`}/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src='folder.svg' alt='Иконка папки'></img>
					<span>Метки</span>
				</label>
				<input type='text' name='tag' id="tag" className={styles['input']}/>
			</div>
			<textarea name='post' id='' cols={30} rows={10} className={`${styles['input']} ${formValidState.post ? '' : styles['invalid']}`}></textarea>
			<Button text={'Сохранить'}></Button>
		</form>
		
	);
}

export default JournalForm;