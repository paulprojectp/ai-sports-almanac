import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>AI Sports Almanac</title>
        <meta name="description" content="Predictions for sports games using multiple LLM providers" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">AI Sports Almanac</h1>
          <nav className="mt-2">
            <ul className="flex space-x-6">
              <li><a href="#" className="text-blue-600 hover:text-blue-800">MLB Predictions</a></li>
              <li><a href="#" className="text-blue-600 hover:text-blue-800">NBA Predictions</a></li>
              <li><a href="#" className="text-blue-600 hover:text-blue-800">NFL Predictions</a></li>
              <li><a href="#" className="text-blue-600 hover:text-blue-800">About</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Component {...pageProps} />
      </main>
      <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>AI Sports Almanac © 2025</p>
        <p className="mt-2">Predictions powered by OpenAI, Anthropic, Grok, and DeepSeek</p>
      </footer>
    </>
  );
}

export default MyApp;
