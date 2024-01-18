import './svg-range.css';

const SvgRange = () => {
	const numColumns = 35;
	const columns = Array.from({ length: numColumns }, (_, i) => i);
	return (
		<svg
			className='svgRange'
			viewBox={`-1 0 ${numColumns * 10} 104`}
			version='1.1'
			xmlns='http://www.w3.org/2000/svg'
		>
			<g
				id='3.Multimedia'
				stroke='none'
				strokeWidth='1'
				fill='none'
				fillRule='evenodd'
				strokeLinecap='round'
				strokeLinejoin='round'
			>
				<g
					id='Multimedia-(Color)'
					transform='translate(-99.000000, -100.000000)'
					stroke='#d76dec'
					strokeWidth='5'
					fill='#000000'
				>
					<g
						id='1-multimeda-volume'
						transform='translate(100.000000, 102.000000)'
						strokeLinecap='round'
					>
						{columns.map((_, index) => {
							const randomHeight = Math.floor(Math.random() * 40);
							return (
								<path
									key={index}
									d={`M${index * 10},${70 - randomHeight} L${index * 10},${
										30 + randomHeight
									}`}
									id={`Layer-${index}`}
								/>
							);
						})}
					</g>
				</g>
			</g>
		</svg>
	);
};

export default SvgRange;
