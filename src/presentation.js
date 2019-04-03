import React, { Component } from 'react'
import {
  Appear,
  BlockQuote,
  Deck,
  Heading,
  List,
  ListItem,
  Quote,
  Slide,
  Text,
  S,
  Image
} from 'spectacle'
import CodeSlide from 'spectacle-code-slide'
import createTheme from 'spectacle/lib/themes/default'
import { patchGlslGrammar } from './patch/glsl-grammar'
import './presentation.css'
import { INSTANCES_VERT } from './slides/code/instances-vert'
import { PARALLELISM } from './slides/code/parallelism'
import { REACT_THREE_FIBER } from './slides/code/react-three-fiber'
import { VANILLA_THREE } from './slides/code/vanilla-three'
import { HelloThree } from './slides/hello-three/hello-three'
import { Instances } from './slides/instances/Instances'
import { Kpv } from './slides/kpv/kpv'
import { INSTANCES_THREE } from './slides/code/instances-three'
import threeWebsitePng from './slides/threejs-org.png'
import { REACT_THREE } from './slides/code/react-three'

patchGlslGrammar()

require('normalize.css')

const theme = createTheme(
  {
    primary: 'white',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quaternary: '#CECECE'
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica'
  }
)

export default class Presentation extends Component {
  render() {
    return (
      <Deck transition={['fade']} transitionDuration={500} theme={theme}>
        <Slide transition={['fade']} bgColor="primary">
          <Heading size={1} fit lineHeight={1} textColor="secondary">
            WebGL <em className="tertiary-text small-text">&&</em>
          </Heading>
          <Heading size={1} fit lineHeight={1} textColor="secondary">
            three.js
          </Heading>
          <Heading size={1} fit lineHeight={1} textColor="tertiary">
            (<em className="tertiary-text small-text">&&</em> React)
          </Heading>
          <Text margin="10px 0 0" textColor="secondary" size={1} bold>
            Alec McEachran
          </Text>
        </Slide>
        <Slide transition={['fade']} bgColor="primary">
          <Heading size={1} lineHeight={1} bold textColor="tertiary">
            Plan
          </Heading>
          <List>
            <ListItem>A very brief introduction</ListItem>
            <ListItem>three.js basics</ListItem>
            <ListItem>
              three.js <em className="tertiary-text">&&</em> React
            </ListItem>
            <ListItem>
              three.js <em className="tertiary-text">&&</em> WebGL (glsl)
            </ListItem>
            <ListItem>Self-indulgent speculation (if time)</ListItem>
          </List>
        </Slide>
        <Slide transition={['fade']} bgColor="primary">
          <Heading size={1} lineHeight={1} bold textColor="tertiary">
            Alec McEachran
          </Heading>
          <Text size={1} lineHeight={1} bold textColor="secondary">
            @alecmce &bull; alecmce.com
          </Text>
          <Appear>
            <List>
              <ListItem>
                Maths & Philosophy Teacher{' '}
                <em className="tertiary-text small-text">&nbsp;2004-8</em>
              </ListItem>
              <ListItem>
                Flash|Web|Unity Developer{' '}
                <em className="tertiary-text small-text">&nbsp;2008-2013</em>
              </ListItem>
              <ListItem>
                Snr Software Engineer @ YouTube
                <em className="tertiary-text small-text">&nbsp;2013-2016</em>
              </ListItem>
              <ListItem>
                Snr Software Engineer @ Google
                <em className="tertiary-text small-text">&nbsp;2016-2018</em>
              </ListItem>
            </List>
          </Appear>
          <Appear>
            <List>
              <ListItem>
                Principal Developer @ KPV LAB <em className="tertiary-text small-text">2018-</em>
              </ListItem>
            </List>
          </Appear>
        </Slide>
        <Slide transition={['fade']} bgColor="primary">
          <Kpv />
        </Slide>
        <Slide transition={['fade']} bgColor="primary">
          <Heading size={1} fit lineHeight={1} textColor="secondary">
            three.js <em className="tertiary-text">basics</em>
          </Heading>
        </Slide>
        <Slide transition={['fade']} bgColor="primary">
          <Image src={threeWebsitePng} />
          <div className="in-front top-right">
            <Text textColor="secondary">
              <em className="tertiary-text">David Scott Lyons' Tutorial</em> on{' '}
              <S type="underline">threejs.org</S>
            </Text>
          </div>
        </Slide>
        <Slide transition={['fade']} bgColor="primary">
          <Heading size={1} lineHeight={1} bold textColor="tertiary">
            three.js entities:
          </Heading>
          <Appear>
            <List>
              <ListItem>Renderer, Camera, Scene</ListItem>
            </List>
          </Appear>
          <Appear>
            <List>
              <ListItem>Meshes, Geometries, Materials</ListItem>
              <ListItem>Lights (and Shadows)</ListItem>
            </List>
          </Appear>
        </Slide>
        <Slide transition={['fade']} bgColor="primary">
          <HelloThree />
        </Slide>
        <CodeSlide
          className="code-slide"
          transition={['fade']}
          bgColor="primary"
          code={VANILLA_THREE}
          lang="js"
          ranges={[
            { loc: [2, 6], title: 'Renderer' },
            { loc: [7, 11], title: 'Camera' },
            { loc: [12, 15], title: 'Light' },
            { loc: [16, 19], title: 'Geometry, Material, Mesh' },
            { loc: [20, 23], title: 'Scene' },
            { loc: [24, 25], title: 'render()' }
          ]}
        />
        <Slide transition={['fade']} bgColor="primary">
          <Heading size={1} fit lineHeight={1} textColor="tertiary">
            three.js <em className="secondary-text small-text">&&</em>
          </Heading>
          <Heading size={1} fit lineHeight={1} textColor="secondary">
            React
          </Heading>
        </Slide>
        <CodeSlide
          className="code-slide"
          transition={['fade']}
          bgColor="primary"
          code={REACT_THREE}
          lang="jsx"
          ranges={[
            { loc: [6, 7], title: 'reference a canvas element' },
            { loc: [9, 14], title: 'and attach a WebGLRenderer' }
          ]}
        />
        <CodeSlide
          className="code-slide"
          transition={['fade']}
          bgColor="primary"
          code={REACT_THREE_FIBER}
          lang="jsx"
          ranges={[
            { loc: [0, 1], title: 'react-three-fiber' },
            { loc: [5, 8], title: 'useThree hook exposes boilerplate' },
            { loc: [9, 18], title: 'Lights, Geometry, Material, Mesh' }
          ]}
        />
        <Slide
          transition={['fade']}
          bgColor="primary"
          textColor="secondary"
          notes="Libraries are about trade-offs. This is a problem for three.js too, but the
          fallback from three.js is WebGL."
        >
          <BlockQuote>
            <Quote textColor="secondary" textSize="6vmin">
              you don't have to go much beyond the simplest example before you end up having a
              complicated mix of the declarative structure and imperative fallback code.
            </Quote>
          </BlockQuote>
        </Slide>
        <Slide transition={['fade']} bgColor="secondary">
          <Heading size={1} lineHeight={1} fit bold textColor="primary">
            three.js <em className="tertiary-text">&&</em>
          </Heading>
          <Heading size={1} lineHeight={1} fit bold textColor="primary">
            WebGL (glsl)
          </Heading>
        </Slide>
        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote textSize="6vmin">
              WebGL is a web standard technology that lets your JavaScript reach through the DOM and
              interact with the <em className="tertiary-text">GPU</em> to produce high performance
              graphics.
            </Quote>
          </BlockQuote>
        </Slide>
        <Slide transition={['fade']} bgColor="primary">
          <Instances />
          <div className="in-front top-right">
            <Appear>
              <Text textColor="primary">1 cube</Text>
            </Appear>
            <Appear>
              <Text textColor="primary">160k positions & colours</Text>
            </Appear>
            <Appear>
              <Text textColor="primary">3D simplex noise</Text>
            </Appear>
            <Appear>
              <Text textColor="primary">1.3m vertex calculations per frame</Text>
            </Appear>
          </div>
        </Slide>
        <CodeSlide
          className="code-slide"
          transition={['fade']}
          bgColor="primary"
          code={INSTANCES_THREE}
          lang="glsl"
          ranges={[
            { loc: [0, 13], title: 'make instanced geometry' },
            { loc: [14, 18], title: 'rewrite glsl source' }
          ]}
        />
        <CodeSlide
          className="code-slide"
          transition={['fade']}
          bgColor="primary"
          code={INSTANCES_VERT}
          lang="glsl"
          ranges={[
            { loc: [0, 1], title: 'glsl is like a big loop' },
            { loc: [2, 4], title: 'that runs at each position' },
            { loc: [5, 6], title: 'and for each cube vertex' },
            { loc: [7, 18], title: 'to calculate position and color' }
          ]}
        />
        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
          <Heading size={1} lineHeight={1} bold textColor="tertiary">
            GPU vs CPU
          </Heading>
          <Text size={1} lineHeight={1.5} bold textColor="primary">
            The speed of WebGL comes from the GPU.
          </Text>
          <Appear>
            <List>
              <ListItem textColor="primary">Vertex positions are calculated in parallel</ListItem>
              <ListItem>Pixels' colours are calculated in parallel</ListItem>
            </List>
          </Appear>
          <Appear>
            <List>
              <ListItem>
                <em className="tertiary-text">GLSL code is written to be run in parallel</em>
              </ListItem>
            </List>
          </Appear>
        </Slide>
        <CodeSlide
          className="code-slide"
          transition={['fade']}
          bgColor="primary"
          code={PARALLELISM}
          lang="glsl"
          ranges={[
            { loc: [0, 4], title: 'in JS we use conditional logic' },
            { loc: [5, 17], title: "in GLSL we usually don't" }
          ]}
        />
        <Slide transition={['fade']} bgColor="primary">
          <Heading size={1} lineHeight={1} fit bold textColor="tertiary">
            If you become expert
          </Heading>
          <Text textColor="secondary">you can build some amazing things...</Text>
        </Slide>
        <Slide transition={['fade']} bgColor="primary">
          <iframe
            title="skin"
            src="https://www.derschmale.com/lab/doodles/skinsss/build/"
            allowfullscreen
          />
          <div className="in-front top-right">
            <Text textColor="secondary">
              from <S type="underline">www.derschmale.com</S>
            </Text>
          </div>
        </Slide>
        <Slide transition={['fade']} bgColor="primary">
          <Heading size={1} lineHeight={1} bold textColor="tertiary">
            For Inspiration:
          </Heading>
          <List>
            <ListItem>
              <S type="underline">threejs.org</S> for examples built with three.js
            </ListItem>
          </List>
          <List>
            <ListItem>
              <S type="underline">shadertoy.com</S> for pure WebGL shaders
            </ListItem>
          </List>
        </Slide>
        <Slide transition={['fade']} bgColor="primary">
          <Heading size={1} lineHeight={1} bold textColor="tertiary">
            Recap
          </Heading>
          <Appear>
            <List>
              <ListItem>three.js has entities for building 3D scenes</ListItem>
            </List>
          </Appear>
          <Appear>
            <List>
              <ListItem>react-three-fiber removes some boilerplate</ListItem>
            </List>
          </Appear>
          <Appear>
            <List>
              <ListItem>But it has limited value ... so far</ListItem>
            </List>
          </Appear>
          <Appear>
            <List>
              <ListItem>For complex work you need to write glsl</ListItem>
            </List>
          </Appear>
        </Slide>
        <Slide transition={['fade']} bgColor="primary">
          <Heading size={1} lineHeight={1} fit bold textColor="secondary">
            Speculation
          </Heading>
          <Text size={1} lineHeight={1} fit bold textColor="tertiary">
            about the future of the web
          </Text>
        </Slide>
        <Slide
          transition={['fade']}
          bgColor="secondary"
          textColor="primary"
          notes="Stadia, Timescale!"
        >
          <BlockQuote>
            <Quote textSize="6vmin">
              <em className="tertiary-text">Computation is moving to The Cloud.&nbsp;</em>
              Is there a reason to believe that front-end rendering is different?
            </Quote>
          </BlockQuote>
        </Slide>
        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote textSize="6vmin">
              In a cloud-rendered web future,
              <em className="tertiary-text">&nbsp;there would be no technical constraints&nbsp;</em>
              on integrating video, text, and interactivity.
            </Quote>
          </BlockQuote>
        </Slide>
        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote textSize="6vmin">
              In a cloud-rendered web future,{' '}
              <em className="tertiary-text">
                perhaps it's worth knowing something about 3D rendering and GPU programming.
              </em>
            </Quote>
          </BlockQuote>
        </Slide>
        <Slide transition={['fade']} bgColor="primary">
          <Heading size={1} lineHeight={2} bold textColor="secondary">
            Q/A
          </Heading>
          <Text textColor="tertiary" bold>
            Alec McEachran
          </Text>
          <Text textColor="secondary">
            follow me on twitter <em className="tertiary-text">@alecmce</em>
          </Text>
          <Text textColor="secondary">
            work with me <em className="tertiary-text">www.kpv-lab.co.uk/jobs</em>
          </Text>
        </Slide>
      </Deck>
    )
  }
}
