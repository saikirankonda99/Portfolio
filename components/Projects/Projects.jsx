'use client'

import { useRef } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    id: 'ai-analytics',
    flagship: true,
    title: 'Agentic AI Analytics Platform',
    description:
      'Ask a question in plain English and get an answer drawn from your data — the agent writes the queries, runs them, and explains what it found.',
    tags: ['Python', 'FastAPI', 'LangGraph', 'OpenAI', 'ChromaDB', 'Redis', 'Streamlit', 'Docker'],
    github: 'https://github.com/saikirankonda99/agentic-ai-analytics-platform',
  },
  {
    id: 'financial-risk',
    title: 'Financial Risk & Portfolio Analytics',
    description:
      'VaR and Monte Carlo risk models for a portfolio, with a fully automated data pipeline that keeps the numbers current.',
    tags: ['Python', 'Airflow', 'AWS'],
    github: 'https://github.com/saikirankonda99/financial-risk-dashboard',
  },
  {
    id: 'healthcare-claims',
    title: 'Healthcare Claims Analytics Pipeline',
    description:
      'Claims data pipeline with PII masking and data-governance controls built in from the start.',
    tags: ['Python', 'SQL', 'Data Governance'],
    github: 'https://github.com/saikirankonda99/healthcare-claims-analytics',
  },
  {
    id: 'anjali-boutique',
    title: 'Anjali Boutique',
    description:
      'E-commerce platform I built and run — web storefront, mobile app, and a FastAPI backend.',
    tags: ['Next.js', 'React Native', 'FastAPI'],
    github: 'https://github.com/saikirankonda99/anjali-boutique',
  },
]

function ArrowIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 6.5h9M8 3l3.5 3.5L8 10" />
    </svg>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  useScrollReveal(sectionRef)

  return (
    <section id="projects" ref={sectionRef} className={styles.section}>
      <div className={styles.container}>

        <span className={styles.sectionLabel} data-reveal>Projects</span>

        <h2 className={styles.headline} data-reveal data-reveal-delay="0.08">
          Selected work.
        </h2>

        <div className={styles.grid}>
          {PROJECTS.map((p, i) => (
            <article
              key={p.id}
              className={`${styles.card} ${p.flagship ? styles.flagship : ''}`}
              data-reveal
              data-reveal-delay={String(0.06 + i * 0.1)}
            >
              {p.flagship && (
                <span className={styles.flagshipBadge} aria-label="Flagship project">
                  Flagship
                </span>
              )}

              <h3 className={styles.cardTitle}>{p.title}</h3>

              <p className={styles.cardDesc}>{p.description}</p>

              <ul className={styles.tags} aria-label="Technologies">
                {p.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>{tag}</li>
                ))}
              </ul>

              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubLink}
              >
                View on GitHub
                <ArrowIcon />
              </a>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
