import React from 'react';

const Rank = ( {name , entries } ) => {
	console.log(`Rank : ${name} and entries: ${entries}`);
	return (
		<div className="tc">
			<div className = 'f3'>
				{`${name} your current entry count is  ....`} 
			</div>
			<div className = 'f1'>
				{`${entries}`} 
			</div>
		</div>
	);
}

export default Rank;