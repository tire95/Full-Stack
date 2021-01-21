import React, { useState } from 'react'

const Button = ({text, handleClick}) => (
	<button onClick={handleClick}>
		{text}
	</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
   
  const [selected, setSelected] = useState(0)
  
  const randomAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  
  const voteAnecdote = () => {
	let copy = [...points]
	copy[selected] += 1
	setPoints(copy)
  }
  
  function indexOfMax() {
	let max = points[0]
	let maxIndex = 0
	
	for (let i = 1; i < points.length; i++) {
		if (points[i] > max) {
			maxIndex = i
			max = points[i]
		}
	}
	return maxIndex
  }

  return (
    <div>
		<h3>Anecdote of the day</h3>
		<p>{anecdotes[selected]}</p>
		<p>Has {points[selected]} votes</p>
		<Button text="next anecdote" handleClick={randomAnecdote}/>
		<Button text="vote" handleClick={voteAnecdote}/>
		<h3>Anecdote with most votes</h3>
		<p>{anecdotes[indexOfMax()]}</p>
		<p>Has {points[indexOfMax()]} votes</p>
	</div>
  )
}

export default App