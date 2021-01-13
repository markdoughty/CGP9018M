//Phong lighting fragment shader
varying vec3 Normal;
varying vec3 fragmentPosition;
varying vec3 viewPosition;

uniform vec3 uLightColour;
uniform vec3 uLightPosition;


void main()
{
	//ambient
	float ambientStrength = 0.2f;
	vec3 ambient = ambientStrength * uLightColour;
	
	//diffuse
	vec3 nNormal = normalize(Normal);
	vec3 lightDirection = normalize(uLightPosition - fragmentPosition);
	float diffuseStrength = max(dot(nNormal, lightDirection), 0.0f);
	vec3 diffuse = diffuseStrength * uLightColour;
	
	//specular
	float specularStrength = 0.8f;
	vec3 viewDirection = normalize(cameraPosition - fragmentPosition);
	vec3 reflectionDirection = reflect(-lightDirection, nNormal);
	float spec= max(dot(viewDirection, reflectionDirection), 0.0);
	spec = pow(spec, 8.0);
	vec3 specular = (specularStrength * spec) * uLightColour;
	
	gl_FragColor = vec4(ambient+diffuse+specular, 1.0f);

}