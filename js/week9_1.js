
    var scene, camera, renderer;
    var sphere, controls, plane;
    var pointLight;
    let helper, DirLighthelper, shadowCameraHelper;
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

        //create geometry
        var sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
        var planeGeometry = new THREE.PlaneGeometry(5, 5, 32);

        //load textures
        var texture = new THREE.TextureLoader().load('textures/Metal-2350b.jpg', function(texture){
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(4,4);
        });

        var bump = new THREE.TextureLoader().load('textures/Metal-2350b-bump-map.jpg', function(bump){
            bump.wrapS = bump.wrapT = THREE.RepeatWrapping;
            bump.repeat.set(4,4);
        });
               
        var material = new THREE.MeshPhongMaterial({map: texture});
        var planeMaterial = new THREE.MeshPhongMaterial({side: THREE.DoubleSide})
     
        //add geometry to scene
        sphere = new THREE.Mesh(sphereGeometry, material);
        sphere.position.z = -3;
        sphere.castShadow = true;
        scene.add(sphere);

        plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.z = -5;
        plane.receiveShadow = true;
        scene.add(plane);

        //lights
        var dirLight = new THREE.DirectionalLight(0x3300ff);
        dirLight.position.set(3, 3, 0);
        dirLight.target.position.set(0, 0, -3);
       dirLight.castShadow = true;
       dirLight.shadowMapWidth = 1024;
       dirLight.shadowMapHeight = 1024;

        scene.add(dirLight.target);
       scene.add(dirLight);
        

       pointLight = new THREE.PointLight(0xff9933, 1, 100, 2);
       pointLight.position.set(0, 0, -2);
       pointLight.castShadow = true;
       scene.add(pointLight);

       var ambient = new THREE.AmbientLight( 0x303030);
        scene.add(ambient);

      helper = new THREE.PointLightHelper(pointLight, 0.1);
      scene.add(helper);
      DirLighthelper = new THREE.DirectionalLightHelper(dirLight);
      scene.add(DirLighthelper);

      controls = new THREE.OrbitControls(camera, renderer.domElement);

      //rotating light
      parent = new THREE.Object3D();
      parent.position.z = -3;
      scene.add(parent);
      pivot = new THREE.Object3D();
      parent.add(pivot);

      
      pivot.add(pointLight);

   
        document.body.appendChild(renderer.domElement);
        render();
  
    };

    function render()
    {
        requestAnimationFrame(render);
        controls.update();
        DirLighthelper.update();
        sphere.rotation.y += 0.01;
        parent.rotation.y -= -0.01;
        renderer.render(scene, camera);
       
    }

    window.onload = init;
