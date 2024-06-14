import { useDrop } from 'react-dnd';
import { ListItem } from './ListItem';

export const List = ({ videos }) => {
	const [{ canDrop, isOver }, drop] = useDrop(
		() => ({
			accept: 'ListItem',
			drop: () => ({ name: 'list container' }),
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
				canDrop: !!monitor.canDrop(),
			}),
		}),
		[]
	);

	return (
		<div ref={drop} className='flex flex-col gap-2'>
			{/* <Table videos={videos} /> */}
			{videos.length &&
				videos.map((video, index) => {
					return (
						<ListItem
							key={video.id}
							index={index}
							video={video}
						/>
					);
				})}
		</div>
	);
};
