import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function Datenschutz() {
    return (
        <div className="legal-page">
            <Helmet>
                <title>Datenschutz | KI Ads Beratung – famefact</title>
                <meta name="description" content="Datenschutzerklärung der KI Ads Beratung ki-ads-beratung.de – Ein Service von famefact / track by track GmbH." />
                <meta name="robots" content="noindex, follow" />
            </Helmet>
            <div className="container">
                <Link to="/" className="back-link">← Zurück zur Startseite</Link>
                <h1>Datenschutzerklärung</h1>

                <h2>1. Verantwortlicher</h2>
                <p>
                    Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
                    track by track GmbH<br />
                    Schliemannstr. 23<br />
                    10437 Berlin<br />
                    E-Mail: <a href="mailto:info@famefact.com">info@famefact.com</a>
                </p>

                <h2>2. Erhebung und Speicherung personenbezogener Daten</h2>
                <p>
                    Beim Besuch unserer Website werden automatisch Informationen durch den Server-Logfile erfasst.
                    Diese Daten sind nicht bestimmten Personen zuordenbar und werden nicht mit anderen Datenquellen zusammengeführt.
                </p>
                <p>Erfasst werden:</p>
                <ul>
                    <li>Browsertyp und -version</li>
                    <li>Verwendetes Betriebssystem</li>
                    <li>Referrer URL</li>
                    <li>Hostname des zugreifenden Rechners</li>
                    <li>Uhrzeit der Serveranfrage</li>
                    <li>IP-Adresse (anonymisiert)</li>
                </ul>

                <h2>3. Kontaktformular</h2>
                <p>
                    Wenn Sie uns über das Kontaktformular kontaktieren, werden Ihre Angaben (Name, E-Mail-Adresse,
                    Unternehmen, Nachricht) zur Bearbeitung Ihrer Anfrage gespeichert und verarbeitet.
                    Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung)
                    bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).
                </p>
                <p>
                    Ihre Kontaktdaten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nach
                    Erledigung gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
                </p>

                <h2>4. Weitergabe von Daten</h2>
                <p>
                    Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den im Folgenden aufgeführten
                    Zwecken findet nicht statt. Wir nutzen den Dienst Slack (Salesforce, Inc.) zur internen Verarbeitung
                    von Kontaktanfragen. Die Datenverarbeitung erfolgt auf Grundlage eines Auftragsverarbeitungsvertrags
                    gemäß Art. 28 DSGVO.
                </p>

                <h2>5. Ihre Rechte</h2>
                <p>Sie haben das Recht:</p>
                <ul>
                    <li>Auskunft über Ihre bei uns gespeicherten Daten zu erhalten (Art. 15 DSGVO)</li>
                    <li>Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
                    <li>Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
                    <li>Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO)</li>
                    <li>Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)</li>
                    <li>Widerspruch gegen die Verarbeitung einzulegen (Art. 21 DSGVO)</li>
                    <li>Sich bei einer Aufsichtsbehörde zu beschweren (Art. 77 DSGVO)</li>
                </ul>

                <h2>6. SSL/TLS-Verschlüsselung</h2>
                <p>
                    Diese Seite nutzt aus Sicherheitsgründen eine SSL/TLS-Verschlüsselung. Eine verschlüsselte
                    Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://"
                    wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                </p>

                <h2>7. Hosting</h2>
                <p>
                    Diese Website wird bei Vercel Inc. gehostet. Details zur Datenverarbeitung durch Vercel finden
                    Sie in deren Datenschutzerklärung unter <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">vercel.com/legal/privacy-policy</a>.
                </p>

                <h2>8. Änderungen dieser Datenschutzerklärung</h2>
                <p>
                    Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen
                    rechtlichen Anforderungen entspricht.
                </p>

                <p><em>Stand: März 2026</em></p>
            </div>
        </div>
    )
}
