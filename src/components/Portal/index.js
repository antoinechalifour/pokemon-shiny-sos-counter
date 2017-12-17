import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

/*
This component is inspired by this article: https://hackernoon.com/using-a-react-16-portal-to-do-something-cool-2a2d627b0202
*/

class Portal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.$container = window.document.createElement('div')
    this.window = null
  }

  componentDidMount () {
    this.window = window.open('', '', 'width=300,height=300')
    this.copyStyles(window.document, this.window.document)
    this.window.document.body.appendChild(this.$container)
    this.window.onbeforeunload = this.props.onClose
  }

  componentWillUnmount () {
    this.window.close()
  }

  copyStyles (sourceDoc, targetDoc) {
    Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
      if (styleSheet.cssRules) {
        // for <style> elements
        const newStyleEl = sourceDoc.createElement('style')

        Array.from(styleSheet.cssRules).forEach(cssRule => {
          // write the text of each rule into the body of the style element
          newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText))
        })

        targetDoc.head.appendChild(newStyleEl)
      } else if (styleSheet.href) {
        // for <link> elements loading CSS from a URL
        const newLinkEl = sourceDoc.createElement('link')

        newLinkEl.rel = 'stylesheet'
        newLinkEl.href = styleSheet.href
        targetDoc.head.appendChild(newLinkEl)
      }
    })
  }

  render () {
    return ReactDOM.createPortal(this.props.children, this.$container)
  }
}

export default Portal
