const BackButton = ({ onClick }) => {
	return (
		<button title='Back' className='back' onClick={onClick}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={1}
				stroke='currentColor'
				className='w-6 h-6'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18'
				/>
			</svg>
		</button>
	);
};

export default BackButton;
