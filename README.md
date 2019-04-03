# WebGL && three.js (&& React)

This is the slide-deck for a talk given to ReactJS Edinburgh by Alec McEachran from
[KPV LAB Edinburgh](https://kpv-lab.co.uk). There are minimal notes. A video of the talk will be
published by [React Edinburgh](https://www.youtube.com/channel/UCF7KV6Fuq-NUcWleKS1o96Q).

## Getting Started

From the repository root, run

```bash
yarn
```

to pull in dependencies then

```bash
yarn start
```

to start the development server.

To create a production build to host locally, run

```bash
yarn add serve
serve -s build
```

## Technical Info

The talk was written using [Formidable Labs' Spectacle](https://github.com/FormidableLabs/spectacle).

The main deck of slides can be found in the [./presentation.js](./src/presentation.js) file. At the
time of writing, there was a technical limitation in the Spectacle library that means all the slides
have to remain inline for the Appear tag logic to work correctly!

The code is presented using the
[Spectacle Code Slide](https://github.com/jamiebuilds/spectacle-code-slide) plugin.

The simplex noise logic is originally by Ian McEwan, Ashima Arts and comes from [Patricio Gonzalez
Vivo's GLSL-noise gist](https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83).

## Attributions

The Skin Shading example on slide 21 is by [David Lenaerts](https://derschmale.com/) who is far
better at this stuff than me.

## Technical Correctness

Some of what I put in these slides is not technically correct. That's because technical correctness
was not really my goal! I was interested in giving people a hook to understand concepts about which
they might be unfamiliar.

If you know enough to quibble about my definition of WebGL etc ... then you were not the target
audience.
