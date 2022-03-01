import React from 'react';

const Rank = ( {username , entries } ) => {
	console.log(`Rank : ${username} and entries: ${entries}`);
	return (
		<div className="tc">
			<div className = 'f3'>
				{`${username} your current entry count is  ....`} 
			</div>
			<div className = 'f1'>
				{`${entries}`} 
			</div>
		</div>
	);
}

export default Rank;