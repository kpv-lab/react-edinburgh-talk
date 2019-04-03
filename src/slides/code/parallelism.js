export const PARALLELISM = `// An equivalent JS function
function getColor([r, g, b], scale) {
  return scale > 0 ? [r, g, b] : [r, b, g]
}

float gt(float x, float y) {
  return max(sign(x - y), 0.0); // x > y ? 1 : 0
}

float lt(float x, float y) {
  return max(sign(y - x), 0.0); // x < y ? 1 : 0
}

vec3 getColor(vec3 rgb, float scale) {
  return gt(scale, 0.0) * iCol.rbg +
         lt(scale, 0.0) * iCol.rgb;
}`
