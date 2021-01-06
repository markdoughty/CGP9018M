
    var scene, camera, renderer;
    var sphere, controls, plane;
    var pointLight;
    let helper, DirLighthelper, shadowCameraHelper, axisHelper;
    var parent, pivot;
    var duck;

    //Add a skybox 

    function init()
    {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
        camera.position.z = 10;

        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setClearColor(0x999999, 1.0);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMapEnabled = true;

        //load gltfmodel
        
        loadGLTFModel();
        

        //create geometry
        

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
     
        //add geometry to scene


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
       //duck.rotation.y += Math.random();
        scene.add(duck);
        console.log("..loaded " + url);

        });
    }

    function render()
    {
        requestAnimationFrame(render);
        controls.update();
        DirLighthelper.update();
       if(duck) duck.rotation.y -= 0.01;
    
        renderer.render(scene, camera);
       
    }

    window.onload = init;
