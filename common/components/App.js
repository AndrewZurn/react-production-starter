import React from "react";
import Helmet from "react-helmet";
import Nav from "./Nav";
import {StyleSheet, css} from "aphrodite";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const App = ({children}) => (
  <MuiThemeProvider>
    <div className={css(styles.root)}>
      <Helmet title='SPAC Fusion Editor' titleTemplate='%s - SPAC Fusion Editor'/>
      <h1 className={css(styles.title)}>Fusion by SPAC - Online Editor</h1>
      <Nav />
      {children}
      <footer className={css(styles.footer)}>
      </footer>
    </div>
  </MuiThemeProvider>
)

const styles = StyleSheet.create({
  root: {
    maxWidth: 700,
    color: '#000',
    margin: '2rem auto',
    padding: '0 1rem'
  },
  title: {
    color: '#000',
    maxWidth: 400,
    fontWeight: 'bold',
    fontSize: 26
  },
  footer: {
    margin: '4rem auto',
    textAlign: 'center',
    color: '#b7b7b7'
  },
  footerLink: {
    display: 'inline-block',
    color: '#000',
    textDecoration: 'none'
  }
})

export default App
