// Define global style vars here
import { StyleSheet } from 'aphrodite'

const sans = '"Helvetica Neue", sans-serif'
const serif = 'Georgia, serif'
const blue = '#0070ff'

export const Type = {
  sans,
  serif
}

export const Color = { blue }

export const styles = StyleSheet.create({
  listItem: {
    margin: '15px auto',
    borderRadius: '0',
    borderBottomStyle: 'solid',
    borderBottomWidth: 3,
    borderColor: '#00BCD4',
    padding: 3,
    transition: '.2s opacity ease',
    ':hover': {
      opacity: 0.5
    }
  },
  listItemTitle: {
    fontSize: 16,
    textDecoration: 'none',
    lineHeight: '1.2',
    margin: '0 0 1.5rem',
    color: '#000'
  },
  list: {
    maxWidth: 500
  },
  listTitle: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7'
  },
  loadingContainer: {
    textAlign: 'center'
  },
  pageErrorMessage: {
    fontSize: 16,
    margin: '6 0',
    color: '#e60000'
  },
  pageErrorContainer: {
    marginTop: 15
  },
  pageLoading: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7'
  },
  pageListItemTitle: {
    fontSize: 28,
    margin: '0 auto',
    color: '#000'
  },
  warning: {
    margin: '10 0',
    padding: 12,
    color: '#9F6000',
    backgroundColor: '#FEEFB3'
  }
})
