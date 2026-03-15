import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../src/store'
import '../src/styles/global.css'

export const decorators = [
  (Story) => (
      <Provider store={store}>
        <MemoryRouter>
          <div style={{ padding: '24px', background: 'var(--bg-page)', minHeight: '100vh' }}>
            <Story />
          </div>
        </MemoryRouter>
      </Provider>
  ),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}