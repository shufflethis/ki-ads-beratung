import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function AGB() {
    return (
        <div className="legal-page">
            <Helmet>
                <title>AGB | KI Ads Beratung – famefact</title>
                <meta name="description" content="Allgemeine Geschäftsbedingungen der KI Ads Beratung ki-ads-beratung.de – Ein Service von famefact / track by track GmbH." />
                <meta name="robots" content="noindex, follow" />
            </Helmet>
            <div className="container">
                <Link to="/" className="back-link">← Zurück zur Startseite</Link>
                <h1>Allgemeine Geschäftsbedingungen (AGB)</h1>

                <h2>§ 1 Geltungsbereich</h2>
                <p>
                    Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen der track by track GmbH,
                    Schliemannstr. 23, 10437 Berlin (nachfolgend „Agentur") und dem Auftraggeber (nachfolgend „Kunde") über
                    Beratungs- und Dienstleistungen im Bereich KI Ads, ChatGPT Werbung und digitales Marketing.
                </p>

                <h2>§ 2 Vertragsgegenstand</h2>
                <p>
                    Die Agentur erbringt Beratungsleistungen im Bereich KI Ads und KI-gestützter Werbung. Der genaue Umfang
                    der Leistungen ergibt sich aus dem jeweiligen Angebot bzw. der Leistungsbeschreibung.
                </p>

                <h2>§ 3 Leistungserbringung</h2>
                <p>
                    Die Agentur erbringt ihre Leistungen nach bestem Wissen und Gewissen unter Einhaltung der anerkannten
                    Regeln und Standards der Branche. Die Agentur schuldet eine sorgfältige Leistungserbringung, nicht jedoch
                    einen bestimmten Erfolg der Beratung oder Kampagne.
                </p>

                <h2>§ 4 Vergütung und Zahlungsbedingungen</h2>
                <p>
                    Die Vergütung richtet sich nach dem individuellen Angebot. Alle Preise verstehen sich zuzüglich der
                    gesetzlichen Umsatzsteuer. Rechnungen sind innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug
                    zahlbar.
                </p>

                <h2>§ 5 Mitwirkungspflichten des Kunden</h2>
                <p>
                    Der Kunde stellt der Agentur alle für die Leistungserbringung erforderlichen Informationen, Zugänge
                    und Materialien rechtzeitig zur Verfügung. Verzögerungen durch fehlende Mitwirkung gehen nicht zulasten
                    der Agentur.
                </p>

                <h2>§ 6 Vertraulichkeit</h2>
                <p>
                    Beide Vertragsparteien verpflichten sich, alle im Rahmen der Zusammenarbeit erlangten vertraulichen
                    Informationen geheim zu halten und nicht an Dritte weiterzugeben.
                </p>

                <h2>§ 7 Haftung</h2>
                <p>
                    Die Agentur haftet nur für Schäden, die auf vorsätzlichem oder grob fahrlässigem Verhalten beruhen.
                    Die Haftung für leichte Fahrlässigkeit ist auf die Verletzung wesentlicher Vertragspflichten beschränkt.
                    Die Haftung ist der Höhe nach auf den vorhersehbaren, vertragstypischen Schaden begrenzt.
                </p>

                <h2>§ 8 Laufzeit und Kündigung</h2>
                <p>
                    Die Vertragslaufzeit ergibt sich aus dem jeweiligen Angebot. Sofern nicht anders vereinbart, können
                    laufende Verträge mit einer Frist von 30 Tagen zum Monatsende gekündigt werden. Das Recht zur
                    außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
                </p>

                <h2>§ 9 Schlussbestimmungen</h2>
                <p>
                    Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist Berlin. Sollten einzelne Bestimmungen
                    unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
                </p>

                <p><em>Stand: März 2026</em></p>
            </div>
        </div>
    )
}
