import './App.css';
import JournalItem from './components/JournalItem/JournalItem';
import CardButton from './components/CardButton/CardButton';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useEffect, useState } from 'react';

function App() {
	 const [items, setItems] = useState([]);

	 useEffect(() => {
		const data = JSON.parse(localStorage.getItem('data'));
		if (data) {
			setItems(data.map(item => ({
				...item,
				date: new Date(item.date)
			})));
		}
	 }, []);

	useEffect(() => {
		if (items.length !== 0) {
			localStorage.setItem('data', JSON.stringify(items));
		}
	 }, [items]);

	 const addItem = (item) => {
		setItems(oldItems=> [...oldItems, {
			post: item.post,
			title: item.title,
			date: new Date(item.date),
			id: oldItems.length > 0 ? Math.max(...oldItems.map(i => i.id)) + 1 : 1
		}] );
	 };

	 const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	 };

	 let list = <p>Записей пока нет, добавьте первую</p>;
	 if (items.length > 0) {
		list = items.sort(sortItems).map(el => (
			<CardButton key={el.id}>
				<JournalItem
					title={el.title}
					post={el.post}
					date={el.date}
				></JournalItem>
			</CardButton>));
	 }

	return (
		<div className='app'>
			<LeftPanel>
				<Header></Header>
				<JournalAddButton></JournalAddButton>
				<JournalList>
					{list}
				</JournalList>
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItem}></JournalForm>
			</Body>
		</div>
	);
}

export default App;
