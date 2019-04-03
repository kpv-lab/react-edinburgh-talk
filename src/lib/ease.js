const HALF_PI = Math.PI * 0.5

export function linear(p) {
  return p
}

export function backIn(p) {
  return p * p * (2.70158 * p - 1.70158)
}

export function backOut(p) {
  return (p -= 1) * p * (2.70158 * p + 1.70158) + 1
}

export function backInOut(p) {
  if ((p *= 2) < 1) {
    return 0.5 * p * p * (3.5949095 * p - 2.5949095)
  }
  return 0.5 * ((p -= 2) * p * (3.5949095 * p + 2.5949095) + 2)
}

export function bounceOut(p) {
  if (p < 0.36363636) {
    return 7.5625 * p * p
  } else if (p < 0.72727272) {
    return 7.5625 * (p -= 0.54545454) * p + 0.75
  } else if (p < 0.9090909) {
    return 7.5625 * (p -= 0.81818181) * p + 0.9375
  } else {
    return 7.5625 * (p -= 0.95454545) * p + 0.984375
  }
}

export function bounceIn(p) {
  return 1 - bounceOut(1 - p)
}

export function bounceInOut(p) {
  if (p < 0.5) {
    return bounceIn(p * 2) * 0.5
  }
  return (bounceOut(p * 2 - 1) + 1) * 0.5
}

export function circIn(p) {
  return -Math.sqrt(1 - p * p) + 1
}

export function circOut(p) {
  return Math.sqrt(1 - (p -= 1) * p)
}

export function circInOut(p) {
  if ((p *= 2) < 1) {
    return -0.5 * (Math.sqrt(1 - p * p) - 1)
  }
  return 0.5 * (Math.sqrt(1 - (p -= 2) * p) + 1)
}

export function cubicIn(p) {
  return p * p * p
}

export function cubicOut(p) {
  return (p -= 1) * p * p + 1
}

export function cubicInOut(p) {
  if ((p *= 2) < 1) {
    return 0.5 * p * p * p
  }
  return ((p -= 2) * p * p + 2) * 0.5
}

export function expoIn(p) {
  return p === 0 ? 0 : Math.pow(2, 10 * (p - 1)) - 0.001
}

export function expoOut(p) {
  return p === 1 ? 1 : -Math.pow(2, -10 * p) + 1
}

export function expoInOut(p) {
  if (p === 0 || p === 1) {
    return p
  }
  if ((p *= 2) < 1) {
    return 0.5 * Math.pow(2, 10 * (p - 1))
  }
  return 0.5 * (-Math.pow(2, -10 * (p - 1)) + 2)
}

export function quadIn(p) {
  return p * p
}

export function quadOut(p) {
  return -p * (p - 2)
}

export function quadInOut(p) {
  if ((p *= 2) < 1) {
    return 0.5 * p * p
  }
  return -0.5 * (--p * (p - 2) - 1)
}

export function quartIn(p) {
  return p * p * p * p
}

export function quartOut(p) {
  return -((p -= 1) * p * p * p - 1)
}

export function quartInOut(p) {
  if ((p *= 2) < 1) {
    return 0.5 * p * p * p * p
  }
  return -0.5 * ((p -= 2) * p * p * p - 2)
}

export function quintIn(p) {
  return p * p * p * p * p
}

export function quintOut(p) {
  return (p -= 1) * p * p * p * p + 1
}

export function quintInOut(p) {
  if ((p *= 2) < 1) {
    return 0.5 * p * p * p * p * p
  }
  return 0.5 * ((p -= 2) * p * p * p * p + 2)
}

export function sineIn(p) {
  return 1 - Math.cos(-p * HALF_PI)
}

export function sineOut(p) {
  return Math.sin(p * HALF_PI)
}

export function sineInOut(p) {
  return -0.5 * (Math.cos(Math.PI * p) - 1)
}
