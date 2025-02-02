import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Layout__HasNav, Layout__NavMobile, Layout__NoNav } from '../components/parts/Layout'
import TagManager from 'react-gtm-module'
import { QueryClient, QueryClientProvider } from 'react-query'
import * as ga from '@lib/ga'
import '@styles/globals.css'
import '@styles/typography.css'

const client = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  // Google Analytics...maybe?
  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url as any)
    }
    TagManager.initialize({ gtmId: 'GTM-PC8M8GG' })
  }, [])

  // Define the Layouts so we can use use them whenever
  const LayoutWithNav = () => {
    return (
      <Layout__HasNav>
        <Component {...pageProps} />
      </Layout__HasNav>
    )
  }
  const LayoutWithoutNav = () => {
    return (
      <Layout__NoNav>
        <Component {...pageProps} />
      </Layout__NoNav>
    )
  }

  const LayoutHambOnly = () => {
    return (
      <Layout__NavMobile>
        <Component {...pageProps} />
      </Layout__NavMobile>
    )
  }

  // Define which pages get which specific layout
  const getLayout = (path) => {
    switch (true) {
      case path === '/':
        return LayoutHambOnly()
        break
      case path.startsWith('/store'):
        return LayoutWithoutNav()
        break
      default:
        return LayoutWithNav()
        break
    }
  }

  // Figure out which layout to use and build the page
  const router = useRouter()
  const path = router.pathname
  return <QueryClientProvider client={client}>{getLayout(path)}</QueryClientProvider>
}

export default MyApp
