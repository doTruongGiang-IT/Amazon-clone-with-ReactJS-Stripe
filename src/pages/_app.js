import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'
import Layout from '../components/Layout'
import { Provider as AuthProvider } from 'next-auth/client'

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </AuthProvider>
  )
}

export default MyApp
