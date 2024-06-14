import React from 'react';
import { AuthContext } from '../authContext';
import { List } from '../components/List';
import MkdSDK from '../utils/MkdSDK';

const AdminDashboardPage = () => {
	const { dispatch } = React.useContext(AuthContext);
	const [videos, setVideos] = React.useState([]);
	const [page, setPage] = React.useState(1);
	const [numPages, setNumPages] = React.useState(1);
	let sdk = new MkdSDK();
	sdk._table = 'video';

	const logout = () => {
		dispatch({ type: 'LOGOUT' });
	};

	const moveItem = (fromIndex, toIndex) => {
		const updatedList = [...videos];
		const [movedItem] = updatedList.splice(fromIndex, 1);
		updatedList.splice(toIndex, 0, movedItem);
		setList(updatedList);
	};

	const prevPage = async () => {
		await fetchVideos();
		setPage((prev) => {
			if (prev < 1) {
				return 0;
			} else {
				prev--;
				return prev;
			}
		});
	};

	const nextPage = async () => {
		await fetchVideos();
		setPage((prev) => {
			if (prev >= numPages) {
				return numPages;
			} else {
				prev++;
				return prev;
			}
		});
	};

	const fetchVideos = async () => {
		try {
			const response = await sdk.callRestAPI(
				{
					payload: {},
					page,
					limit: 10,
				},
				'PAGINATE'
			);
			setVideos(response.list);
			setPage(response.page);
			setNumPages(response.num_pages);
			console.log(response);
		} catch (error) {
			// Handling error silently
		}
	};

	React.useEffect(() => {
		fetchVideos();
	}, []);

	return (
		<div className='max-w-screen-xl min-h-screen mx-auto flex flex-col items-center bg-[#111111] text-gray-600'>
			<nav className='w-full flex items-center justify-between mb-[72px]'>
				<h1 className='font-bold text-5xl'>APP</h1>
				<button
					className='rounded-3xl w-32 h-12 bg-[#9bff00] text-gray-400'
					onClick={logout}
				>
					Logout
				</button>
			</nav>
			<div className='w-full h-[88px] flex items-center justify-between flex-wrap'>
				<h2 className='text-5xl text-gray-400'>Today's leaderboard</h2>
				<div className='w-[418px] h-[56px] rounded-lg bg-[#1d1d1d] flex items-center gap-4 justify-center text-gray-500'>
					<span className=''>30 May 2022</span>
					<span>&bull;</span>
					<span className='bg-[#9bff00] p-1 text-gray-400 rounded-lg'>
						SUBMISSIONS OPEN
					</span>
					<span>&bull;</span>
					<span>11:34</span>
				</div>
			</div>
			<div className='w-full my-2'>
				<div className='h-[35px] flex items-center justify-between'>
					<div className='space-x-4'>
						<span>#</span>
						<span>Title</span>
					</div>
					<div>Author</div>
					<div>Most Liked</div>
				</div>
				<List videos={videos} />
			</div>
			<div className='flex gap-4 my-8 items-center'>
				<button
					onClick={prevPage}
					className='rounded-3xl w-32 h-12 bg-[#9bff00] text-gray-400'
				>
					Prev
				</button>
				<p className='text-gray-700 text-3xl font-bold'>{page}</p>
				<button
					onClick={nextPage}
					className='rounded-3xl w-32 h-12 bg-[#9bff00] text-gray-400'
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default AdminDashboardPage;
