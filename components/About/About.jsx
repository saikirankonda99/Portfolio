'use client'

import { useRef } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import styles from './About.module.css'

const EXPERIENCE = [
  {
    role: 'Software Engineer',
    company: 'Tata Elxsi',
    years: '2021 – 2023',
  },
  {
    role: 'Founder & Engineer',
    company: 'Anjali Boutique',
    years: '2023 – present',
  },
]

const CERTS = [
  'AWS Cloud Practitioner',
  'Power BI PL-300',
  'Tableau Desktop Specialist',
]

const STACK = [
  { category: 'Languages', items: ['Python', 'TypeScript', 'SQL'] },
  { category: 'Data',      items: ['PostgreSQL', 'Snowflake', 'dbt', 'Airflow'] },
  { category: 'Backend',   items: ['FastAPI', 'Docker', 'AWS'] },
  { category: 'AI',        items: ['LangChain', 'LangGraph', 'OpenAI API'] },
  { category: 'Frontend',  items: ['React', 'Next.js'] },
]

export default function About() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef)

  return (
    <section id="about" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>

        <span className={styles.sectionLabel} data-reveal>
          About
        </span>

        <h2 className={styles.headline} data-reveal data-reveal-delay="0.08">
          Software and AI engineer
          <br />
          in the NYC metro area.
        </h2>

        <p className={styles.bio} data-reveal data-reveal-delay="0.16">
          Four-plus years across data engineering and full-stack development.
          I build the pipelines that move and transform data, the agents that
          reason over it, and the products that put it in front of people.
          I care about systems that stay maintainable and outputs that are correct.
        </p>

        <div className={styles.grid}>
          {/* Left — experience */}
          <div className={styles.left}>
            <h3 className={styles.colLabel} data-reveal data-reveal-delay="0.05">
              Experience
            </h3>
            <ul className={styles.expList}>
              {EXPERIENCE.map((e, i) => (
                <li
                  key={e.company}
                  className={styles.expItem}
                  data-reveal
                  data-reveal-delay={String(0.1 + i * 0.08)}
                >
                  <span className={styles.expRole}>{e.role}</span>
                  <span className={styles.expYears}>{e.years}</span>
                  <span className={styles.expCompany}>{e.company}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — education + certs */}
          <div className={styles.right}>
            <div data-reveal data-reveal-delay="0.05">
              <h3 className={styles.colLabel}>Education</h3>
              <p className={styles.eduDegree}>MS Information Technology</p>
              <p className={styles.eduSchool}>St. Francis College · Dec 2025</p>
            </div>

            <div className={styles.certBlock} data-reveal data-reveal-delay="0.14">
              <h3 className={styles.colLabel}>Certifications</h3>
              <ul className={styles.certList}>
                {CERTS.map((c) => (
                  <li key={c} className={styles.certItem}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Stack */}
        <div className={styles.stackSection}>
          <h3 className={styles.colLabel} data-reveal>Stack</h3>
          <div className={styles.stackRows}>
            {STACK.map((row, i) => (
              <div
                key={row.category}
                className={styles.stackRow}
                data-reveal
                data-reveal-delay={String(0.06 + i * 0.07)}
              >
                <span className={styles.stackCategory}>{row.category}</span>
                <span className={styles.stackItems}>{row.items.join(' · ')}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
