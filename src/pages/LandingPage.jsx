import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'

/* ————— Intersection Observer Hook ————— */
function useInView(options = {}) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setVisible(true); obs.unobserve(el) }
        }, { threshold: 0.15, ...options })
        obs.observe(el)
        return () => obs.disconnect()
    }, [])
    return [ref, visible]
}

function FadeIn({ children, className = '', delay = 0 }) {
    const [ref, visible] = useInView()
    return (
        <div ref={ref} className={`fade-in ${visible ? 'visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    )
}

/* ————— FAQ Item ————— */
function FaqItem({ question, answer }) {
    const [open, setOpen] = useState(false)
    return (
        <div className={`faq-item ${open ? 'faq-item--open' : ''}`}>
            <button className="faq-item__question" onClick={() => setOpen(!open)} aria-expanded={open}>
                <span>{question}</span>
                <span className="faq-item__icon">+</span>
            </button>
            <div className="faq-item__answer" role="region">
                <p>{answer}</p>
            </div>
        </div>
    )
}

/* ————— Contact Form ————— */
function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
    const [status, setStatus] = useState('idle') // idle | sending | sent | error

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('sending')
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            if (res.ok) {
                setStatus('sent')
                setForm({ name: '', email: '', company: '', message: '' })
            } else {
                setStatus('error')
            }
        } catch {
            setStatus('error')
        }
    }

    if (status === 'sent') {
        return (
            <div className="form-success">
                ✓ Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden bei Ihnen.
            </div>
        )
    }

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="contact-name">Name *</label>
                <input id="contact-name" type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ihr vollständiger Name" />
            </div>
            <div className="form-group">
                <label htmlFor="contact-email">E-Mail *</label>
                <input id="contact-email" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="ihre@email.de" />
            </div>
            <div className="form-group">
                <label htmlFor="contact-company">Unternehmen</label>
                <input id="contact-company" type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Firmenname" />
            </div>
            <div className="form-group">
                <label htmlFor="contact-message">Nachricht *</label>
                <textarea id="contact-message" required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Wie können wir Ihnen helfen?" rows={5} />
            </div>
            <button type="submit" className="btn btn--primary form-submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Wird gesendet…' : 'Kostenlose Beratung anfordern →'}
            </button>
            {status === 'error' && (
                <p style={{ color: 'var(--color-light-orange)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                    Ein Fehler ist aufgetreten. Bitte senden Sie Ihre Anfrage an <a href="mailto:info@famefact.com">info@famefact.com</a>.
                </p>
            )}
        </form>
    )
}

/* ————— MAIN LANDING PAGE ————— */
export default function LandingPage() {
    return (
        <>
            <Helmet>
                <title>KI Ads Beratung | ChatGPT Werbung & OpenAI Ads Strategie | famefact</title>
                <meta name="description" content="KI Ads Beratung – Ihre Experten für ChatGPT Ads, OpenAI Werbung & KI-gestützte Werbekampagnen. Wir beraten rund um das Thema KI Ads in ChatGPT. ✓ Früher Marktzugang ✓ Strategische Beratung ✓ Nachweisbare Ergebnisse" />
            </Helmet>

            {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
            <section className="hero" id="hero">
                <div className="hero__bg" aria-hidden="true" />
                <div className="container">
                    <div className="hero__content">
                        <div className="hero__badge">📢 KI Ads in ChatGPT – jetzt in den USA, bald in Europa</div>
                        <h1>
                            <span className="gradient-text">KI Ads Beratung</span><br />
                            ChatGPT Werbung strategisch nutzen
                        </h1>
                        <p className="hero__subtitle">
                            OpenAI hat <strong>KI Ads in ChatGPT</strong> eingeführt – zunächst in den USA, bald auch in Europa und Deutschland.
                            Wir beraten Sie rund um das Thema <strong>KI Ads</strong>: Von der strategischen Vorbereitung über die
                            Kampagnenplanung bis zur Optimierung. Sichern Sie sich jetzt den Wettbewerbsvorteil als Early Adopter.
                        </p>
                        <div className="hero__actions">
                            <a href="#kontakt" className="btn btn--primary">Kostenlose Erstberatung sichern →</a>
                            <a href="#was-sind-ki-ads" className="btn btn--secondary">Was sind KI Ads?</a>
                        </div>
                        <div className="hero__trust">
                            <span>Vertraut von:</span>
                            <div className="trust-badges">
                                <span className="trust-badge">famefact</span>
                                <span className="trust-badge">Berlin</span>
                                <span className="trust-badge">Seit 2010</span>
                                <span className="trust-badge">100+ Kunden</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          PROBLEM / PAIN SECTION
      ═══════════════════════════════════════ */}
            <section className="section section--alt" id="problem">
                <div className="container">
                    <FadeIn>
                        <div className="text-center">
                            <span className="section-label">Die Chance</span>
                            <h2 className="headline-lg">KI Ads revolutionieren die Werbung – sind Sie vorbereitet?</h2>
                            <p className="body-lg" style={{ maxWidth: 700, margin: '0 auto' }}>
                                Die Art und Weise, wie Werbung funktioniert, verändert sich grundlegend. Mit der Einführung von KI Ads in
                                ChatGPT durch OpenAI entsteht ein völlig neuer Werbekanal, der traditionelle Formate wie Google Ads und
                                Social Media Ads ergänzt und in vielen Bereichen übertreffen wird. Über 400 Millionen Menschen nutzen ChatGPT
                                weltweit – und bald werden sie auch dort Werbung sehen. Unternehmen, die jetzt nicht handeln, werden diesen
                                historischen First-Mover-Vorteil verlieren. In den USA sind KI Ads bereits live – der europäische
                                Markteintritt steht unmittelbar bevor.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="pain__grid">
                        <FadeIn delay={100}>
                            <div className="glass-card pain-card">
                                <div className="pain-card__icon">🚀</div>
                                <div className="pain-card__stat">400 Mio.+</div>
                                <div className="pain-card__text">
                                    wöchentlich aktive ChatGPT-Nutzer weltweit. Ein gigantisches neues Werbeumfeld, das bisher kaum ein Unternehmen nutzt.
                                </div>
                            </div>
                        </FadeIn>
                        <FadeIn delay={200}>
                            <div className="glass-card pain-card">
                                <div className="pain-card__icon">💡</div>
                                <div className="pain-card__stat">Kontext</div>
                                <div className="pain-card__text">
                                    KI Ads erscheinen kontextuell in der Konversation – kein Keyword-Matching, sondern echtes Intent-basiertes Targeting auf Basis natürlicher Sprache.
                                </div>
                            </div>
                        </FadeIn>
                        <FadeIn delay={300}>
                            <div className="glass-card pain-card">
                                <div className="pain-card__icon">⏰</div>
                                <div className="pain-card__stat">2026</div>
                                <div className="pain-card__text">
                                    Der europäische Launch steht bevor. Wer sich jetzt vorbereitet, profitiert von niedrigeren CPAs und weniger Wettbewerb beim Markteintritt.
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          WAS SIND KI ADS?
      ═══════════════════════════════════════ */}
            <section className="section" id="was-sind-ki-ads">
                <div className="container">
                    <FadeIn>
                        <span className="section-label">Grundlagen</span>
                        <h2 className="headline-lg">Was sind KI Ads in ChatGPT und wie funktionieren sie?</h2>
                    </FadeIn>

                    <div className="geo-explain__grid">
                        <FadeIn className="geo-explain__content slide-in-left">
                            <p>
                                <strong>KI Ads</strong> – auch bekannt als <strong>ChatGPT Ads</strong> oder <strong>OpenAI Ads</strong> –
                                sind ein revolutionäres Werbeformat, das OpenAI 2025 in den USA eingeführt hat. Im Gegensatz zu klassischer
                                Online-Werbung werden KI Ads nativ in die Konversationsantworten von ChatGPT integriert. Das bedeutet:
                                Wenn ein Nutzer in ChatGPT nach einem Produkt, einer Dienstleistung oder einem Thema fragt, kann Ihre
                                Werbebotschaft als kontextuell relevante Empfehlung direkt in der KI-Antwort erscheinen.
                            </p>
                            <p>
                                Das Besondere daran: Die Werbung unterbricht nicht – sie ergänzt. Ein Nutzer, der ChatGPT fragt „Welchen
                                Steuerberater in Berlin empfiehlst du?" könnte Ihre Anzeige als natürliche Empfehlung innerhalb der
                                KI-Antwort sehen. Diese Form der kontextuellen Werbung ist deutlich höherwertiger als traditionelle
                                Banner- oder Textanzeigen, da sie genau im Moment des höchsten Interesses erscheint und als Teil der
                                vertrauenswürdigen KI-Antwort wahrgenommen wird.
                            </p>
                            <p>
                                OpenAI hat angekündigt, das Werbeformat schrittweise international auszurollen – nach dem erfolgreichen
                                US-Start ist Europa der nächste Markt. Für deutsche Unternehmen bedeutet das: <strong>Jetzt ist der
                                    ideale Zeitpunkt</strong>, sich strategisch vorzubereiten. Wer die Mechanismen versteht und seine
                                Kampagnen vorbereitet, wird beim Launch sofort durchstarten können – mit deutlich niedrigeren Kosten
                                als Nachzügler, die erst reagieren, wenn der Wettbewerb bereits etabliert ist.
                            </p>
                            <p>
                                Als <strong>KI Ads Beratung</strong> begleiten wir Sie durch den gesamten Prozess: Von der
                                Grundlagenanalyse Ihrer aktuellen Werbearchitektur über die Entwicklung einer KI-Ads-Strategie bis hin
                                zur operativen Umsetzung und laufenden Optimierung. Unser Ansatz kombiniert tiefes technisches
                                Verständnis der OpenAI-Plattform mit bewährter Werbestrategie-Expertise aus über 15 Jahren
                                digitalem Marketing.
                            </p>

                            <table className="comparison-table">
                                <thead>
                                    <tr>
                                        <th>Kriterium</th>
                                        <th>Google Ads</th>
                                        <th>KI Ads / ChatGPT Ads</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Targeting</td>
                                        <td>Keyword-basiert</td>
                                        <td>Konversationskontext & Intent</td>
                                    </tr>
                                    <tr>
                                        <td>Anzeigenformat</td>
                                        <td>Separate Textanzeigen</td>
                                        <td>Nativ in KI-Antwort integriert</td>
                                    </tr>
                                    <tr>
                                        <td>Nutzerwahrnehmung</td>
                                        <td>Als Werbung erkennbar</td>
                                        <td>Als Empfehlung wahrgenommen</td>
                                    </tr>
                                    <tr>
                                        <td>Zeitpunkt</td>
                                        <td>Bei Suchanfrage</td>
                                        <td>Im Konversationsfluss</td>
                                    </tr>
                                    <tr>
                                        <td>Vertrauensfaktor</td>
                                        <td>Mittel (bekannt als Ads)</td>
                                        <td>Hoch (Teil der KI-Antwort)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </FadeIn>

                        <FadeIn className="slide-in-right">
                            <h3 className="headline-md" style={{ marginBottom: 'var(--space-md)' }}>KI-Plattformen mit Werbepotenzial</h3>
                            <div className="ai-platforms">
                                <div className="ai-platform">
                                    <span className="ai-platform__icon">💬</span>
                                    <div>
                                        <div className="ai-platform__name">ChatGPT Ads</div>
                                        <small style={{ color: 'var(--color-white-40)' }}>OpenAI – Live in USA</small>
                                    </div>
                                </div>
                                <div className="ai-platform">
                                    <span className="ai-platform__icon">🔍</span>
                                    <div>
                                        <div className="ai-platform__name">Perplexity Ads</div>
                                        <small style={{ color: 'var(--color-white-40)' }}>Sponsored Results</small>
                                    </div>
                                </div>
                                <div className="ai-platform">
                                    <span className="ai-platform__icon">✨</span>
                                    <div>
                                        <div className="ai-platform__name">Google AI Overviews</div>
                                        <small style={{ color: 'var(--color-white-40)' }}>Ads in AI Antworten</small>
                                    </div>
                                </div>
                                <div className="ai-platform">
                                    <span className="ai-platform__icon">🧠</span>
                                    <div>
                                        <div className="ai-platform__name">Bing Copilot Ads</div>
                                        <small style={{ color: 'var(--color-white-40)' }}>Microsoft AI Ads</small>
                                    </div>
                                </div>
                                <div className="ai-platform">
                                    <span className="ai-platform__icon">🌐</span>
                                    <div>
                                        <div className="ai-platform__name">Meta AI Ads</div>
                                        <small style={{ color: 'var(--color-white-40)' }}>Social AI Integration</small>
                                    </div>
                                </div>
                                <div className="ai-platform">
                                    <span className="ai-platform__icon">🎯</span>
                                    <div>
                                        <div className="ai-platform__name">Amazon Rufus Ads</div>
                                        <small style={{ color: 'var(--color-white-40)' }}>E-Commerce AI</small>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card" style={{ marginTop: 'var(--space-md)', padding: 'var(--space-md)' }}>
                                <p style={{ color: 'var(--color-white-80)', fontSize: '0.95rem', fontStyle: 'italic', lineHeight: 1.7 }}>
                                    „<strong>KI Ads</strong> sind nicht einfach ein weiterer Werbekanal – sie sind eine fundamentale
                                    Veränderung der Art, wie Verbraucher mit Werbung interagieren. Wer jetzt die Grundlagen legt,
                                    wird die Werbelandschaft der nächsten Dekade dominieren."
                                </p>
                                <p style={{ color: 'var(--color-positive-green)', fontSize: '0.85rem', marginTop: '0.5rem', marginBottom: 0 }}>
                                    — Tobias Sander, Geschäftsführer famefact
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          LEISTUNGEN / SERVICES
      ═══════════════════════════════════════ */}
            <section className="section section--alt" id="leistungen">
                <div className="container">
                    <FadeIn>
                        <div className="text-center">
                            <span className="section-label">Unsere Leistungen</span>
                            <h2 className="headline-lg">Ganzheitliche KI Ads Beratung für Ihren Werbeerfolg</h2>
                            <p className="body-lg" style={{ maxWidth: 700, margin: '0 auto' }}>
                                Unsere KI Ads Beratung deckt den gesamten Lebenszyklus einer erfolgreichen KI-Werbekampagne ab –
                                von der strategischen Vorbereitung über die kreative Umsetzung bis zum datengetriebenen Performance-Monitoring.
                                Wir machen Sie bereit für die Zukunft der Werbung.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="services__grid">
                        <FadeIn delay={100}>
                            <article className="glass-card service-card">
                                <span className="service-card__number">01</span>
                                <div className="service-card__icon">🔬</div>
                                <h3>KI Ads Readiness Audit</h3>
                                <p>
                                    Wir analysieren Ihre aktuelle Werbestrategie und bewerten, wie bereit Ihr Unternehmen für KI Ads ist.
                                    Der Audit umfasst eine Analyse Ihrer bestehenden Ad-Konten, Zielgruppen-Segmentierung, Content-Qualität
                                    und technischen Infrastruktur. Sie erhalten einen detaillierten Report mit konkreten Handlungsempfehlungen
                                    und einer priorisierten Roadmap für den Einstieg in ChatGPT Werbung.
                                </p>
                            </article>
                        </FadeIn>

                        <FadeIn delay={200}>
                            <article className="glass-card service-card">
                                <span className="service-card__number">02</span>
                                <div className="service-card__icon">📝</div>
                                <h3>KI-optimierte Anzeigenerstellung</h3>
                                <p>
                                    KI Ads erfordern eine völlig andere Kreativstrategie als klassische Anzeigen. Wir erstellen Werbebotschaften,
                                    die nativ in KI-Konversationen funktionieren: natürliche Sprache, kontextuell relevant, informativ statt
                                    reißerisch. Unsere Creative-Strategie basiert auf tiefem Verständnis von LLM-Konversationsflüssen und
                                    berücksichtigt die speziellen Anforderungen von ChatGPT Ads an Tonalität und Informationsdichte.
                                </p>
                            </article>
                        </FadeIn>

                        <FadeIn delay={300}>
                            <article className="glass-card service-card">
                                <span className="service-card__number">03</span>
                                <div className="service-card__icon">🎯</div>
                                <h3>Intent-basiertes Targeting</h3>
                                <p>
                                    Das Targeting bei KI Ads basiert nicht auf Keywords oder Demografie, sondern auf dem
                                    Konversationskontext und der Nutzerintention. Wir entwickeln präzise Targeting-Strategien, die
                                    sicherstellen, dass Ihre Anzeigen genau dann erscheinen, wenn potenzielle Kunden relevante Fragen
                                    stellen. Diese kontextuelle Präzision übertrifft traditionelles Keyword-Targeting bei weitem
                                    und sorgt für höhere Conversion-Raten bei gleichzeitig niedrigeren Kosten pro Akquisition.
                                </p>
                            </article>
                        </FadeIn>

                        <FadeIn delay={400}>
                            <article className="glass-card service-card">
                                <span className="service-card__number">04</span>
                                <div className="service-card__icon">📊</div>
                                <h3>Performance Monitoring & Analytics</h3>
                                <p>
                                    Wir implementieren umfassende Tracking- und Analytics-Systeme für Ihre KI Ads Kampagnen. Dies
                                    umfasst Conversion-Tracking speziell für KI-Plattformen, Attribution-Modelle für den
                                    KI-Werbekanal, A/B-Testing von Anzeigenvarianten und monatliche Performance-Reports mit
                                    konkreten KPIs wie Cost per Acquisition (CPA), Click-Through-Rate (CTR), Conversion Rate
                                    und Return on Ad Spend (ROAS) im Vergleich zu Ihren bestehenden Werbekanälen.
                                </p>
                            </article>
                        </FadeIn>

                        <FadeIn delay={500}>
                            <article className="glass-card service-card">
                                <span className="service-card__number">05</span>
                                <div className="service-card__icon">💰</div>
                                <h3>Budget-Strategie & Bid Management</h3>
                                <p>
                                    Wir entwickeln eine optimale Budget-Allokation zwischen Ihren bestehenden Werbekanälen und dem
                                    neuen KI-Ads-Kanal. Unsere Bid-Management-Strategie berücksichtigt die einzigartigen Auktionsmechanismen
                                    der KI-Plattformen und nutzt datengetriebene Optimierung, um Ihren Return on Investment zu
                                    maximieren. Besonders in der Early-Adopter-Phase sind die Kosten pro Klick deutlich niedriger
                                    als bei etablierten Kanälen – diesen Vorteil nutzen wir strategisch aus.
                                </p>
                            </article>
                        </FadeIn>

                        <FadeIn delay={600}>
                            <article className="glass-card service-card">
                                <span className="service-card__number">06</span>
                                <div className="service-card__icon">🔗</div>
                                <h3>Integration & Cross-Channel-Strategie</h3>
                                <p>
                                    KI Ads entfalten ihre volle Wirkung erst im Zusammenspiel mit Ihren bestehenden Marketing-Kanälen.
                                    Wir integrieren Ihre KI Ads Kampagnen nahtlos in Ihre Google Ads, Social Media Ads und
                                    Content-Marketing-Strategie. Dazu gehört auch die Optimierung Ihrer organischen KI-Sichtbarkeit (GEO),
                                    damit bezahlte und organische Präsenz in KI-Plattformen sich gegenseitig verstärken
                                    und eine konsistente Markenpräsenz über alle Touchpoints entsteht.
                                </p>
                            </article>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          WARUM FAMEFACT
      ═══════════════════════════════════════ */}
            <section className="section" id="warum-famefact">
                <div className="container">
                    <FadeIn>
                        <span className="section-label">Ihre Vorteile</span>
                        <h2 className="headline-lg">Warum famefact als KI Ads Beratung?</h2>
                    </FadeIn>

                    <div className="why__grid">
                        <FadeIn className="why__content slide-in-left">
                            <p>
                                Als eine der ersten spezialisierten Agenturen für KI-Marketing in Deutschland bringen wir eine
                                einzigartige Kombination aus Werbeerfahrung, technischem KI-Know-how und strategischer Beratungskompetenz
                                mit. Seit unserer Gründung 2010 in Berlin haben wir über 100 Unternehmen im digitalen Marketing begleitet
                                und kennen die Herausforderungen und Chancen jeder neuen Plattform aus erster Hand.
                            </p>
                            <p>
                                Der entscheidende Unterschied: Wir beschäftigen uns nicht erst seit gestern mit KI. Mit einem
                                Netzwerk von über 20 spezialisierten Domains im Bereich KI-Marketing, GEO und LLMO haben wir
                                tiefgreifende Expertise im Ökosystem der KI-Plattformen aufgebaut. Wir verstehen, wie ChatGPT,
                                Perplexity und Google AI funktionieren – und wie Werbung in diesem Umfeld konzipiert sein muss,
                                um echten Mehrwert zu liefern und gleichzeitig Business-Ergebnisse zu erzielen.
                            </p>

                            <div className="usp-list">
                                <div className="usp-item">
                                    <div className="usp-item__icon">🏢</div>
                                    <div className="usp-item__content">
                                        <h4>Berliner Agentur mit 15+ Jahren Erfahrung</h4>
                                        <p>Seit 2010 im digitalen Marketing – wir kennen jede Plattform-Evolution.</p>
                                    </div>
                                </div>
                                <div className="usp-item">
                                    <div className="usp-item__icon">🤖</div>
                                    <div className="usp-item__content">
                                        <h4>KI-First Expertise</h4>
                                        <p>20+ spezialisierte Domains im KI-Marketing-Ökosystem. Tiefes technisches LLM-Verständnis.</p>
                                    </div>
                                </div>
                                <div className="usp-item">
                                    <div className="usp-item__icon">📈</div>
                                    <div className="usp-item__content">
                                        <h4>Datengetriebene Ergebnisse</h4>
                                        <p>Transparentes Performance-Tracking mit monatlichen Reports und klaren KPIs.</p>
                                    </div>
                                </div>
                                <div className="usp-item">
                                    <div className="usp-item__icon">⚡</div>
                                    <div className="usp-item__content">
                                        <h4>Early-Adopter-Vorteil sichern</h4>
                                        <p>Wir bereiten Sie vor dem Europa-Launch vor – niedrigere Kosten, weniger Wettbewerb.</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn className="slide-in-right">
                            <div className="why__stats">
                                <div className="glass-card stat-card">
                                    <div className="stat-card__number">15+</div>
                                    <div className="stat-card__label">Jahre Erfahrung</div>
                                </div>
                                <div className="glass-card stat-card">
                                    <div className="stat-card__number">100+</div>
                                    <div className="stat-card__label">Zufriedene Kunden</div>
                                </div>
                                <div className="glass-card stat-card">
                                    <div className="stat-card__number">20+</div>
                                    <div className="stat-card__label">KI-Domains</div>
                                </div>
                                <div className="glass-card stat-card">
                                    <div className="stat-card__number">Berlin</div>
                                    <div className="stat-card__label">Standort & ♥</div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          PROZESS
      ═══════════════════════════════════════ */}
            <section className="section section--alt" id="prozess">
                <div className="container">
                    <FadeIn>
                        <div className="text-center">
                            <span className="section-label">So arbeiten wir</span>
                            <h2 className="headline-lg">Unser bewährter KI Ads Beratungsprozess</h2>
                            <p className="body-lg" style={{ maxWidth: 700, margin: '0 auto' }}>
                                In vier klar definierten Phasen bereiten wir Ihr Unternehmen auf KI Ads vor und begleiten Sie
                                von der Strategie bis zur laufenden Kampagnenoptimierung. Jede Phase baut auf der vorherigen auf
                                und wird durch datengetriebene Entscheidungen gesteuert.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="process__steps">
                        {[
                            { num: 1, title: 'Analyse', desc: 'Umfassender KI Ads Readiness Audit: Bewertung Ihrer aktuellen Werbestrategie, Zielgruppen und technischen Infrastruktur für den Einstieg in ChatGPT Werbung.' },
                            { num: 2, title: 'Strategie', desc: 'Maßgeschneiderte KI-Ads-Strategie mit Budget-Allokation, Creative-Konzept, Targeting-Plan und Zeitplan für den optimalen Markteintritt.' },
                            { num: 3, title: 'Umsetzung', desc: 'Implementierung aller Kampagnen: Anzeigenerstellung, Targeting-Setup, Tracking-Integration und Launch-Vorbereitung für den Europa-Start.' },
                            { num: 4, title: 'Optimierung', desc: 'Kontinuierliches Performance-Monitoring, A/B-Testing, Bid-Optimierung und monatliche Reports mit konkreten ROAS-Verbesserungen.' },
                        ].map((step, i) => (
                            <FadeIn key={step.num} delay={i * 150}>
                                <div className="step-card">
                                    <div className="step-card__number">{step.num}</div>
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          FAQ
      ═══════════════════════════════════════ */}
            <section className="section" id="faq">
                <div className="container">
                    <FadeIn>
                        <div className="text-center">
                            <span className="section-label">Häufige Fragen</span>
                            <h2 className="headline-lg">Alles über KI Ads, ChatGPT Werbung & OpenAI Ads</h2>
                            <p className="body-lg" style={{ maxWidth: 700, margin: '0 auto' }}>
                                Die wichtigsten Fragen und Antworten rund um KI Ads in ChatGPT, OpenAI Werbung und den
                                Einstieg in KI-gestützte Werbekampagnen – verständlich erklärt.
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn>
                        <div className="faq__list" itemScope itemType="https://schema.org/FAQPage">
                            <FaqItem
                                question="Was sind KI Ads in ChatGPT?"
                                answer="KI Ads in ChatGPT sind ein neues Werbeformat von OpenAI, bei dem Anzeigen nativ in die KI-generierten Antworten von ChatGPT integriert werden. Statt klassischer Banner oder Textanzeigen erscheinen die Werbebotschaften kontextuell passend innerhalb der Konversation – genau dann, wenn der Nutzer ein relevantes Thema bespricht. Dieses Format wurde bereits in den USA eingeführt und wird bald auch in Europa und Deutschland verfügbar sein. Die Anzeigen sind als gesponserte Inhalte gekennzeichnet, wirken aber deutlich natürlicher als traditionelle Online-Werbung."
                            />
                            <FaqItem
                                question="Wann kommen KI Ads nach Deutschland und Europa?"
                                answer="OpenAI hat KI Ads zunächst in den USA gestartet und plant eine schrittweise Expansion nach Europa und Deutschland. Experten rechnen mit einem Launch in der EU im Laufe von 2026. Unternehmen, die sich jetzt vorbereiten, sichern sich einen entscheidenden Wettbewerbsvorteil als Early Adopter und profitieren von niedrigeren Werbekosten bei geringerem Wettbewerb – genau wie bei den frühen Google Ads Jahren."
                            />
                            <FaqItem
                                question="Warum brauche ich eine KI Ads Beratung?"
                                answer="KI Ads funktionieren grundlegend anders als klassische Google Ads oder Social Media Ads. Die Anzeigen werden in einen Konversationskontext eingebettet und erfordern ein tiefes Verständnis von KI-Plattformen, Prompt-Kontexten und natürlicher Sprache. Eine spezialisierte KI Ads Beratung hilft Ihnen, von Anfang an die richtigen Strategien zu entwickeln, teure Anfängerfehler zu vermeiden und Ihr Werbebudget effizient einzusetzen. Ohne Expertise riskieren Sie ineffektive Kampagnen und verpasste Chancen."
                            />
                            <FaqItem
                                question="Was kostet KI Ads Beratung?"
                                answer="Die Kosten für eine KI Ads Beratung variieren je nach Umfang und Komplexität. Strategische Erstberatungen und Readiness-Audits beginnen bei 2.000€. Laufende Kampagnenbetreuung und Optimierung liegt typischerweise bei 1.500–5.000€ pro Monat, abhängig von Budget und Branche. Das Werbebudget selbst kommt separat hinzu. Wir erstellen Ihnen ein individuelles Angebot nach einer kostenlosen Erstanalyse, in der wir Ihre Ausgangslage und Potenziale bewerten."
                            />
                            <FaqItem
                                question="Wie unterscheiden sich KI Ads von Google Ads?"
                                answer="Google Ads basieren auf Keyword-Matching und erscheinen als separate Anzeigen in Suchergebnislisten. KI Ads in ChatGPT werden hingegen kontextuell in eine laufende Konversation integriert. Der Nutzer erlebt die Werbung als natürlichen Teil der KI-Antwort, nicht als unterbrechende Anzeige. Dies erfordert eine völlig neue Herangehensweise bei Targeting (Konversationskontext statt Keywords), Kreation (natürliche Sprache statt Headlines und Descriptions) und Erfolgsmessung (Engagement-Metriken statt nur CTR)."
                            />
                            <FaqItem
                                question="Für welche Branchen eignen sich KI Ads besonders?"
                                answer="KI Ads eignen sich besonders für Branchen mit hohem Beratungsbedarf und erklärungsbedürftigen Produkten: Finanzdienstleister, Versicherungen, SaaS-Unternehmen, B2B-Dienstleister, E-Commerce, Rechtsanwälte, Steuerberater, Gesundheitswesen, Immobilien und Bildungsanbieter. Je komplexer das Produkt oder die Dienstleistung, desto besser können KI Ads ihre Stärke ausspielen – kontextuelle, erklärende Werbung direkt in der Konversation, genau im Moment des höchsten Interesses."
                            />
                            <FaqItem
                                question="Kann ich KI Ads schon jetzt vorbereiten?"
                                answer="Ja, und das empfehlen wir dringend. Die Vorbereitung umfasst die Optimierung Ihrer digitalen Präsenz für KI-Systeme (GEO – Generative Engine Optimization), den Aufbau von Entity Authority und Brand Authority in KI-Datenbanken, die Erstellung KI-optimierter Inhalte sowie die Entwicklung einer KI-Ads-Strategie mit Budget-Planung. Wer jetzt die Grundlagen legt, kann beim Europa-Launch sofort durchstarten und profitiert von niedrigeren Kosten bei geringerem Wettbewerb."
                            />
                            <FaqItem
                                question="Wie funktioniert das Targeting bei KI Ads?"
                                answer="Das Targeting bei KI Ads basiert nicht auf demografischen Daten oder Keywords, sondern auf dem Konversationskontext. Die KI erkennt, worüber der Nutzer spricht, welche Fragen er stellt und welches Informationsbedürfnis besteht. Darauf basierend werden kontextuell passende Anzeigen ausgespielt. Dies ermöglicht ein hochpräzises Intent-basiertes Targeting, das klassischen Werbeformaten überlegen ist. Statt zu raten, was der Nutzer sucht, weiß die KI es – weil der Nutzer es ihr direkt sagt."
                            />
                            <FaqItem
                                question="Was ist der Unterschied zwischen KI Ads und GEO?"
                                answer="GEO (Generative Engine Optimization) optimiert Ihre organische Sichtbarkeit in KI-Antworten – Sie werden als Quelle zitiert und empfohlen, ohne dafür direkt zu bezahlen. KI Ads sind bezahlte Werbeplätze innerhalb von KI-Konversationen mit sofortiger Wirkung. Beide Strategien ergänzen sich optimal: GEO baut langfristige Autorität und Vertrauen auf, KI Ads liefern sofortige Sichtbarkeit und messbares Performance-Marketing. Unsere Beratung deckt beides ab und entwickelt eine integrierte Strategie."
                            />
                            <FaqItem
                                question="Warum famefact als KI Ads Berater wählen?"
                                answer="famefact ist seit 2010 in Berlin im digitalen Marketing aktiv und war eine der ersten Agenturen in Deutschland, die sich auf KI-Marketing spezialisiert hat. Mit über 100 betreuten Kunden, einem Netzwerk von 20+ spezialisierten Domains im KI-Bereich und tiefem technischem Verständnis von OpenAI, ChatGPT und LLM-Systemen sind wir der ideale Partner für Ihre KI Ads Strategie. Wir bieten keine generische Beratung, sondern maßgeschneiderte Strategien, die auf Ihre Branche, Ihre Ziele und Ihr Budget zugeschnitten sind."
                            />
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ═══════════════════════════════════════
          KONTAKT / CTA
      ═══════════════════════════════════════ */}
            <section className="section contact" id="kontakt">
                <div className="container">
                    <FadeIn>
                        <div className="text-center">
                            <span className="section-label">Jetzt starten</span>
                            <h2 className="headline-lg">Bereit für die Zukunft der KI-Werbung?</h2>
                            <p className="body-lg" style={{ maxWidth: 700, margin: '0 auto' }}>
                                Lassen Sie uns in einem kostenlosen Erstgespräch analysieren, wie Ihr Unternehmen von
                                KI Ads in ChatGPT profitieren kann – und wie wir Sie optimal auf den europäischen Launch vorbereiten.
                                Sichern Sie sich jetzt Ihren Early-Adopter-Vorteil.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="contact__grid">
                        <FadeIn className="slide-in-left">
                            <ContactForm />
                        </FadeIn>

                        <FadeIn className="slide-in-right">
                            <div className="contact-info">
                                <h3>Direkt Kontakt aufnehmen</h3>
                                <p>
                                    Sie möchten lieber direkt mit uns sprechen? Kein Problem – schreiben Sie uns eine E-Mail
                                    und wir melden uns innerhalb von 24 Stunden bei Ihnen zurück.
                                </p>

                                <div className="contact-detail">
                                    <div className="contact-detail__icon">📧</div>
                                    <div className="contact-detail__text">
                                        <a href="mailto:info@famefact.com">info@famefact.com</a>
                                    </div>
                                </div>

                                <div className="contact-detail">
                                    <div className="contact-detail__icon">📍</div>
                                    <div className="contact-detail__text">
                                        Schliemannstr. 23, 10437 Berlin
                                    </div>
                                </div>

                                <div className="contact-detail">
                                    <div className="contact-detail__icon">🌐</div>
                                    <div className="contact-detail__text">
                                        <a href="https://famefact.com" target="_blank" rel="noopener noreferrer">famefact.com</a>
                                    </div>
                                </div>

                                <div className="glass-card" style={{ marginTop: 'var(--space-lg)', padding: 'var(--space-md)' }}>
                                    <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>✓ Kostenlose Erstanalyse</h4>
                                    <p style={{ color: 'var(--color-white-60)', fontSize: '0.9rem', marginBottom: 0, lineHeight: 1.7 }}>
                                        Wir analysieren Ihre aktuelle Werbestrategie und bewerten Ihr KI-Ads-Potenzial
                                        kostenlos und unverbindlich. Sie erhalten einen kompakten Report mit den wichtigsten
                                        Erkenntnissen und konkreten nächsten Schritten.
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>
        </>
    )
}
