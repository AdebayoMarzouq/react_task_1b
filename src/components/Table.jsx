import React from 'react';
import { DndProvider, HTML5Backend } from 'react-dnd';

const Table = ({ videos }) => {
	return (
		<div className='overflow-auto'>
			<table className='min-w-full border-collapse'>
				<thead>
					<tr className='h-[35px] border-b border-gray-300'>
						<th className='px-4 py-2 text-left'>#</th>
						<th className='px-4 py-2 text-left'>Title</th>
						<th className='px-4 py-2 text-left'>Author</th>
						<th className='px-4 py-2 text-left'>Most Liked</th>
					</tr>
				</thead>
				<tbody>
					<DndProvider backend={HTML5Backend}>
						{videos.length &&
							videos.map((video, index) => {
								return (
									<tr key={video.id} className='h-24 border-b border-gray-300'>
										<td className='px-4 py-2'>{index + 1}</td>
										<td className='px-4 py-2'>
											<div className='flex items-center gap-4'>
												<div className='h-[64px] w-[118px] rounded-lg overflow-hidden border-gray-700'>
													<img
														className='bg-cover border-none outline-none'
														src={video.photo}
														alt={video.title}
													/>
												</div>
												<div className='text-base max-w-[346px] h-[56px]'>
													{video.title}
												</div>
											</div>
										</td>
										<td className='px-4 py-2 text-[#9bff00]'>
											{video.username}
										</td>
										<td className='px-4 py-2 ml-auto'>{video.likes}</td>
									</tr>
								);
							})}
					</DndProvider>
				</tbody>
			</table>
		</div>
	);
};

export default Table;
