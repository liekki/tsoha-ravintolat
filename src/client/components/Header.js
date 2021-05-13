import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import {
  HeaderWrapper,
  Nav,
  NavMobile,
  NavSection,
  Logo,
  NavList,
  NavListItem,
  Link,
  MenuButton,
  OverlayNav,
  VerticalNavList,
  VerticalNavListItem,
  VerticalLink,
} from './Styles'

const Header = () => {
  const user = useSelector((state) => state.user?.identity)
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)

  return (
    <HeaderWrapper mobileMenuVisible={mobileMenuVisible}>
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
                {user.is_admin ? (
                  <NavListItem>
                    <Link
                      type={'user'}
                      activeClassName="active"
                      to="/admin"
                      exact={true}
                      onClick={() => setMobileMenuVisible(false)}
                    >
                      <span className="username">admin</span>
                      <span className="underline" />
                    </Link>
                  </NavListItem>
                ) : (
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
                )}
                <NavListItem>
                  <Link
                    type={'logout'}
                    activeClassName="active"
                    to="/logout"
                    exact={true}
                    onClick={() => setMobileMenuVisible(false)}
                  >
                    Kirjaudu ulos
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
                  Kirjaudu sisään
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
                Etsi
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
    </HeaderWrapper>
  )
}

export default Header
