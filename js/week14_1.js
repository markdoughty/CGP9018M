
    var scene, camera, renderer;
    var sphere, controls, plane;
    var pointLight;
    let helper, DirLighthelper, shadowCameraHelper, axisHelper;
    var parent, pivot;
    var duck;
	var torusGeometry, torusMaterial, torus;

    //Two lighting sources
    //One  provided to the duck though Three.js
    //Other provided to torus knot by Phong shading from a shader.
    //Pass two uniforms to shaders.

    function init()
    {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
        camera.position.z = 10;

        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setClearColor(0x999999, 1.0);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMapEnabled = true;
		
		//load shaders using ShaderLoader.js
		var shaders = ShaderLoader.getShaders("shaders/basicLightShader.vert", "shaders/basicLightShader.frag");

        //load gltfmodel
        loadGLTFModel();

        //create torus geometry
        //use shaderMaterial
        //pass uniforms into shaders
        torusGeometry = new THREE.TorusKnotGeometry( 0.5, 0.2, 64, 8);
		torusMaterial = new THREE.ShaderMaterial(
		{
			uniforms:{
                uLightColour: {value: {x: 1.0, y: 0.5, z: 0.2}},
                uLightPosition: {value: {x: 3.0, y: 3.0, z: 0.0}}
            },
			vertexShader: shaders.vertex,
			fragmentShader: shaders.fragment
		});
		torus = new THREE.Mesh(torusGeometry, torusMaterial);
		scene.add(torus);
		torus.position.x += 2;

        //load skybox textures
        var skyBoxTextures = new THREE.CubeTextureLoader();
        var skybox = skyBoxTextures.load([
            'textures/skybox/right.jpg',
            'textures/skybox/left.jpg',
            'textures/skybox/top.jpg',
            'textures/skybox/bottom.jpg',
            'textures/skybox/front.jpg',
            'textures/skybox/back.jpg',
        ]);
        scene.background = skybox;

        //lights
        var dirLight = new THREE.DirectionalLight(0xf8f8ff, 2.0);
        dirLight.position.set(3, 3, 0);
        dirLight.target.position.set(2, 0, 2);
        dirLight.castShadow = true;
        dirLight.shadowMapWidth = 1024;
        dirLight.shadowMapHeight = 1024;
        scene.add(dirLight.target);
        scene.add(dirLight);

        var hemiLight = new THREE.HemisphereLight( 0xc99c6a, 0x9cc8f3, 0.3 );
        scene.add( hemiLight );
        
        var ambient = new THREE.AmbientLight( 0x1a0a1a);
        scene.add(ambient);

        //helpers
        DirLighthelper = new THREE.DirectionalLightHelper(dirLight);
        scene.add(DirLighthelper);
        axisHelper = new THREE.AxisHelper(1);
        scene.add(axisHelper);

        controls = new THREE.OrbitControls(camera, renderer.domElement);

        document.body.appendChild(renderer.domElement);
        render();
  
    };

    function loadGLTFModel()
    {
        var gltfLoader = new THREE.GLTFLoader();
        var url = "models/gltf/duck/Duck.gltf";
        gltfLoader.load( url, function( gltf ) {
        duck = gltf.scene;
        scene.add(duck);
        console.log("..loaded " + url);

        });
    }

    function render()
    {
        requestAnimationFrame(render);
		torus.rotation.x += 0.01;
		torus.rotation.y += 0.01;
        controls.update();
        DirLighthelper.update();
        renderer.render(scene, camera);
       
    }

    window.onload = init;
