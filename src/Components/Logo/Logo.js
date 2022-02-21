import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'

const Logo = () => {
	return (
		<div className="ma4 mt0">
			<Tilt className="br2 shadow-2" options={{ max : 45 }} style={{ width: '150px' ,height: '150px' }}>
		      <div className="pa3">
		        <img style={{paddingTop: '5px'}} alt="logo" src={brain} />
		      </div>
		    </Tilt>
		 </div>
	);
}

export default Logo;