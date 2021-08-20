import './App.css';
import React from 'react'
import useInput from './useInput';
import Calculator from './components/calculator';

const TitleStyle = {
  color: 'blue',
  textAlign: 'center'
}

function Title() {
  return <h1 style={TitleStyle}>Hello</h1>
}

function Label({text}) {
  console.log('render label')
  return <label>{text}</label>
}

const MemoLabel = React.memo(Label)

function updateCountToStorage(count) {
  window.localStorage.setItem('count', JSON.stringify(count))
}

function Counter() {
  const [count, setCount] = React.useState(() => {
    const localCount = window.localStorage.getItem('count')
    return JSON.parse(localCount) || 0
  })
  const handleClick = () => {
    setCount(count + 1)
  }
  React.useLayoutEffect(() => {
    document.title = `You clicked ${count} times`;
    updateCountToStorage(count)
  }, [count])
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>click me</button>
    </div>
  )
}

const redStyle = { color: 'red' }
const blueStyle = { color: 'blue' }

function Input() {
  const { value, handleChange } = useInput()
  const handleSubmit = () => {
    alert(value)
  }

  const changeColor = value && value.length > 3
  const s = React.useMemo(() => {
    console.log('run memo')
    return changeColor ? redStyle : blueStyle
  }, [changeColor])

  return (
    <div>
      <MemoLabel text="hi"/>
      <input
      style={s}
      type="text"
      placeholder="type something here"
      onChange={handleChange}
      value={value}/>
      <input type="submit" value="Submit" onClick={handleSubmit} />
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Title />
      Hello World!
      <Counter/>
      <Input/>
      <Calculator/>
    </div>
  );
}

export default App;
