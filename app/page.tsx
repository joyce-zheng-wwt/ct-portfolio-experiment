import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Work from '@/components/Work'
import Studio from '@/components/Studio'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ChatBar from '@/components/ChatBar'
import RevealManager from '@/components/RevealManager'

export default function Home() {
  return (
    <>
      <RevealManager />
      <Nav />
      <Hero />
      <Marquee />
      <Work />
      <Studio />
      <Contact />
      <Footer />
      <ChatBar />
    </>
  )
}
