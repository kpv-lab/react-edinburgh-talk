export const INSTANCES_VERT = `// FOR EACH of 160k [iPos,iCol] :

attribute vec3 iPos;
attribute vec3 iCol;

// FOR EACH of 8 vertex :

void main() {
  float scale =
    1.0 +
    (4.0 * simplex3D(iPos.xz / 200.0)) +
    (2.0 * simplex3D(iPos.xz / 100.0)) +
    (1.0 * simplex3D(iPos.xz / 50.0)) +
    (0.5 * simplex3D(iPos.xz / 10.0)) +
  
  color = getColor(iCol, scale);
  position = getPosition(iPos, vertex, scale);
}

// NEXT vertex
// NEXT [iPos, iCol]`
