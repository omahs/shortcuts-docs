import { DocsThemeConfig } from 'nextra-theme-docs'
import { useConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'
import Image from 'next/image'
import logo from './assets/logo_horizontal.png'
import React from 'react'

const config: DocsThemeConfig = {
  logo: (
    <>
      <Image src={logo} alt="Enso Logo" width="148" height="64" />
    </>
  ),
  navigation: {
    prev: true,
    next: true,
  },
  project: {
    link: 'https://enso.finance',
  },
  chat: {
    link: 'https://t.me/enso_api',
  },
  docsRepositoryBase: 'https://github.com/EnsoFinance/shortcuts-docs',
  footer: {
    text: 'Enso Shortcuts Registry Docs',
  },
  useNextSeoProps() {
    const { route } = useRouter()
    if (route !== '/') {
      return {
        titleTemplate: '%s – Enso Docs',
      }
    }
  },

  head: () => {
    const { asPath } = useRouter()
    const { frontMatter } = useConfig()
    const socialCard = `https://i.imgur.com/xsGIovj.png`
    return (
      <>
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content="The Enso Shortcuts API documentation"
        />
        <meta
          name="og:description"
          content="The Enso Shortcuts API documentation"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={socialCard} />
        <meta name="twitter:site:domain" content="docs.enso.finance" />
        <meta name="twitter:url" content="https://docs.enso.finance" />
        <meta name="og:image" content={socialCard} />
        <meta
          property="og:url"
          content={`https://docs.enso.finance.com${asPath}`}
        />
        <meta
          property="og:title"
          content={frontMatter.title || 'Enso Shortcuts API'}
        />
      </>
    )
  },
}

export default config
