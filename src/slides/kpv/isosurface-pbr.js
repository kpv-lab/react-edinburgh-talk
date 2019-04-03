export const SHADER = `
#ifdef GL_ES
precision highp float;
precision highp int;
#endif

// Hello shader surfer, nice to see you here!
// Do check out our jobs page:
// https://www.kpv-lab.co.uk/jobs

uniform highp float time;
uniform highp vec2 iResolution;
uniform mediump vec3 color1;
uniform mediump vec3 color2;
uniform mediump vec3 contourColor;
uniform mediump float contourIntensity;
uniform mediump float contourThickness;
uniform mediump float contourVariation;
uniform lowp float contours;
uniform lowp float scale;
// uniform lowp int mode;
uniform lowp vec2 layerOffset;
uniform mediump vec2 position;
uniform mediump float contourOffset;
uniform mediump float exposure;
uniform mediump float maxLevel;
uniform mediump float minLevel;
uniform mediump float pixelRatio;
uniform mediump float pulse;
uniform mediump float scrollSpeed;
uniform mediump float threshold;
uniform mediump float sunRotation;
uniform mediump float sunElevation;
uniform mediump vec3 sunColor;
uniform mediump float sunIntensity;
uniform mediump vec3 ambientColor;
uniform mediump float ambientIntensity;
// uniform bool smoothed;
// uniform bool layered;
const bool layered = false;
uniform mediump float striped;
uniform mediump float stripedMaterial;
uniform mediump vec2 offset;
uniform mediump float roughness1;
uniform mediump float roughness2;
uniform mediump float roughness3;
uniform mediump float metalness1;
uniform mediump float metalness2;
uniform mediump float metalness3;
uniform mediump float saturation;
uniform mediump float brightness;
uniform mediump float elevation;
uniform mediump float terrainShift;
uniform vec3 fogColor;
uniform mediump float fogIntensity;
uniform mediump float fogHeight;

// hard coded parameters
const float shadowSharpness = 0.2;
const float shadowIntensity = 0.05;
const float gamma = 2.2;
const vec3 pulseColor = vec3(1, 0.8, 0);
const vec3 theEye = vec3(0.0, 20.0, 0.0);
const vec3 lightPos = vec3(-100.0, 20.0, 0);

// constants and helper functions
#define PI 3.14159265359
#define PI2 6.28318530718
#define PI_HALF 1.5707963267949
#define RECIPROCAL_PI 0.31830988618
#define RECIPROCAL_PI2 0.15915494
#define LOG2 1.442695
#define EPSILON 1e-6
#define DEG2RAD 0.01745329251
#define saturate(a) clamp( a, 0.0, 1.0 )
#define whiteCompliment(a) ( 1.0 - saturate( a ) )
float pow2(const in float x) { return x * x; }
float pow3(const in float x) { return x * x * x; }
float pow4(const in float x) { float x2 = x * x; return x2 * x2; }
float pow5(float x) { float x2 = x * x; return x2 * x2 * x; }
float average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }
float square(float s) { return s * s; }
vec3 square(vec3 s) { return s * s; }

struct IncidentLight {
  vec3 color;
  vec3 direction;
};

struct ReflectedLight {
  vec3 directDiffuse;
  vec3 directSpecular;
  vec3 indirectDiffuse;
  vec3 indirectSpecular;
};

struct GeometricContext {
  vec3 position;
  vec3 normal;
  vec3 viewDir;
};

struct Material {
  vec3 diffuseColor;
  float specularRoughness;
  vec3 specularColor;
};

#define DEFAULT_SPECULAR_COEFFICIENT 0.04

vec3 GammaToLinear(in vec3 rgb, in float gammaFactor) {
  return pow(rgb, vec3( gammaFactor));
}

vec3 LinearToGamma(in vec3 rgb, in float gammaFactor) {
  return pow(rgb, vec3(1.0 / gammaFactor));
}

// Algorithm from Chapter 16 of OpenGL Shading Language
vec3 Saturation(in vec3 rgb, in float adjustment) {
  const vec3 W = vec3(0.2125, 0.7154, 0.0721);
  vec3 intensity = vec3(dot(rgb, W));
  return mix(intensity, rgb, adjustment);
}

// https://learnopengl.com/Advanced-Lighting/HDR
vec3 Exposure(in vec3 rgb, in float expo) {
  return vec3(1.0) - exp(-rgb * expo * expo);
}


// https://www.shadertoy.com/view/4djSRW
#define HASHSCALE1 .1031
#define HASHSCALE3 vec3(.1031, .1030, .0973)
#define HASHSCALE4 vec4(.1031, .1030, .0973, .1099)
//#define HASHSCALE1 443.8975

float hash2(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * HASHSCALE1);
  p3 += dot(p3, p3.yzx + 19.19);
  return fract((p3.x + p3.y) * p3.z);
}


vec2 hash22(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * HASHSCALE3);
  p3 += dot(p3, p3.yzx + 19.19);
  return fract((p3.xx + p3.yz) * p3.zy);
}


// https://www.shadertoy.com/view/4dXBRH
vec3 noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  vec2 du = 30.0 * f * f * (f * (f - 2.0) + 1.0);

  float a = hash2(i + vec2(0.0, 0.0)) * elevation;
  float b = hash2(i + vec2(1.0, 0.0)) * elevation;
  float c = hash2(i + vec2(0.0, 1.0)) * elevation;
  float d = hash2(i + vec2(1.0, 1.0)) * elevation;
  
  float k0 = a;
  float k1 = b - a;
  float k2 = c - a;
  float k4 = a - b - c + d;

  return vec3(
    k0 + k1 * u.x + k2 * u.y + k4 * u.x * u.y, // value
    du * (u.yx * k4 + vec2(b, c) - a)); // derivative  
}


// terrain
vec3 heightMap(vec2 p) {
  // mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  vec3 t = 0.5 * noise(p);
  t += 0.5 * noise(p + 11.3 * (1.0 + terrainShift));
  t.x *= threshold;
  return t;
}


vec4 terrain(vec2 uv) {
  vec2 pt = uv * scale + position;
  pt.y -= time * 0.1;
  vec3 t = heightMap(pt);
  vec2 o = offset + vec2(sin(time * 0.3) * 0.3, cos(time * 0.3) * 0.1);
  pt -= vec2(1.0, -1.0) * o * t.x * 0.5;
  t = heightMap(pt);
  
  return vec4(
    t.x, // height
    vec3(t.z, t.x, t.y) // normal
  );
}


// https://www.shadertoy.com/view/4dsSzr
vec3 neonGradient(float t) {
  return clamp(vec3(t * 1.3 + 0.1, square(abs(0.43 - t) * 1.7), (1.0 - t) * 1.7), 0.0, 1.0);
}

vec3 heatmapGradient(float t) {
  return clamp((pow(t, 1.5) * 0.8 + 0.2) * vec3(smoothstep(0.0, 0.35, t) + t * 0.5, smoothstep(0.5, 1.0, t), max(1.0 - t * 1.7, t * 7.0 - 6.0)), 0.0, 1.0);
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 rainbow(float layer) {
  vec3 col = hsv2rgb(vec3(mod(time * 0.1, 1.0) + layer * 1.2 - 0.38, 0.6, 0.9));
  return col;
}

// vec3 surfaceColor(float h) {
//   // if (mode == 2) {
//   //   // return hsv2rgb(vec3(h * 0.8 - 0.38, 0.6, 0.9));
//   //   return rainbow(h);
//   // } else {
//     // return pow(neonGradient(h * 1.5), vec3(0.5));
//     h = smooth ? h : mod(floor(h * contours * elevation), 2.0);
    
//     return mix(color1, color2, h);
//   // }
  
//   // vec3 col = mix(color1, color2, h * h);
//   // vec3 col = heatmapGradient(0.2 + h * 1.1);
//   // vec3 col = pow(neonGradient(h * 1.5), vec3(0.5));
//   // vec3 col = hsv2rgb(vec3(h * 0.8 - 0.38, 0.6, 0.9));
//   // vec3 col = rainbow(h);
//   // vec3 col = hsv2rgb(vec3(0.7 - h * 0.8, 0.6, 0.9));
//   // return mix(col * 0.9, col, h);
//   // return col;
// }


// vec3 layerSurface(vec2 uv) {
//   vec2 pt = uv * scale;
//   pt += position;
//   pt.y -= time * scrollSpeed;
  
//   float c = 1.0 / contours;
//   vec3 t = heightMap(pt);
//   float h = t.x;
  
//   // wobble based on height
//   if (time > 0.0) {
//     // if (mode == 2) {
//       // pt.x += sin(time * 2.7) * h * 0.4;
//       // pt.y += sin(time * 3.2) * h * 0.3;
//     // } else {
//       pt.x += sin(time * 0.9) * h * 0.06;
//     // }
//     t = heightMap(pt);
//     h = t.x;
//   }
  
//   // layer top surface
//   float h1 = h * contours;
//   float l1 = floor(h1);
//   float aa = smoothstep(1.0 - fract(h1), 0.0, 0.003);
//   vec3 c1 = surfaceColor(l1 * c);
//   vec3 c2 = surfaceColor((l1 - 1.0) * c);
//   vec3 col = mix(c1, c2, aa);
  
//   // offset layer
//   vec2 offset = (scale * layerOffset) / min(contours, 18.0);
//   offset.x *= -uv.x;
//   offset.y *= 1.0 + uv.y;
//   vec3 t2 = heightMap(pt + offset);
//   float h2 = t2.x * contours;
//   float l2 = floor(h2);
  
//   // layer edges
//   vec3 c3 = surfaceColor((l2 - 1.0) * c) * 0.9;
//   float side = step(l1, l2 - 1.0);
//   col = mix(col, c3, side);
  
//   // pulse
//   col = mix(mix(pulseColor, col, 0.3), col, smoothstep(abs(pulse - h), 0.0, 0.002));
  
//   // shadow
//   float shadow = clamp(fract(h2) - shadowSharpness, 0.0, 1.0) * shadowIntensity;
//   float sameLevel = l1 == l2 ? 1.0 : 0.0;
  
//   return col - shadow * sameLevel;
// }

// vec3 smoothSurface(vec2 uv) {
//   vec4 t = terrain(uv);
  
//   vec3 n = normalize(vec3(t.y, t.z * 0.1, t.w));

//   vec3 ambient = vec3(0.4);
//   vec3 col = surfaceColor(t.x);
//   float h = t.x * contours;
  
//   float aa = 300.0 / max(iResolution.x, iResolution.y);
//   float contour = abs(mod(h + 0.5, 1.0) - 0.5);
//   float thickness = 0.003 * pixelRatio;
//   vec3 contourCol = mix(col * 1.5, vec3(1), t.x);
//   col = mix(contourCol, col, smoothstep(0.0, aa, contour - thickness));
  
//   // pulse
//   col = mix(mix(pulseColor, col, 0.3), col, smoothstep(abs(pulse - t.x), 0.0, 0.002));
  
//   vec3 sunDir = normalize(vec3(-5, 1, 5));
//   float diffuse = max(0.0, dot(n, sunDir));
  
//   return col * (ambient + diffuse);
// }


vec3 lightOrientation() {
  float a = sunElevation * DEG2RAD;
  float b = (sunRotation - 180.0) * DEG2RAD;
  float y = sin(a);
  float d = cos(a);
  float x = d * cos(b);
  float z = d * sin(b);
  return normalize(vec3(x, y, z));
}


// PBR shading from threejs
vec3 BRDF_Diffuse_Lambert(const in vec3 diffuseColor) {
  // return diffuseColor;
  return RECIPROCAL_PI * diffuseColor;
}


// Optimized fresnel variant (presented by Epic at SIGGRAPH '13)
// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
vec3 F_Schlick(const in vec3 specularColor, const in float dotLH) {
  // Original approximation by Christophe Schlick '94
  // float fresnel = pow(1.0 - dotLH, 5.0);
  float fresnel = exp2((-5.55473 * dotLH - 6.98316) * dotLH);
  return (1.0 - specularColor) * fresnel + specularColor;
}


// Microfacet Models for Refraction through Rough Surfaces - equation (34)
// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html
// alpha is "roughness squared" in Disney’s reparameterization
float G_GGX_Smith(const in float alpha, const in float dotNL, const in float dotNV) {
  // geometry term (normalized) = G(l)⋅G(v) / 4(n⋅l)(n⋅v)
  // also see #12151
  float a2 = pow2(alpha);
  float gl = dotNL + sqrt(a2 + (1.0 - a2) * pow2(dotNL));
  float gv = dotNV + sqrt(a2 + (1.0 - a2) * pow2(dotNV));
  return 1.0 / (gl * gv);
}


// Moving Frostbite to Physically Based Rendering 3.0 - page 12, listing 2
// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float G_GGX_SmithCorrelated(const in float alpha, const in float dotNL, const in float dotNV) {
  float a2 = pow2(alpha);
  
  // dotNL and dotNV are explicitly swapped. This is not a mistake.
  float gv = dotNL * sqrt(a2 + (1.0 - a2) * pow2(dotNV));
  float gl = dotNV * sqrt(a2 + (1.0 - a2) * pow2(dotNL));
  return 0.5 / max(gv + gl, EPSILON);
}


// Microfacet Models for Refraction through Rough Surfaces - equation (33)
// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html
// alpha is "roughness squared" in Disney’s reparameterization
float D_GGX(const in float alpha, const in float dotNH) {
  float a2 = pow2(alpha);
  float denom = pow2(dotNH) * (a2 - 1.0) + 1.0; // avoid alpha = 0 with dotNH = 1
  return RECIPROCAL_PI * a2 / pow2(denom);
}


// GGX Distribution, Schlick Fresnel, GGX-Smith Visibility
vec3 BRDF_Specular_GGX(
  const in float dotNL,
  const in IncidentLight incidentLight,
  const in GeometricContext geometry,
  const in Material material
) {
  float alpha = pow2(material.specularRoughness); // UE4's roughness
  vec3 halfDir = normalize(incidentLight.direction + geometry.viewDir);
  // float dotNL = saturate(dot(geometry.normal, incidentLight.direction));
  float dotNV = saturate(dot(geometry.normal, geometry.viewDir));
  float dotNH = saturate(dot(geometry.normal, halfDir));
  float dotLH = saturate(dot(incidentLight.direction, halfDir));

  vec3 F = F_Schlick(material.specularColor, dotLH);
  float G = G_GGX_SmithCorrelated(alpha, dotNL, dotNV);
  float D = D_GGX(alpha, dotNH);

  return F * (G * D);
}


vec3 Shade(
  const in IncidentLight incidentLight,
  const in GeometricContext geometry,
  const in Material material
) {
  float dotNL = saturate(dot(geometry.normal, incidentLight.direction));
  vec3 irradiance = dotNL * incidentLight.color;
  
  ReflectedLight light;
  light.indirectDiffuse = ambientColor * ambientIntensity * ambientIntensity * BRDF_Diffuse_Lambert(material.diffuseColor);
  // light.indirectSpecular = vec3(0.0);
  light.directDiffuse = irradiance * BRDF_Diffuse_Lambert(material.diffuseColor);
  light.directSpecular = irradiance * BRDF_Specular_GGX(dotNL, incidentLight, geometry, material);
  
  return light.directDiffuse + light.indirectDiffuse + light.directSpecular;
}


// http://iquilezles.org/www/articles/distance/distance.htm
float isoline(
  const in float v, // 0-1 value
  const in float g, // gradient length
  const in float i, // interval
  const in float t  // line thickness
) {
  float d = abs(mod(v + 0.5 * i, i) - 0.5 * i);
  float s = 1.0 / t;
  float eps = 0.00195; // 1.0 / 512.0;
  eps *= clamp(2.0 - t, 1.0, 2.0);
  float l = d * s / g;
  return smoothstep(2.0 * eps, eps, l);
}


// vec3 terrainColor(
//   const in float v, // terrain height
//   const in float b, // contour band
//   const in float i  // contour interval
// ) {
//   return mix(color1, color2, smooth ? v : b);
//   // float line = isoline(v, g, i, t);
//   // return vec4(col, line);
// }


// from threejs standard shader
vec3 dithering(vec3 color) {
  float pixelRand = hash2(gl_FragCoord.xy);
  vec3 dither = vec3(0.25, -0.25, 0.25) / 255.0;
  dither = mix(2.0 * dither, -2.0 * dither, pixelRand);
  return clamp(color + dither, vec3(0.0), vec3(1.0));
}


void main(void) {
  vec2 uv = (gl_FragCoord.xy - iResolution * 0.5) / iResolution.y;
  vec4 t = terrain(uv);
  float h = t.x / elevation; // normalised height
  vec3 pos = vec3(uv.x, t.x, uv.y);
  
  
  // colour bands
  float contourCount = contours * elevation;
  float z = fract((t.x * contourCount + 0.5) * 0.5); // normalise to integer intervals
  float v = abs(2.0 * z - 1.0); // convert to 0-1 range
  float g = length(t.yw); // length of surface gradient
  float dp = g * 0.1; // change across ~pixel width
  float band = smoothstep(0.5 - dp, 0.5 + dp, v);
  
  
  // surface geometry
  GeometricContext geometry;
  geometry.position = vec3(uv.x, t.x, uv.y);
  geometry.normal = normalize(vec3(t.y, t.z / elevation, t.w));
  geometry.viewDir = normalize(theEye - pos);
  
  
  float shadow = 1.0;
  if (layered) {
    vec2 o = layerOffset / (min(contours, 11.0) * scale);
    vec4 ts = terrain(uv + o);
    float h2 = ts.x / elevation;
    float c1 = floor(t.x * contourCount);
    float c2 = floor(ts.x * contourCount);
    shadow *= 1.0 - ((ts.x * contourCount) - c2 - 0.7) * step(c1, c2);
  }
  
  // surface colour
  float c = floor(t.x * contourCount) / contourCount;
  float colBlend = mix(c, band, striped);
  vec3 col = mix(color1, color2, colBlend);
  
  float lineThickness = contourThickness + contourThickness * contourVariation * step(floor(mod(t.x * contourCount + 0.5, 5.0)), 0.0);
  float line = isoline(t.x, g, 1.0 / contourCount, lineThickness);
  line *= min(lineThickness * 0.8, 1.0);
  // float line = tcol.w * min(contourThickness * 0.8, 1.0);
  vec3 diffuseColor = mix(col, mix(col, contourColor, contourIntensity), line);
  
  // material properties
  float matBlend = mix(h, band, stripedMaterial);
  float roughnessFactor = mix(roughness1, roughness2, matBlend);
  roughnessFactor = mix(roughnessFactor, roughness3, line);
  
  float metalnessFactor = mix(metalness1, metalness2, matBlend);
  metalnessFactor = mix(metalnessFactor, metalness3, line);
  
  Material material;
  material.diffuseColor = diffuseColor * (1.0 - metalnessFactor);
  material.specularRoughness = clamp(roughnessFactor, 0.04, 1.0);
  material.specularColor = mix(vec3(DEFAULT_SPECULAR_COEFFICIENT), diffuseColor, metalnessFactor);
  
  // lights
  IncidentLight light;
  light.color = sunColor * sunIntensity * sunIntensity;
  light.direction = lightOrientation();
  
  // shaded colour
  vec3 color = Shade(light, geometry, material);
  color *= clamp(shadow, 0.0, 1.0);
  
  float fogFactor = 1.0 - exp(-max(fogHeight - h, 0.0) * fogIntensity * fogIntensity * 20.0);
  color = mix(color, fogColor, fogFactor);
  
  color = Exposure(color, exposure);
  color = LinearToGamma(color, gamma);
  
  gl_FragColor = vec4(dithering(color), 1.0);
}
`
