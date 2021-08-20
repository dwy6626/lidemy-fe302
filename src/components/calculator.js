// https://zh-hant.reactjs.org/docs/lifting-state-up.html
import React from 'react'
import styled from 'styled-components'


const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
}

const WidthDiv = styled.div`
    max-width: 75%;
    margin: auto;
    padding: 20px;
`

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9
  }
  
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}


function TemperatureInput ({temperature, scale, onTemperatureChange}) {
    const handleChange = e => { onTemperatureChange(e.target.value) }

    // props is read only
    return (
    <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
                onChange={handleChange} />
    </fieldset>
    );
}


function Calculator () {
    const [temperature, setTemperature] = React.useState('')
    const [scale, setScale] = React.useState('c')

    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    const handleCelsiusChange = (temperature) => {
        setScale('c')
        setTemperature(temperature)
    }

    const handleFahrenheitChange = (temperature) => {
        setScale('f')
        setTemperature(temperature)
    }

    return (
        <WidthDiv>
        <TemperatureInput
            scale="c"
            temperature={celsius}
            onTemperatureChange={handleCelsiusChange} />
        <TemperatureInput
            scale="f"
            temperature={fahrenheit}
            onTemperatureChange={handleFahrenheitChange} />
        <BoilingVerdict
            celsius={parseFloat(celsius)} />
        </WidthDiv>
    );
}


export default Calculator
