import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { HowICanHelp } from '@/components/HowICanHelp'
import { Navbar } from '@/components/Navbar'
import { Projects } from '@/components/Projects'
import { Services } from '@/components/Services'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-fg focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-background"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <Services />
        <Projects />
        <HowICanHelp />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
