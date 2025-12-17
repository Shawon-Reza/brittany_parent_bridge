
import './App.css'
import { useState } from 'react'
import DarkModeButton from './components/common/DarkModeButton'
import { useDarkMode } from './Contexts/ThemeContext'

function App() {
  const { darkMode } = useDarkMode()
  const [copied, setCopied] = useState(false)
  const copyCommand = 'npx @shawonreza/react-project-template your-project-name'

  // Function to handle copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyCommand)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch (err) {
      try {
        const el = document.createElement('textarea')
        el.value = copyCommand
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      } catch (e) {
        console.error('Copy failed', e)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="container w-full px-4 p-6 max-w-4xl xl:max-w-7xl">
        <header className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold">React Project Template</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Author: Shawon Reza</p>
            <div className="mt-2 text-sm space-x-3">
              <a
                href="https://www.linkedin.com/in/shawon-reza/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Shawon-Reza"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 dark:text-gray-200 hover:underline"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 shadow-lg">
            <DarkModeButton />
          </div>
        </header>

        <section className="p-6 mb-6 rounded-xl shadow-lg bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold mb-2">React Project Template</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">A fully-ready, customizable React starter template designed to save your time on every new project. Instead of setting up React, Tailwind, routing, context, API tools, dark mode, and utilities from scratch — just install this template and start coding instantly.</p>

            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Author: <strong>Shawon Reza</strong></p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Package Name: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">@shawonreza/react-project-template</code></p>
            </div>

            <h3 className="text-xl font-semibold mb-2">Why Use This Template?</h3>
            <p className="text-sm text-gray-700 dark:text-gray-200 mb-3">Setting up a modern React project every time is boring and repetitive. This template gives you a pre-configured, production-ready setup so you can install → rename → start coding.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-xl">
                <h4 className="font-semibold mb-2">Core Features</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-1 ">
                  <li>- Dark / Light mode toggler</li>
                  <li>- Custom font setup</li>
                  <li>- Clean, scalable folder structure</li>
                  <li>- Context API setup For dark mode</li>
                  <li>- Toast & SweetAlert2 configured</li>
                </ul>
              </div>

              <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-xl">
                <h4 className="font-semibold mb-2">Installed Packages</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-1 ">
                  <li>- react-19, react-dom-19, react-router-dom-7.9.5, tailwindcss-4.1.17, vite-7.2.2</li>
                  <li>- axios, @tanstack/react-query</li>
                  <li>- react-toastify, sweetalert2, react-hook-form</li>
                </ul>
              </div>

              <div className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-xl">
                <h4 className="font-semibold mb-2">Quick Install</h4>
                <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">Create a new project from the template: <span className='text-xs font-semibold'>Click on this Command</span></p>
                <div className="relative">
                  <pre
                    role="button"
                    tabIndex={0}
                    onClick={handleCopy}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCopy() } }}
                    className="bg-gray-900 text-white p-3 rounded text-xs overflow-x-auto cursor-pointer select-all"
                    aria-label="Copy install command"
                  >
                    {copyCommand}
                  </pre>
                  {copied && (
                    <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">Copied!</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Then: <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">cd your-project-name</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">npm install</code>, <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">npm run dev</code></p>
              </div>
            </div>
          </div>
        </section>


        <footer className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          Theme toggle updates page background and text colors using Tailwind's `dark` class.
        </footer>
      </div>
    </div>
  )
}

export default App
