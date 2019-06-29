import React, { Component } from 'react'
import {
  Appear,
  BlockQuote,
  Code,
  Deck,
  Heading,
  Image,
  List,
  ListItem,
  Quote,
  S,
  Slide,
  Text
} from 'spectacle'
import createTheme from 'spectacle/lib/themes/default'
import './presentation.css'
import { HelloThree } from './slides/hello-three/hello-three'
import { Instances } from './slides/instances/Instances'
import { Kpv } from './slides/kpv/kpv'

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
          <Text fit size={1} lineHeight={1} bold textColor="tertiary">
            Web Graphics Programming
          </Text>
          <Text size={1} lineHeight={1} bold textColor="tertiary">
            using
          </Text>
          <Heading fit size={1} lineHeight={1} textColor="secondary">
            WebGL
          </Heading>
          <Heading fit size={1} lineHeight={1} textColor="secondary">
            <em className="tertiary-text small-text">&&</em> three.js
          </Heading>
        </Slide>
        <Slide transition={['fade']} bgColor="primary">
          <Heading size={1} lineHeight={1} bold textColor="tertiary">
            Plan
          </Heading>
          <List>
            <ListItem>Who am I?</ListItem>
            <ListItem>What is "Web Graphics Programming"?</ListItem>
            <ListItem>What is three.js?</ListItem>
            <ListItem>Why should you care?</ListItem>
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
                Self-taught coder <em className="tertiary-text small-text">&nbsp;1978-</em>
              </ListItem>
            </List>
          </Appear>
          <Appear>
            <List>
              <ListItem>
                Maths & Philosophy Teacher{' '}
                <em className="tertiary-text small-text">&nbsp;2004-8</em>
              </ListItem>
              <ListItem>
                Flash<em className="tertiary-text">|</em>Web<em className="tertiary-text">|</em>
                Unity Developer <em className="tertiary-text small-text">&nbsp;2008-2013</em>
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
            Web Graphics
          </Heading>
          <Heading size={1} fit lineHeight={1} textColor="tertiary">
            Programming
          </Heading>
        </Slide>
        <Slide transition={['fade']} bgColor="primary">
          <Image src="timeline.png" fit />
        </Slide>
        <Slide transition={['fade']} bgColor="primary">
          <Heading size={1} lineHeight={1} bold textColor="tertiary">
            Adobe Flash
          </Heading>
          <Appear>
            <List>
              <ListItem>Macromedia buys FutureSplash 1996</ListItem>
              <ListItem>Adobe buys Macromedia in 2005</ListItem>
            </List>
          </Appear>
          <Appear>
            <List>
              <ListItem>2D Graphics IDE with ActionScript Timeline</ListItem>
              <ListItem>Content runs in Flash Plugin</ListItem>
            </List>
          </Appear>
          <Appear>
            <List>
              <ListItem>2010 Apple drop Flash on iOS</ListItem>
              <ListItem>Adobe will drop Flash Player in 2020</ListItem>
            </List>
          </Appear>
        </Slide>

        <Slide transition={['fade']} bgColor="primary">
          <Image src="furbles.png" fit />
        </Slide>

        <Slide transition={['fade']} bgColor="primary">
          <Heading size={1} lineHeight={1} bold textColor="tertiary">
            SVG & Canvas
          </Heading>
          <Appear>
            <List>
              <ListItem>W3C start to develop SVG in 1999</ListItem>
              <ListItem>Major Browsers adopt SVG by 2006</ListItem>
            </List>
          </Appear>
          <Appear>
            <List>
              <ListItem notes="proprietary tech">Apple introduces Canvas element</ListItem>
            </List>
          </Appear>
        </Slide>

        <Slide>
          <iframe title="d3" width="640" height="360" frameborder="0" src="https://d3js.org/" />
        </Slide>

        <Slide transition={['fade']} bgColor="primary">
          <Heading size={1} lineHeight={1} bold textColor="tertiary">
            WebGL
          </Heading>
          <Appear>
            <List>
              <ListItem>WebGL came out of Mozilla in 2006</ListItem>
              <ListItem>
                <em className="tertiary-text">Mozilla</em>, <em className="tertiary-text">Apple</em>
                , <em className="tertiary-text">Google</em>,{' '}
                <em className="tertiary-text">Opera</em> collaborate
              </ListItem>
              <ListItem>WebGL v.1.0 spec released in 2011</ListItem>
            </List>
          </Appear>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <BlockQuote>
            <Quote textColor="secondary" textSize="6vmin">
              Graphics technologies have to trade-off <em className="tertiary-text">performance</em>{' '}
              with
              <br />
              <em className="tertiary-text">ease-of-use</em>.
            </Quote>
          </BlockQuote>
        </Slide>
        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote textSize="6vmin">
              <em className="tertiary-text">SVG</em> and <em className="tertiary-text">Canvas</em>{' '}
              support limited <em className="tertiary-text">2D</em> graphics, but are reasonably{' '}
              <em className="tertiary-text">easy</em> to use.
            </Quote>
            <br />
            <Quote>
              <em className="tertiary-text">WebGL</em> supports very powerful{' '}
              <em className="tertiary-text">3D</em> graphics, but is{' '}
              <em className="tertiary-text">hard</em> to use.
            </Quote>
          </BlockQuote>
        </Slide>

        <Slide bgColor="primary">
          <iframe
            title="shader-toy"
            width="640"
            height="360"
            frameborder="0"
            src="https://www.shadertoy.com/embed/llVXRd?gui=false&t=0&paused=false&muted=true"
            allowfullscreen
          />
        </Slide>

        <Slide bgColor="primary">
          <iframe
            title="google-maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d778.7377249302808!2d-4.292347362556625!3d55.85274713196313!2m3!1f0!2f39.24003176711267!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x4888467904a37135%3A0x8331231a4f6c7877!2sBBC+Scotland!5e1!3m2!1sen!2suk!4v1561748817984!5m2!1sen!2suk"
            width="600"
            height="450"
            frameborder="0"
            style={{ border: 0 }}
            allowfullscreen
          />
        </Slide>

        <Slide>
          <Heading size={1} lineHeight={1} bold textColor="tertiary">
            CPUs and GPUs are different...
          </Heading>
        </Slide>

        <Slide transition={['fade']} bgColor="primary">
          <Image src="cpu-city.png" fit />
        </Slide>

        <Slide transition={['fade']} bgColor="primary">
          <Image src="gpu-city.png" fit />
        </Slide>

        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
          <Text size={1} lineHeight={1} bold textColor="tertiary">
            Web Graphics performance comes from the architecture of the GPU:
          </Text>
          <Appear>
            <Text textColor="primary">
              The GPU performs calculations in parallel, making it extremely fast.
            </Text>
          </Appear>
        </Slide>

        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
          <Text size={1} lineHeight={1} bold textColor="tertiary">
            Web Graphics limitations comes from the architecture of the GPU, too:
          </Text>
          <Appear>
            <Text textColor="primary">
              Coding for parallel execution is complicated. You have to learn to think and code very
              differently.
            </Text>
          </Appear>
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

        <Slide bgColor="tertiary">
          <Code>{`// JavaScript\n`}</Code>
          <Code>{`function getColor([r, g, b], scale) {\n`}</Code>
          <Code>{`&nbsp;&nbsp;return scale > 0\n`}</Code>
          <Code>{`&nbsp;&nbsp;&nbsp;&nbsp;? [r, g, b]\n`}</Code>
          <Code>{`&nbsp;&nbsp;&nbsp;&nbsp;: [r, b, g]\n`}</Code>
          <Code>{`}`}</Code>
        </Slide>

        <Slide bgColor="tertiary">
          <Code>{`// GLSL\n`}</Code>
          <Code>{`float gt(float x, float y) {\n`}</Code>
          <Code>{`&nbsp;&nbsp;return max(sign(x - y), 0.0);\n`}</Code>
          <Code>{`}\n`}</Code>
          <Code>{`\n`}</Code>
          <Code>{`float lt(float x, float y) {\n`}</Code>
          <Code>{`&nbsp;&nbsp;return max(sign(y - x), 0.0);\n`}</Code>
          <Code>{`}\n`}</Code>
          <Code>{`\n`}</Code>
          <Code>{`vec3 getColor(vec3 rgb, float scale) {\n`}</Code>
          <Code>{`&nbsp;&nbsp;return gt(scale, 0.0) * iCol.rbg +\n`}</Code>
          <Code>{`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lt(scale, 0.0) * iCol.rgb;\n`}</Code>
          <Code>{`}\n`}</Code>
        </Slide>

        <Slide>
          <Heading size={1} lineHeight={1} bold>
            A quick introduction to <em className="secondary-text">three.js</em>
          </Heading>
        </Slide>

        <Slide>
          <Text size={1} lineHeight={1} bold>
            three.js is a library that wraps a lot of the more complicated parts of working with
            WebGL to make it easy to get started.
          </Text>
        </Slide>

        <Slide>
          <HelloThree />
        </Slide>

        <Slide bgColor="tertiary">
          <Code textColor="primary">{`import {...} from 'three'`}</Code>
          <br />
          <Code>{`renderer = new WebGLRenderer()`}</Code>
          <Code>{`camera = new PerspectiveCamera()`}</Code>
          <Code>{`light = new PointLight()`}</Code>
          <Code>{`geometry = new DodecahedronGeometry()`}</Code>
          <Code>{`material = new MeshPhysicalMaterial()`}</Code>
          <Code>{`box = new Mesh(geometry, material)`}</Code>
          <Code>{`scene = new Scene()`}</Code>
          <Code>{`scene.add(light)`}</Code>
          <Code>{`scene.add(box)`}</Code>
          <br />
          <Code textColor="primary">{`renderer.render(scene, camera)`}</Code>
        </Slide>

        <Slide bgColor="primary">
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
              Eventually, <em className="tertiary-text">Compute</em> moves to{' '}
              <em className="tertiary-text">The Cloud</em>.
            </Quote>
          </BlockQuote>
        </Slide>

        <Slide transition={['fade']}>
          <Heading fit>Two main reasons:</Heading>
          <List>
            <ListItem>Economies of scale</ListItem>
            <ListItem>Protection of intellectual property</ListItem>
          </List>
          <Appear>
            <div>
              <Text fit textColor="tertiary">
                And it's starting to happen with graphics:
              </Text>
              <List>
                <ListItem>Video - YouTube & Netflix</ListItem>
                <ListItem>Gaming - Stadia & xCloud</ListItem>
              </List>
            </div>
          </Appear>
        </Slide>

        <Slide transition={['fade']} backgroundColor="tertiary">
          <Heading fit>A Cloud Rendered Web</Heading>
          <List>
            <ListItem>Would use less bandwidth than watching Netflix for a few hours</ListItem>
            <ListItem>Would make your computers and phones cheaper</ListItem>
          </List>
          <List>
            <ListItem>Would further commoditize the web</ListItem>
            <ListItem>Would cede even more control to the Internet Giants</ListItem>
          </List>
        </Slide>

        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote textSize="6vmin">
              In a future with a Cloud Rendered Web,
              <em className="tertiary-text">&nbsp;there would be no technical constraints&nbsp;</em>
              on integrating video, text, and interactivity.
            </Quote>
          </BlockQuote>
        </Slide>
        <Slide transition={['fade']} bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote textSize="6vmin">
              In a future with a Cloud Rendered Web,{' '}
              <em className="tertiary-text">
                perhaps it's worth knowing something about GPU programming.
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
