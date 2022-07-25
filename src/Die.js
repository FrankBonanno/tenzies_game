import React from "react";

function Die(props) {
	const styles = {
		backgroundColor: props.isHeld ? "#59e391" : "white",
	};

	return (
		<div
			onClick={props.clickDie}
			className={`die--face${props.isHeld ? " held" : ""}`}
			style={styles}
		>
			<h2 className="die--text">{props.value}</h2>
		</div>
	);
}

export default Die;
