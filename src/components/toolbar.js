import React from 'react'


const themes = {
    light: {
      foreground: "#000000",
      background: "#eeeeee"
    },
    dark: {
      foreground: "#ffffff",
      background: "#222222"
    }
}
  
const ThemeContext = React.createContext(themes.light)
const ChangeThemeContext = React.createContext()

  
function Toolbar() {
  return (
    <div>
      <ThemedButton/>
    </div>
  )
}


function ThemedButton() {
  const theme = React.useContext(ThemeContext)
  const changeTheme = React.useContext(ChangeThemeContext)
  const style = { background: theme.background, color: theme.foreground }

  return (
    <button style={style} onClick={changeTheme}>
      Change Theme
    </button>
  )
}

function ThemedToolbar() {
  const [theme, setTheme] = React.useState(themes.dark)
  const changeTheme = () => {
    setTheme(
      theme === themes.dark
        ? themes.light
        : themes.dark
    )
  }
  return (
    <ThemeContext.Provider value={theme}>
      <ChangeThemeContext.Provider value={changeTheme}>
        <Toolbar/>
      </ChangeThemeContext.Provider>
    </ThemeContext.Provider>
  )
}

export default ThemedToolbar
