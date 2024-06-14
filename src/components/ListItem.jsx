import React from 'react';
import { useDrop, useDrag } from 'react-dnd';

export const ListItem = ({ index, video }) => {
	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: 'ListItem',
			item: { index },
			collect: (monitor) => ({
				isDragging: !!monitor.isDragging(),
			}),
		}),
		[]
	);

	// drag(drop(ref));

	return (
		<div
			ref={drag}
			key={video.id}
			className='w-full h-24 rounded-lg border border-[#1f1f1f] flex items-center gap-4 px-2'
		>
			<span className='mx-2'>01</span>
			<div className='h-[64px] w-[118px] rounded-lg overflow-hidden border-gray-700'>
				<img className='bg-cover border-none outline-none' src={video.photo} />
			</div>
			<div className='text-base max-w-[#346px] h-[#56px]'>{video.title}</div>
			<div className='text-[#9bff00]'>{video.username}</div>
			<div className='ml-auto'>{video.like}</div>
		</div>
	);
};
