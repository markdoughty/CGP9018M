//Phong lighting vertex shader
varying vec3 Normal;
varying vec3 fragmentPosition;
varying vec3 viewPosition;

void main()
{
	//set Normal with normal values and normal matrix automatically passed in
	Normal = mat3(normalMatrix) * normal;
	
	//get fragment position in world coords
	fragmentPosition = vec3(modelMatrix * vec4(position.x, position.y, position.z, 1.0));
	
	//get view position
	viewPosition = vec3(viewMatrix * modelMatrix * vec4(position.x, position.y, position.z, 1.0));
	
	//mvp matrices autonatically passed in
	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position.x, position.y, position.z, 1.0);

}