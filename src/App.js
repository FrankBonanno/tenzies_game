import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Die from "./Die";

import Confetti from "react-confetti";

function App() {
	/*** State Variables/Setters ***/
	// Array of dice objects
	const [dice, setDice] = useState(allNewDice());
	// State of win condition
	const [tenzies, setTenzies] = useState(false);

	// Check for win when dice array is updated
	useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld);
		const firstDieValue = dice[0].value;
		const allSameValue = dice.every((die) => die.value === firstDieValue);

		if (allHeld && allSameValue) {
			setTenzies(true);

			// console.log("Winner Winner Winner!");
		}
	}, [dice]);

	// Generate a single die
	function genNewDie() {
		return {
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid(),
		};
	}

	// Generate 10 New Dice
	function allNewDice() {
		const diceArray = [];
		for (let i = 0; i < 10; i++) {
			diceArray.push(genNewDie());
		}

		return diceArray;
	}

	// Roll Button Click Handler
	function rollClick() {
		if (tenzies) {
			setDice(allNewDice());
			setTenzies((oldTenzies) => !oldTenzies);
			return;
		}

		setDice((oldDice) => {
			return oldDice.map((die) => {
				return die.isHeld ? die : genNewDie();
			});
		});
	}

	// Update holding the die
	function holdDie(id) {
		setDice((prevDie) => {
			return prevDie.map((die) => {
				return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
			});
		});
	}

	/*** PAGE ELEMENTS */
	const diceElements = dice.map((die) => (
		<Die
			value={die.value}
			key={die.id}
			isHeld={die.isHeld}
			clickDie={() => holdDie(die.id)}
		/>
	));

	return (
		<main className="tenzies">
			{tenzies && <Confetti />}
			<h1 className="tenzies--title">Tenzies</h1>
			<p className="tenzies--rules">
				Roll until all dice are the same. Click each die to freeze it at
				its current value between rolls.
			</p>
			<div className="dice-container">{diceElements}</div>
			<button className="btn" onClick={rollClick}>
				{tenzies ? "New Game" : "Roll"}
			</button>
			{/* <p className="count">{rollsCount}</p> */}
		</main>
	);
}

export default App;
