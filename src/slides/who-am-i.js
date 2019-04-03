import React, { Component } from 'react'
import { Slide, Heading, Text } from 'spectacle'

export class Splash extends Component {
  render() {
    return (
      <Slide transition={['fade']} bgColor="primary">
        <Heading size={1} fit caps lineHeight={1} textColor="secondary">
          Alec McEacharn
        </Heading>
        <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
          Principal Developer @ KPV LAB Edinburgh
        </Text>
      </Slide>
    )
  }
}
