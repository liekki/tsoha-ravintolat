import React, { useState } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled, { createGlobalStyle } from 'styled-components'

import Login from './Login'
import Logout from './Logout'
import Register from './Register'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  html,body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Quicksand', sans-serif;
  }

  body {
    min-height: 100%;
  }

  a {
    color: #007ac9;
    &:visited {
      color: #0762A1;
    }
  }
`

const Wrapper = styled.div``

const Header = styled.header`
  height: 70px;
  background: #007ac9;

  ${(props) =>
    props.mobileMenuVisible &&
    `
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
  `}
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;

  @media all and (max-width: 1024px) {
    display: none;
  }
`

const NavMobile = styled.nav`
  display: none;
  justify-content: space-between;

  @media all and (max-width: 1024px) {
    display: flex;
  }
`

const NavSection = styled.div`
  display: flex;
`

const Logo = styled(NavLink)`
  height: 40px;
  width: 104px;
  padding: 15px 20px 15px 30px;
  display: flex;
  background: url(/static/img/logo-white.svg) center center no-repeat;
  background-size: 104px 40px;
`

const NavList = styled.ul`
  flex-wrap: wrap;
  display: flex;
  align-items: center;
`

const NavListItem = styled.li`
  position: relative;
  list-style-type: none;
  height: 70px;
`

const Link = styled(NavLink)`
  display: flex;
  height: 70px;
  padding: 0px 20px;
  color: #fff;
  font-weight: 600;
  align-items: center;
  text-decoration: none;

  &:visited {
    color: #fff;
  }

  &.active .underline {
    background-color: #fff;
  }

  &:hover {
    background: #0068ab;

    .underline {
      background-color: #fff;
    }
  }

  ${(props) =>
    props.type === 'user' &&
    `
    &:before {
      content: '';
      display: inline-block;
      width: 22px;
      height: 70px;
      background: url(/static/img/guy2.svg) center center no-repeat;
      background-size: 22px 25px;
    }

    .username {
      margin-left: 10px;
    }
  `}

  ${(props) =>
    props.type === 'logout' &&
    `
    &:before {
      content: '';
      display: inline-block;
      width: 22px;
      height: 70px;
      background: url(/static/img/logout.svg) center center no-repeat;
      background-size: 22px 21px;
    }

    .username {
      margin-left: 10px;
    }
  `}

  ${(props) =>
    props.type === 'search' &&
    `
    &:before {
      content: '';
      display: inline-block;
      width: 20px;
      height: 70px;
      background: url(/static/img/search2.svg) center center no-repeat;
      background-size: 20px 20px;
    }
  `}

  ${(props) =>
    (props.type === 'user' || props.type === 'search' || props.type === 'logout') &&
    `
      border-left: 1px solid rgba(0,0,0,.2);
  `}

  .underline {
    position: absolute;
    display: block;
    left: 0;
    bottom: 0;
    height: 4px;
    background: 100%;
    width: calc(100% - 50px);
    margin: 0 25px;
    background: transparent;
  }
`

const MenuButton = styled.button`
  display: flex;
  height: 70px;
  padding: 0px 25px;
  color: #fff;
  font-weight: 600;
  align-items: center;
  text-decoration: none;
  border: 0;
  background-color: transparent;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  text-indent: -99999em;

  background: url(/static/img/burger.svg) center center no-repeat;
  background-size: 28px 17px;

  &.active .underline {
    background-color: #fff;
  }

  &:hover {
    background-color: #0068ab;

    .underline {
      background-color: #fff;
    }
  }
`

const OverlayNav = styled.div`
  position: fixed;
  display: none;
  top: 70px;
  left: 0;
  right: 0;
  background: #007ac9;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  @media all and (max-width: 1024px) {
    display: flex;
  }
`

const VerticalNavList = styled.ul`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  display: block;
  width: 100%;
`

const VerticalNavListItem = styled.li``

const VerticalLink = styled(NavLink)`
  display: block;
  height: 70px;
  padding: 0px 25px 0px 21px;

  color: #fff;
  font-weight: 600;
  line-height: 70px;
  text-decoration: none;
  background: url(/static/img/nuoli.svg) right 25px center no-repeat;
  background-size: 20px 36px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-left: 4px solid transparent;

  &:visited {
    color: #fff;
  }

  &.active {
    border-left-color: #fff;
  }

  &:hover {
    background-color: #0068ab;
  }
`

const Section = styled.section`
  padding: 60px 0px 50px 0px;

  &:nth-child(2n + 1) {
    background: #f2f5f7;
  }

  > div {
    margin: 0 auto;
    max-width: 1200px;
    padding: 0px 42px;
    line-height: 1.5;
  }

  h1 {
    text-align: center;
    font-size: 42px;
  }

  p {
    margin-bottom: 20px;
  }
