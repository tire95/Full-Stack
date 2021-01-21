import React, { useState } from 'react'

const Button = ({text, handleClick}) => (
	<button onClick={handleClick}>
		{text}
	</button>
)

const Statistics = (props) => {
	if (props.all === 0) {
		return (
			<div>
				<p>No feedback given</p>
			</div>
		)
	}
	return (
		<div>
			<p>Statistics</p>
			<table>
				<tbody>
					<Statistic text="good:" value={props.good}/>
					<Statistic text="neutral:" value={props.neutral}/>
					<Statistic text="bad:" value={props.bad}/>
					<Statistic text="all:" value={props.all}/>
					<Statistic text="average:" value={props.average}/>
					<Statistic text="positive percentage: " value={props.positivePercent}/>
				</tbody>
			</table>
		</div>
	)
}

const Statistic = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const goodFeedback = () => setGood(good + 1)
  const neutralFeedback = () => setNeutral(neutral + 1)
  const badFeedback = () => setBad(bad + 1)
  
  const positivePercent = () => (good / (good + neutral + bad)) * 100
  const average = () => (good - bad) / (good + neutral + bad)

  return (
    <div>
		<p>Give feedback</p>
		<Button text="good" handleClick={goodFeedback}/>
		<Button text="neutral" handleClick={neutralFeedback}/>
		<Button text="bad" handleClick={badFeedback}/>
		<Statistics good={good} bad={bad} neutral={neutral} all={good + neutral + bad}
		  average={average()} positivePercent={positivePercent()}/>
    </div>
  )
}

export default App