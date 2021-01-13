//Mark Doughty
//16/12/2020
var scene, camera, renderer;
var points, material, geometry, planeGeometry, planeMaterial, plane;
var message, messageGeometry, messageMaterial;
var vector, positions, texture, controls, sz;
var count = 0;

function init()
{

    //mouse stuff
    document.addEventListener( 'mousedown', onDocumentMouseDown );
    //window resize
    window.addEventListener('resize', onWindowResize, false);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 3;
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor(0x0055ff, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    vector = new THREE.Vector3();

    //load textures
    //You can probably do this better with a loop
    texture = new THREE.TextureLoader().load('textures/Gold_Snowflake.png', function(texture){   
    });

    var planeTexture = new THREE.TextureLoader().load('textures/christmasScene.jpg', function(){
    });
    //background plane
    planeGeometry = new THREE.PlaneGeometry(6, 3.5, 32, 32);
    planeMaterial = new THREE.MeshBasicMaterial({map:planeTexture});
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.z = -2;
    scene.add(plane);

    //message plane
    var messageTexture = new THREE.TextureLoader().load('textures/message.jpg', function(){
    });
    messageGeometry = new THREE.PlaneGeometry(1, 0.5, 8, 8);
    messageMaterial = new THREE.MeshBasicMaterial({map:messageTexture});
    message = new THREE.Mesh(messageGeometry, messageMaterial);
    message.position.x = 1.5;
    message.position.y = 0.9;
    message.position.z = -1;
    message.rotation.z = -0.25;
    scene.add(message);

    //geometry
    geometry = new THREE.BufferGeometry();
    //point positions (1000 points)
    positions = new Float32Array(1000 * 3);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    //material
    //randomise size of snowflake
    sz = Math.random();
    material = new THREE.PointsMaterial({map: texture, transparent: true, size:sz});

    //add to scene
    points = new THREE.Points(geometry, material);
    scene.add(points);

    document.body.appendChild(renderer.domElement);
    render();
};

function onDocumentMouseDown(event)
{
    //get mouse press coordinates
    vector.x = (event.clientX/window.innerWidth)*2-1;
    vector.y =  -(event.clientY/window.innerHeight)*2+1;
    vector.z = 0.5;
    //Convert mouse click vector into world space from camera normalised device coords
    vector.unproject(camera);
    //subtract camera position from click position and get distance of z plane from camera
    var dir = vector.sub(camera.position).normalize();
    var distance = -camera.position.z / dir.z;
    //get actual mouse position 
    var mousePos = camera.position.clone().add(dir.multiplyScalar(distance));

    console.log("mouse button pressed.");
    console.log("count: " + count);
    //set point position and add to geometry
    positions[count] = mousePos.x;
    positions[count+=1] = mousePos.y;
    positions[count+=2] = mousePos.z;

    console.log(event.clientX + " , "+event.clientY+" , "+0);
    console.log(window.innerWidth + " , " + window.innerHeight);
    console.log(mousePos.x + " , " + mousePos.y + " , " + mousePos.z);

    points.geometry.attributes.position.needsUpdate = true;

    
}

function updateSnowflakePosition()
{
    //change y position of geometry - like snow falling
    for(var x = 1; x < positions.length; x+=3)
    {
        if(positions[x] <= -1.2)
        {
            //stop at the bottom
        }else{
        positions[x] -=0.005;
        }
        
        
    }
    points.geometry.attributes.position.needsUpdate = true;
}


function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

function render()
{
    //update snowflake position
    updateSnowflakePosition();
  
    //render
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

window.onload = init;