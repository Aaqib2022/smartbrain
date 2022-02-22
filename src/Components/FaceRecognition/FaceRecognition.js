import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
	console.log(imageUrl)
	return (
		<div className="center ma">
			<div className="absolute mt2"> 
				<img id="inputimage" alt="face detection" src={imageUrl} width="500px" height="auto" />
			</div>
		 </div>
		);
}

export default FaceRecognition;