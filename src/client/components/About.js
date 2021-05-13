import React from 'react'
import { NavLink } from 'react-router-dom'
import { Section } from './Styles'

const About = () => {
  return (
    <>
      <Section>
        <div>
          <h1>Kaikki mukaan juomaan kaljaa!</h1>
        </div>
      </Section>
      <Section>
        <div>
          <p>
            Kumpulan Seudun Kaljanne, lyhenne <strong>KSK</strong> (ruots.{' '}
            <em>Gumtäktsregionens Bärs</em>) on Kumpulan seudun kaljapaikoista vastaava toimiyhtymä.
            KSK:n järjestelmään kuuluvat kaikki Suur-Kumpulan alueen (ml. Käpylän ja Arabian)
            anniskeluravintolat, joista tarjoamme jäsenillemme ajankohtaista tietoa ja
            inspiraatiota.
          </p>
          <p>
            KSK suunnittelee toimialueensa kaljapaikkojen saatavuuden ja kattavuuden sekä
            kilpailuttaa niiden tuottajat että vastaa alueen ajankohtaisesta tiedotuksesta, mm.
            happy hour -tarjouksista. Lisäksi KSK ylläpitää virallista ja huippusuosittua{' '}
            <NavLink to="/top">
              <em>kumpulan seudun ranking-listaa</em>
            </NavLink>
            , jonka kärkipaikoista on vuosi toisensa jälkeen taistelleet Kumpulan kaljapaikkojen
            kerma sekä ko. paikkojen asiakaskunta.
          </p>

          <p>
            KSK:n johtoryhmä koostuu alan kivenkovista veteraaneista, sillä hallituksen
            puheenjohtajaksi saatiin napattua vuonna 1969 silloisen Porin Oluttehtaan (
            <em>nyk. Sinebrychoff</em>) toimitus- ja kehitysjohtaja FM Petri "Linja-veto" Pennanen.
            Pennasen aloitettua KSK:n johdossa ja puheenjohtajana yhtymämme kehitys on ollut
            lähtökohtaisesti nousujohtoista ja jäsenmäärämme onkin kasvanut yli 100%.
          </p>

          <p>Toimistomme yhteystiedot:</p>

          <p>
            DK115, Exactum, PL 68, Pietari Kalmin katu 5<br />
            00014 Helsingin Yliopisto
          </p>
        </div>
      </Section>
    </>
  )
}

export default About
