import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';

function JournalList({items}) {
	const { userId } = useContext(UserContext);

	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	 };

	const filteredItems = items
		.filter(el => el.userId === userId)
		.sort(sortItems);

	if (items.length === 0) {
		return <p>Записей пока нет, добавьте первую</p>;
	}

	return (
		<div className="journal-list">
			{filteredItems
				.map(el => (
					<CardButton key={el.id}>
						<JournalItem
							title={el.title}
							post={el.post}
							date={el.date}
						></JournalItem>
					</CardButton>))
			}
		</div>
	);
}

export default JournalList;