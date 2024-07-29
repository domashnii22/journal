import './App.css';
import JournalItem from './components/JournalItem/JournalItem';
import CardButton from './components/CardButton/CardButton';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';

function App() {
	const data = [
		{
			title: 'Подготовка', 
			text: 'Горные походы',
			date: new Date()
		},
		{
			title: 'Подготовка2', 
			text: 'Горные походы2',
			date: new Date()
		}
	];

	return (
		<div className='app'>
			<LeftPanel>
				<Header></Header>
				<JournalAddButton></JournalAddButton>
				<JournalList>
					<CardButton>
						<JournalItem
							title={data[0].title}
							text={data[0].text}
							date={data[0].date}
						></JournalItem>
					</CardButton>
					<CardButton>
						<JournalItem
							title={data[1].title}
							text={data[1].text}
							date={data[1].date}
						></JournalItem>
					</CardButton>
				</JournalList>
			</LeftPanel>
			<Body>
				<JournalForm></JournalForm>
			</Body>
		</div>
	);
}

export default App;
