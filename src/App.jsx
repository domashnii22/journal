import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { UseLocaleStorage } from './hooks/useLocalStorage';
import { UserContextProvider } from './context/user.context';
import { useState } from 'react';

function mapItems(items) {
	if (!items) {
		return [];
	}
	return items.map(i => ({
		...i,
		date: new Date(i.date)
	}));
}

function App() {
	const [items, setItems] = UseLocaleStorage('data');
	const [selectedItem, setSelectedItem] = useState(null);
	
	const addItem = item => {
		if (!item.id) {
			setItems([...mapItems(items), {
				...item,
				date: new Date(item.date),
				id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
			}]);
		} else {
			setItems([...mapItems(items).map(i => {
				if (i.id === item.id) {
					return {
						...item
					};
				}
				return i;
			})]);
		}
	};

	const deleteItem = (id) => {
		setItems([...items.filter(i => i.id !== id)]);
	};

	return (
		<UserContextProvider>
			<div className='app'>
				<LeftPanel>
					<Header></Header>
					<JournalAddButton clearForm={() => setSelectedItem(null)}></JournalAddButton>
					<JournalList items={mapItems(items)} setItem={setSelectedItem}/>
				</LeftPanel>
				<Body>
					<JournalForm onSubmit={addItem} onDelete={deleteItem} data={selectedItem}></JournalForm>
				</Body>
			</div>
		</UserContextProvider>


	);
}

export default App;
