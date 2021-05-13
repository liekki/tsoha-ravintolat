import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ScrollToTop from './ScrollToTop'
import Header from './Header'
import Page from './Page'

import Login from './Login'
import Logout from './Logout'
import Register from './Register'
import Profile from './Profile'
import Admin from './Admin'

import { GlobalStyles, Section, Wrapper } from './Styles'

const Home = () => {
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

const Top = () => {
  return (
    <>
      <Section>
        <div>
          <h1>KSK:n ranking-lista</h1>
        </div>
      </Section>
      <Section>
        <div>
          <p>
            Parhaat kaljapaikat ovat tunnetusti niitä, joissa tuntee olonsa kuin kotonaan. Tätä
            tunnetta me kaikki metsästämme etsiessämme paikkoja juoda kaljaa. KSK:n ranking-listalta
            löydät kaikki vuoden 2021 kuumimmat kaljapaikat!
          </p>
        </div>
      </Section>
    </>
  )
}

const Search = () => {
  return <div>Etsi lempiravintolasi Kumpulasta!</div>
}

const About = () => {
  return <div>Bönthöö bönthöö bönthöö!</div>
}

const App = () => {
  return (
    <Wrapper>
      <Header />
      <Page>
        <ScrollToTop />
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/about" exact={true} component={About} />
          <Route path="/top" exact={true} component={Top} />
          <Route path="/search" exact={true} component={Search} />
          <Route path="/login" exact={true} component={Login} />
          <Route path="/logout" exact={true} component={Logout} />
          <Route path="/profile" exact={true} component={Profile} />
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/register" exact={true} component={Register} />
          <Route component={() => <p>404!</p>} />
        </Switch>
      </Page>
      <GlobalStyles />
    </Wrapper>
  )
}

export default App
