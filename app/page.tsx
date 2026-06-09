import VideoIntro from '@/components/VideoIntro'
import About from '@/components/About/About'
import Projects from '@/components/Projects/Projects'
import Contact from '@/components/Contact/Contact'

export default function Home() {
  return (
    <>
      <VideoIntro
        tagline="Software & AI Engineer"
        firstName="Sai Kiran"
        lastName="Konda"
        role="Building data platforms, agentic AI systems, and modern web products."
        scrollToId="about"
      />
      <About />
      <Projects />
      <Contact />
    </>
  )
}
