import styled, { createGlobalStyle } from 'styled-components'
import React from 'react'
import { NavLink } from 'react-router-dom'

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

const HeaderWrapper = styled.header`
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
  @media all and (min-width: 1024px) {
    &:before {
      margin-right: 10px;
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

  &:nth-child(2n) {
    background: #f2f5f7;
  }

  > div {
    margin: 0 auto;
    max-width: 1200px;
    padding: 0px 42px;
    line-height: 1.5;

    > h1 {
      text-align: center;
      font-size: 42px;
    }

    > p {
      margin-bottom: 20px;
    }
  }
`

const Form = styled.form`
  max-width: 600px;
  margin-bottom: 20px;
`
const FormField = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px 0;
`

const FormFieldLabel = styled.label`
  flex-basis: 30%;
  font-weight: 600;
  font-size: 16px;
  line-height: 40px;
  margin-bottom: 5px;
`
const FormFieldInput = styled.input`
  box-sizing: border-box;
  flex-basis: 70%;
  line-height: 32px;
  font-size: 16px;
  height: 40px;
  border: 0;
  border-radius: 4px;
  padding: 4px 12px;
  margin-bottom: 5px;
`
const FormFieldTextarea = styled.textarea`
  box-sizing: border-box;
  flex-basis: 70%;
  line-height: 32px;
  font-size: 16px;
  min-height: 120px;
  border: 0;
  border-radius: 4px;
  padding: 4px 12px;
  margin-bottom: 5px;
`

const FormFieldErrors = styled.p`
  font-size: 12px;
  color: #c90077;
  margin-left: 30%;
  flex-basis: 70%;
`

const FormFieldNote = styled.p`
  font-size: 12px;
  color: #666;
  margin-left: 30%;
  flex-basis: 70%;
`
const FormFieldCheckboxCollection = styled.div`
  flex-basis: 70%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`

const FormFieldCheckboxContainer = styled.div`
  flex-basis: 25%;
  white-space: nowrap;
`

const FormFieldCheckbox = styled.input`
  margin-left: 5px;
`

const FormFieldSelect = styled.select`
  flex-basis: 70%;
  border: 0;
  border-radius: 4px;
  text-indent: 5px;
`

const FormFieldOption = styled.option``

const Submit = styled.input`
  flex-basis: 70%;
  margin-left: 30%;
  background: #007ac9;
  border: 0;
  border-radius: 4px;
  height: 40px;
  padding: 0px 20px;
  line-height: 40px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background: #0068ab;
  }
`

export {
  GlobalStyles,
  Section,
  Wrapper,
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
  Form,
  FormField,
  FormFieldLabel,
  FormFieldInput,
  FormFieldTextarea,
  FormFieldErrors,
  FormFieldNote,
  FormFieldCheckboxCollection,
  FormFieldCheckboxContainer,
  FormFieldCheckbox,
  FormFieldSelect,
  FormFieldOption,
  Submit,
}
