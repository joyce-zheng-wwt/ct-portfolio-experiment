export default function Contact() {
  return (
    <section className="contact" id="contact">
      <h2 className="contact-headline reveal">
        Let&apos;s build<br />
        <span className="outline">something</span><br />
        <span className="outline">new.</span>
      </h2>
      <div className="contact-action reveal reveal-delay-2">
        <a href="mailto:studio@example.com" className="btn-primary">
          Start a conversation
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  )
}
