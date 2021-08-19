import './App.css';
import React from 'react'

const TitleStyle = {
  color: 'blue',
  textAlign: 'center'
}

function Title() {
  return <h1 style={TitleStyle}>Hello</h1>
}

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

function App() {
  return (
    <div className="App">
      <Title />
      Hello World!
      <Counter/>
    </div>
  );
}

export default App;
