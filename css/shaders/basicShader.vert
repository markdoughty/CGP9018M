//vertex shader
//layout (location = 0) in vec3 Pos;

void main()
{
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, position.z, 1.0);

}