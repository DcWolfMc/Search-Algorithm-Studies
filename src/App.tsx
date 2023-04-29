import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Home } from './pages/Home'
import { SearchAlgorithmsProvider } from './contexts/SearchContext'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <SearchAlgorithmsProvider>
      <Home/>
      </SearchAlgorithmsProvider>
    </ThemeProvider>
  )
}

export default App
