
    var scene, camera, renderer;
    var sphere, controls, plane;
    var pointLight;
    let helper, DirLighthelper, shadowCameraHelper, axisHelper;
    var parent, pivot;

    function init()
    {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
        camera.position.z = 10;

        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setClearColor(0x999999, 1.0);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMapEnabled = true;

        //load obj model (obj+mtl)
        loadObjModel();

        //create geometry
        

        //load textures
      
     
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

    function loadObjModel()
    {
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.load( "models/mtl/LEGO_Creator_Plane.mtl", function( materials ) {
        materials.preload();
        console.log("..loaded MTL");

        var loader = new THREE.OBJLoader(  );
        loader.setMaterials(materials);
        loader.load( "models/obj/LEGO_Creator_Plane_2.obj", function(model ){
            model.scale.set(0.005, 0.005, 0.005);
            scene.add(model);
        });
        });
    }

    function render()
    {
        requestAnimationFrame(render);
        controls.update();
        DirLighthelper.update();
        renderer.render(scene, camera);
       
    }

    window.onload = init;