`

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
            KSK:n järjestelmään kuuluvat kaikki Kumpulan seudun (ml. Käpylän ja Arabian)
            anniskeluravintolat, joista tarjoamme jäsenillemme ajankohtaista tietoa ja inspiraatiota
            tulevaisuudelle.
          </p>
          <p>
            KSK suunnittelee toimialueensa kaljapaikkojen saatavuuden ja kattavuuden sekä
            kilpailuttaa niiden tuottajat että vastaa alueen ajankohtaisesta tiedotuksesta, ml.
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

const Page = (props) => {
  return <div>mites page</div>
}

const App = () => {
  const user = useSelector((state) => state.user?.identity)

  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)

  return (
    <Wrapper>
      <Header mobileMenuVisible={mobileMenuVisible}>
        <Nav>
          <NavSection>
            <Logo to="/" onClick={() => setMobileMenuVisible(false)} />
            <NavList>
              <NavListItem>
                <Link
                  activeClassName="active"
                  to="/"
                  exact={true}
                  onClick={() => setMobileMenuVisible(false)}
                >
                  Kaljan juominen
                  <span className="underline" />
                </Link>
              </NavListItem>
              <NavListItem>
                <Link
                  activeClassName="active"
                  to="/top"
                  exact={true}
                  onClick={() => setMobileMenuVisible(false)}
                >
                  Parhaat paikat
                  <span className="underline" />
                </Link>
              </NavListItem>
              <NavListItem>
                <Link
                  activeClassName="active"
                  to="/about"
                  exact={true}
                  onClick={() => setMobileMenuVisible(false)}
                >
                  Tietoja KSK:sta
                  <span className="underline" />
                </Link>
              </NavListItem>
            </NavList>
          </NavSection>
          <NavSection>
            <NavList>
              {user && (
                <>
                  <NavListItem>
                    <Link
                      type={'user'}
                      activeClassName="active"
                      to="/profile"
                      exact={true}
                      onClick={() => setMobileMenuVisible(false)}
                    >
                      <span className="username">{user.username}</span>
                      <span className="underline" />
                    </Link>
                  </NavListItem>
                  <NavListItem>
                    <Link
                      type={'logout'}
                      activeClassName="active"
                      to="/logout"
                      exact={true}
                      onClick={() => setMobileMenuVisible(false)}
                    >
                      <span className="underline" />
                    </Link>
                  </NavListItem>
                </>
              )}
              {!user && (
                <NavListItem>
                  <Link
                    type={'user'}
                    activeClassName="active"
                    to="/login"
                    exact={true}
                    onClick={() => setMobileMenuVisible(false)}
                  >
                    <span className="underline" />
                  </Link>
                </NavListItem>
              )}
              <NavListItem>
                <Link
                  type={'search'}
                  activeClassName="active"
                  to="/search"
                  exact={true}
                  onClick={() => setMobileMenuVisible(false)}
                >
                  <span className="underline" />
                </Link>
              </NavListItem>
            </NavList>
          </NavSection>
        </Nav>
        <NavMobile>
          <NavSection>
            <Logo to="/" onClick={() => setMobileMenuVisible(false)} />
          </NavSection>
          <NavSection>
            <NavList>
              {user && (
                <>
                  <NavListItem>
                    <Link
                      type={'user'}
                      activeClassName="active"
                      to="/profile"
                      exact={true}
                      onClick={() => setMobileMenuVisible(false)}
                    >
                      <span className="underline" />
                    </Link>
                  </NavListItem>
                  <NavListItem>
                    <Link
                      type={'logout'}
                      activeClassName="active"
                      to="/logout"
                      exact={true}
                      onClick={() => setMobileMenuVisible(false)}
                    >
                      <span className="underline" />
                    </Link>
                  </NavListItem>
                </>
              )}
              {!user && (
                <NavListItem>
                  <Link
                    type={'user'}
                    activeClassName="active"
                    to="/login"
                    exact={true}
                    onClick={() => setMobileMenuVisible(false)}
                  >
                    <span className="underline" />
                  </Link>
                </NavListItem>
              )}
              <NavListItem>
                <Link
                  type={'search'}
                  activeClassName="active"
                  to="/search"
                  exact={true}
                  onClick={() => setMobileMenuVisible(false)}
                >
                  <span className="underline" />
                </Link>
              </NavListItem>
              <NavListItem>
                <MenuButton
                  type={'menu'}
                  activeClassName="active"
                  aria-controls="overlayMenu"
                  aria-expanded={mobileMenuVisible}
                  onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
                >
                  <span className="underline" />
                </MenuButton>
              </NavListItem>
            </NavList>
          </NavSection>
        </NavMobile>
        {mobileMenuVisible && (
          <OverlayNav id="overlayMenu" role="menu" aria-hidden={!mobileMenuVisible}>
            <VerticalNavList>
              <VerticalNavListItem>
                <VerticalLink
                  activeClassName="active"
                  to="/"
                  exact={true}
                  onClick={() => setMobileMenuVisible(false)}
                >
                  Kaljan juominen
                </VerticalLink>
              </VerticalNavListItem>
              <VerticalNavListItem>
                <VerticalLink
                  activeClassName="active"
                  to="/top"
                  exact={true}
                  onClick={() => setMobileMenuVisible(false)}
                >
                  Parhaat paikat
                </VerticalLink>
              </VerticalNavListItem>
              <VerticalNavListItem>
                <VerticalLink
                  activeClassName="active"
                  to="/about"
                  exact={true}
                  onClick={() => setMobileMenuVisible(false)}
                >
                  Tietoa KSK:sta
                </VerticalLink>
              </VerticalNavListItem>
            </VerticalNavList>
          </OverlayNav>
        )}
      </Header>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/about" exact={true} component={Page} />
        <Route path="/top" exact={true} component={Top} />
        <Route path="/search" exact={true} component={Search} />
        <Route path="/login" exact={true} component={Login} />
        <Route path="/logout" exact={true} component={Logout} />
        <Route path="/register" exact={true} component={Register} />
        <Route component={() => <p>404!</p>} />
      </Switch>
      <GlobalStyles />
    </Wrapper>
  )
}

export default App
