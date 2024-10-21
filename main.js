import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';


import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';



// TO DO LIST
// - Change the dimensions of the pop up text
let roomsLoadedText;
let sceneThreeJS;
var interpolatedPosition;
var alpha = 0.1; // You can adjust this value as needed
let controlObject;
let loadingManager;
let loadingManagerFBX;

var roomWallStartingRoom;
var roomWallCorridor1;
var roomWallHobbiesRoom;
var roomWallCorridor2;
var roomWallSkillSetRoom;
var roomWallCorridor3;
var roomWallProjectRoom;
var roomWallInformationRoom;

let loadingManagerFBXProgress;
let loadingManagerProgress;

let currentFrame = 1;
let AnimationDelay = 50;

let webRenderer

let videoBox;
let buttonOverlay;

var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

let dirX = 0;
let dirZ = 0;

let followPlayer = true;
let isFollowingPlayer = true;

let deadZone = 0.3;
let fwdValue = 0;
let bkdValue = 0;
let rgtValue = 0;
let lftValue = 0;
let tempVector = new THREE.Vector3();
let upVector = new THREE.Vector3(0, 1, 0);

var width = window.innerWidth,
    height = window.innerHeight;

let playerX = 0;
let RoomWalls = [];

let StartingRoomPopUp = [];
let SkillSetRoomPopUp = [];
let HobbyPopUp = [];
let ProjectPopUp = [];
let ContactInformationPopUp = [];

let QuestionMarksStartingRoom = [];
let QuestionMarks = [];
let QuestionMarksSkillSet = [];
let QuestionMarksProject = [];
let QuestionMarksContactInformation = [];

let StartingRoomObjects = [];
let SkillSetRoomObjects = [];
let HobbyRoomObjects = [];
let ProjectRoomObjects = [];
let ContactInformationRoomObjects = [];
let OtherObjects = [];

let PaintCans = [];
let PaintCansCounter = 0
let PaintCansSprite = [];

let ProjectLink = ["Games Made By Alvin.html","https://github.com/AlvinBrunel/Alvins-Repository","https://presynctclothing.com/","https://www.tiktok.com/@mtyeofficial","https://github.com/AlvinBrunel/Alvins-Repository"];
let ProjectOverlay = ['./Sprites/Open Website Plain Icon.png','./Sprites/Open Repository Icon.png','./Sprites/Open Website Icon.png','./Sprites/Open TikTok Icon.png','./Sprites/Open Repository Icon.png']

let StartingRoomOverlay = './Sprites/Open Contact Information Icon.png';

let UnlockPainting;

let justLoaded = true;

let CurrentRoomCollisonMin = new Array(
  new Array(-118,27), //Fish Tank
  new Array(-33,-118), //Statue
  new Array(62,-118), //Globe
  );

let CurrentRoomCollisonMax = new Array(
  new Array(-81,103), //Fish Tank
  new Array(28,-63), //Statue
  new Array(95,-88), //Globe
    );

let StartingRoomCollisonMin = new Array(
  new Array(-118,27), //Fish Tank
  new Array(-33,-118), //Statue
  new Array(62,-118), //Globe
  );
let StartingRoomCollisonMax = new Array(
  new Array(-81,103), //Fish Tank
  new Array(28,-63), //Statue
  new Array(95,-88), //Globe
  );

let HobbyRoomCollisonMin = new Array(
  new Array(118,29), //Music
  new Array(260,-83), //Gaming
  new Array(196,-83), //Gym
  new Array(407,28), //Fashion
  new Array(403,-83), //Sports
  );
let HobbyRoomCollisonMax = new Array(
  new Array(213,98), //Music
  new Array(353,-56), //Gaming
  new Array(222,-9), //Gym
  new Array(428,98), //Fashion
  new Array(428,-56), //Sports
  );

let SkillSetRoomCollisonMin = new Array(
  new Array(559,-116), //Left Side
  new Array(746,-116), //Right Side
  new Array(763,68), //Problem Solving
  new Array(590,70), //Block 1 
  new Array(568,105), //Block 2
  );
let SkillSetRoomCollisonMax = new Array(
  new Array(626,-86), //Left Side
  new Array(816,-86), //Right Side
  new Array(816,132), //Problem Solving
  new Array(628,109), //Block 1
  new Array(596,127), //Block 2
  
  );
  let ProjectRoomCollisonMin = new Array(
    new Array(1037,70), //University Area
    new Array(1000,-172), //Tiktok Area
    new Array(1403,-85), //Couch
    new Array(1260,85), //Plant Table
    new Array(1281,62), //PRESYNCT Couch 1 
    new Array(1397,125), //PRESYNCT Couch 2
    new Array(1295,133), //PRESYNCT Table
    );
  let ProjectRoomCollisonMax = new Array(
    new Array(1192,160), //University Area
    new Array(1047,-28), //Tiktok Area
    new Array(1438,-47), //Couch
    new Array(1281,112), //Plant Table
    new Array(1397,125), //PRESYNCT Couch 1 
    new Array(1433,197), //PRESYNCT Couch 2
    new Array(1378,175), //PRESYNCT Table
    );

  let ContactInformationRoomCollisonMin = new Array(
    new Array(1465,52), //Basketball Hoop
    new Array(1590,7), //Clothing Rail
    new Array(1492,-83), //Table
    new Array(1563,-83), //Boxes
    );
  let ContactInformationRoomCollisonMax = new Array(
    new Array(1512,91), //Basketball Hoop
    new Array(1598,83), //Clothing Rail
    new Array(1598,-52), //Table
    new Array(1598,-36), //Boxes
    );

let StartingRoomCamera = new Array(
  new THREE.Vector3(-59, 71, 200), //Contact Information
  new THREE.Vector3(100, 71, 190), //Tour Guide
  new THREE.Vector3(-43, 61, 30), //School History
  new THREE.Vector3(80, 61, 20),  //Location
  );

let HobbyCamera = new Array(
  new THREE.Vector3(208, 61, 32), //Gym
  new THREE.Vector3(377, 61, 21), //Basketball
  new THREE.Vector3(387, 61, 163), //Fashion // y = 41
  new THREE.Vector3(306, 61, 24), //Gaming
  new THREE.Vector3(233, 61, 149), //Music
  );

let SkillSetRoomCamera = new Array(
  new THREE.Vector3(783, 70, -42), //Right Skills
  new THREE.Vector3(593, 70, -42), //Left Skills
  new THREE.Vector3(783, 70, -42), //Right Shelf Skills
  new THREE.Vector3(593, 70, -42), //Left Shelf Skills
  new THREE.Vector3(593, 73, 190), //Software Development Skills
  new THREE.Vector3(790, 61, 180),  //Location
  );

let ProjectRoomCamera = new Array(
  new THREE.Vector3(1228 ,95,-70), //Games
  new THREE.Vector3(1362, 80, 60), //3D Models
  new THREE.Vector3(1338, 70, 260), //PRESYNCT
  new THREE.Vector3(1080, 90, 80), //Tiktok
  new THREE.Vector3(1121, 90, 240), //University Work

  );

let ContactInformationRoomCamera = new Array(
  new THREE.Vector3(1529 ,90,150), //Contact Information
  );

let TriggerDistance = 45;
let TriggerDistanceProjectRoom =  80;
let ReachDistance = 15;


let currentFocus = null;
let currentFocusStartingRoom = null;
let currentFocusSkillSetRoom = null;
let currentFocusProjectRoom = null;
let currentFocusContactInformationRoom = null;

let Player;

let destination = new THREE.Vector3(0,0,0);
let destinationx = new THREE.Vector3(0,0,0);
let destinationz = new THREE.Vector3(0,0,0);

let cam;

let roomCamera = new Array(
  new THREE.Vector3(0, 110, 250), 
  new THREE.Vector3(306.5, 110, 200),
  new THREE.Vector3(687.5, 110, 220),
  new THREE.Vector3(1217.5, 110, 300),
  new THREE.Vector3(1529, 110, 250),
  );
let currentRoom = 0;
let currentRoomandCorridor = 0;
//Room Boundaries
let minRoomBoundaries = new Array(
  new Array(-118,-117), //room 1 
  new Array(125,0), // corridor 1
  new Array(188,-83), // room 2
  new Array(428,0), // corridor 2
  new Array(559,-116), // room 3
  new Array(816,0), // corridor 3
  new Array(1000,-182), // room 4
  new Array(1435,-9), // corridor 4
  new Array(1465,-83), // room 5
  );
let maxRoomBoundaries = new Array(
  new Array(125,123), //room 1 
  new Array(188,10), // corridor 1 
  new Array(428,98), // room 2
  new Array(559,14), // corridor 2
  new Array(816,132), // room 3
  new Array(1000,13), // corridor 3
  new Array(1438,197), // room 4
  new Array(1465,0), // corridor 4
  new Array(1598,91), // room 5
  );

let Rooms = minRoomBoundaries.length;

let playerSpeed = 75;


function ChangeWalls(Player) 
{
  //Starting Rooms Walls
  if(roomWallStartingRoom)
  {
    if(Player.position.x < 188 && roomWallStartingRoom.scene.visible == true)
    {
      roomWallStartingRoom.scene.visible = false;
    }
    else if(Player.position.x > 188 && roomWallStartingRoom.scene.visible == false)
    {
      roomWallStartingRoom.scene.visible = true;
    }
  }

  //Corridor 1
  if(roomWallCorridor1)
  {
    if(Player.position.x > 125 && Player.position.x < 188 && roomWallCorridor1.scene.visible == true)
    {
      roomWallCorridor1.scene.visible = false;
    }
    else if((Player.position.x < 125 || Player.position.x > 188) && roomWallCorridor1.scene.visible == false)
    {
      roomWallCorridor1.scene.visible = true;
    }
  }

  //Hobbies Room
  if(roomWallHobbiesRoom)
  {
    if(Player.position.x > 125 && Player.position.x < 559 && roomWallHobbiesRoom.scene.visible == true)
    {
      roomWallHobbiesRoom.scene.visible = false;
    }
    else if((Player.position.x < 125 || Player.position.x > 559) && roomWallHobbiesRoom.scene.visible == false)
    {
      roomWallHobbiesRoom.scene.visible = true;
    }
  }
  
  //Corridor 2
  if(roomWallCorridor2)
  {
    if(Player.position.x > 428 && Player.position.x < 559 && roomWallCorridor2.scene.visible == true)
    {
      roomWallCorridor2.scene.visible = false;
    }
    else if((Player.position.x < 428 || Player.position.x > 559) && roomWallCorridor2.scene.visible == false)
    {
      roomWallCorridor2.scene.visible = true;
    }
  }

  //Skillset Room 
  if(roomWallSkillSetRoom)
  {
    if(Player.position.x > 428 && Player.position.x < 1000 && roomWallSkillSetRoom.scene.visible == true)
    {
      roomWallSkillSetRoom.scene.visible = false;
    }
    else if((Player.position.x < 428 || Player.position.x > 1000) && roomWallSkillSetRoom.scene.visible == false)
    {
      roomWallSkillSetRoom.scene.visible = true;
    }
  }

  //Corridor 3
  if(roomWallCorridor3)
  {
    if(Player.position.x > 816 && Player.position.x < 1000 && roomWallCorridor3.scene.visible == true)
    {
      roomWallCorridor3.scene.visible = false;
    }
    else if((Player.position.x < 816 || Player.position.x > 1000) && roomWallCorridor3.scene.visible == false)
    {
      roomWallCorridor3.scene.visible = true;
    }
  }
  //Project Room
  if(roomWallProjectRoom)
  {
    if(Player.position.x > 816 && Player.position.x < 1438 && roomWallProjectRoom.scene.visible == true)
    {
      roomWallProjectRoom.scene.visible = false;
    }
    else if((Player.position.x < 816 || Player.position.x > 1438) && roomWallProjectRoom.scene.visible == false)
    {
      roomWallProjectRoom.scene.visible = true;
    }
  }
  //Contact Information Room
  if(roomWallInformationRoom)
  {
    if(Player.position.x > 1435 && roomWallInformationRoom.scene.visible == true)
    {
      roomWallInformationRoom.scene.visible = false;
    }
    else if(Player.position.x < 1435 && roomWallInformationRoom.scene.visible == false)
    {
      roomWallInformationRoom.scene.visible = true;
    }
  }
}

class BasicCharacterControllerProxy {
  constructor(animations) {
    this._animations = animations;
  }

  get animations() {
    return this._animations;
  }
};


class BasicCharacterController {
  constructor(params) {
    this._Init(params);
  }

  _Init(params) {
    this._params = params;
    this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -0.0005);
    this._acceleration = new THREE.Vector3(100, 0.25, 100);
    this._velocity = new THREE.Vector3(0, 0, 0);

    this._animations = {};
    this._input = new BasicCharacterControllerInput();
    this._stateMachine = new CharacterFSM(
        new BasicCharacterControllerProxy(this._animations));

    this._LoadModels();
  }

  _LoadModels() {

    const loader = new FBXLoader(loadingManager);
    loader.setPath('./3D Models/Character/');
    loader.load('Character.fbx', (fbx) => {
      fbx.scale.setScalar(0.2);
      fbx.traverse(c => {
        c.castShadow = false;
      });

      this._target = fbx;
      this._params.scene.add(this._target);

      this._mixer = new THREE.AnimationMixer(this._target);

      this._manager = new THREE.LoadingManager();

      this._manager.onProgress = function(url, loaded, total) {
        loadingManagerProgress = (loaded / total) * 100;
        //document.getElementById("LoadingScreenProgress").textContent = loadingManagerProgress.toString();;
        //console.log(document.getElementById("LoadingScreenProgress").textContent)

    }

      this._manager.onLoad = () => {
      this._stateMachine.SetState('idle');
      };

      const _OnLoad = (animName, anim) => {
        const clip = anim.animations[0];
        const action = this._mixer.clipAction(clip);
  
        this._animations[animName] = {
          clip: clip,
          action: action,
        };
      };

      const loader = new FBXLoader(this._manager);

      loader.setPath('./3D Models/Character/');
      loader.load('Character Idle.fbx', (a) => { _OnLoad('walk', a); });
      loader.load('Character Idle.fbx', (a) => { _OnLoad('idle', a); });
    });
  }

  Update(timeInSeconds) {
    if (!this._target) {
      return;
    }

    this._stateMachine.Update(timeInSeconds, this._input);



    controlObject = this._target;
    Player = controlObject;


    const acc = this._acceleration.clone();
    if (this._input._keys.shift) {
      acc.multiplyScalar(2.0);
    }

    dirX = -(Number(this._input._keys.forward)) + Number(this._input._keys.backward);
    dirZ = -(Number(this._input._keys.left)) + Number(this._input._keys.right);

    if (dirX == 0 || dirZ == 0)
    {
      if (rgtValue > deadZone)
      {
        dirZ = 1
      }
      if (lftValue > deadZone)
      {
        dirZ = -1
      }
      if(fwdValue > deadZone)
      {
        dirX = -1
      }
      if(bkdValue > deadZone)
      {
        dirX = 1
      }
    }

    if(this._input._keys.space)
    {
      console.log(controlObject.position);
      //console.log(CurrentRoomCollisonMax[1][1]);
      //console.log(cam.position);
      //console.log(StartingRoomPopUp);
      //console.log( roomWallStartingRoom);

      //console.log(window.devicePixelRatio);
      //ChangeWalls(Player);
      //console.log(StartingRoomPopUp[0].material);

    }
    destination = new THREE.Vector3(controlObject.position.x,controlObject.position.y,controlObject.position.z);
    destinationx = new THREE.Vector3(controlObject.position.x,controlObject.position.y,controlObject.position.z);
    destinationz = new THREE.Vector3(controlObject.position.x,controlObject.position.y,controlObject.position.z);

    const Movementx = new THREE.Vector3(dirZ* timeInSeconds*playerSpeed, 0,0);
    const Movementz = new THREE.Vector3(0, 0, dirX* timeInSeconds*playerSpeed);
    const Movement = new THREE.Vector3(dirZ* timeInSeconds*playerSpeed, 0, dirX* timeInSeconds*playerSpeed);

    destination.add(Movement);
    destinationx.add(Movementx);
    destinationz.add(Movementz);

    if( isFollowingPlayer == true) //followPlayer == true &&
    {
      PlayerCameraMovement(controlObject.position.x);
    }
    if(currentRoom == 0)
    {
      DisplayStartingRoom(this._target);
      if (this._input._keys.space) 
      {
        if (cam.position.equals(StartingRoomCamera[0]))
        {
          window.open('Contact Information.html', '_blank'); //Contact Information Page 
        }
      }

    }
    if(currentRoom == 1)
    {
      DisplayHobbies(this._target);
    }
    if(currentRoom == 2)
    {
      DisplaySkillSetRoom(this._target);
    }
    if(currentRoom == 3)
    {
      DisplayProjects(this._target);

      if (this._input._keys.space) 
      {
        if (cam.position.equals(ProjectRoomCamera[0]))
        {

          window.open('Games Made By Alvin.html', '_blank');//CHANGE TO GITHUB OF GAMES
        }
        if (cam.position.equals(ProjectRoomCamera[1]))
        {
          window.open('https://www.statsforspotify.com/artist/top?timeRange=short_term') //CHANGE TO GITHUB OF 3D MODELS
        }
        if (cam.position.equals(ProjectRoomCamera[2]))
        {
          window.open('https://presynctclothing.com/') //PRESYNCT WEBPAGE
        }
        if (cam.position.equals(ProjectRoomCamera[3]))
        {
          window.open('https://www.tiktok.com/@mtyeofficial') //TIKTOK
        }
        if (cam.position.equals(ProjectRoomCamera[4]))
        {
          window.open('https://github.com/AlvinBrunel/Alvins-Repository') //CHANGE TO GITHUB OF University
        }
      }
    }
    if(currentRoom == 4)
    {
      DisplayContactInformationRoom(this._target);

      if (this._input._keys.space) 
      {
        if (cam.position.equals(ContactInformationRoomCamera[0]))
        {
          window.open('Contact Information.html', '_blank'); //Contact Information Page
        }
      }
    }
    if (this._input._keys.space) 
    {
      
      for(let i =0;i<PaintCans.length;i++)
      {
        if(controlObject.position.distanceTo(PaintCans[i].scene.position) <= ReachDistance && PaintCans[i].scene.visible)
        {
          PaintCans[i].scene.visible = false;
          PaintCansCounter++

          for(let i =0;i<PaintCansSprite.length;i++)
          {
            if(i == PaintCansCounter)
            {
              PaintCansSprite[i].visible = true;
            }
            else
            {
              PaintCansSprite[i].visible = false;
            }
            if (PaintCansCounter == 6)
            {
              UnlockPainting.scene.visible = true;
              PaintCansSprite[i].visible = false;
            }
          }
          break;
        }
      }
    }


    if (InBounds(destination,minRoomBoundaries,maxRoomBoundaries) == true && dirX != 0  && dirZ != 0 )
    {
      controlObject.position.add(Movement);
    }
    else if (InBounds(destinationx,minRoomBoundaries,maxRoomBoundaries) == true && dirZ != 0 )
    {
      controlObject.position.add(Movementx);
    }
    else if (InBounds(destinationz,minRoomBoundaries,maxRoomBoundaries) == true && dirX != 0 )
    {
      controlObject.position.add(Movementz);
    }

    destination = controlObject.position
    playerX = controlObject.position.x

    if (dirZ < 0) { //this._input._keys.left
 
      if(dirX < 0 ) //this._input._keys.forward
      {
        controlObject.rotation.y =  ((Math.PI*2)/4)*2.5;
      }
      else if (dirX > 0) { //this._input._keys.backward
        controlObject.rotation.y = ((Math.PI*2)/4)*3.5;
      }
      else
      {
        controlObject.rotation.y = ((Math.PI*2)/4)*3;
      }

    }
    else if (dirZ > 0) { //this._input._keys.right
      if(dirX < 0) //this._input._keys.forward
      {
        controlObject.rotation.y =  ((Math.PI*2)/4)*1.5;
      }
      else if (dirX > 0) { //this._input._keys.backward
        controlObject.rotation.y = ((Math.PI*2)/4)*4.5;
      }
      else
      {
        controlObject.rotation.y =  ((Math.PI*2)/4)*1;
      }
    }
    else if (dirX < 0) { //this._input._keys.forward
      controlObject.rotation.y =  ((Math.PI*2)/4)*2;
    }
    else if (dirX > 0) { //this._input._keys.backward
      controlObject.rotation.y = ((Math.PI*2)/4)*4;
    }

    if (this._mixer) {
      this._mixer.update(timeInSeconds);
    }
  }
};
function releaseTexture(texture) {
  if (texture) {
    if (Array.isArray(texture.image)) {
      for (let i = 0, len = texture.image.length; i < len; i++) {
        if (texture.image[i]) {
          releaseImageMipmaps(texture.image[i]);
          texture.image[i] = undefined;
        }
      }
    } else if (texture.image) {
      releaseImageMipmaps(texture.image);
      texture.image = undefined;
    }

    releaseMipmaps(texture);

    texture.onUpdate = undefined;
  }
}

function releaseImageMipmaps(image) {
  if (image.mipmaps) {
    image.mipmaps.length = 0;
  }
}

function releaseMipmaps(texture) {
  if (texture.mipmaps) {
    texture.mipmaps.length = 0;
  }
}
function disposeScene(scene) {
  if (scene === undefined) return;

  // Dispose of geometries, materials, textures, and other elements
  scene.traverse(disposeObject);
  cleanup();
  // Clear the scene
  scene.children.length = 0;
}

function disposeObject(obj) {
  if (obj instanceof THREE.Mesh) {
    if (obj.geometry) {
      obj.geometry.dispose();
    }
    if (obj.material) {
      if (Array.isArray(obj.material)) {
        obj.material.forEach(disposeMaterial);
      } else {
        disposeMaterial(obj.material);
      }
    }
  } else if (obj instanceof THREE.Object3D) {
    // You can extend this block to handle other object types if needed
  }
}

function disposeMaterial(material) {
  if (material.map) {
    material.map.dispose();
  }
  if (material.normalMap) {
    material.normalMap.dispose();
  }
  if (material.specularMap) {
    material.specularMap.dispose();
  }

  material.dispose();
}

function cleanup() {
  window.removeEventListener('resize', onWindowResize);
  window.removeEventListener('DOMContentLoaded');

  document.removeEventListener('keydown');
  document.removeEventListener('keyup');
  document.removeEventListener('keyleft');
  document.removeEventListener('keyright');
  document.removeEventListener("visibilitychange");
  window.gc();
}

function InBounds(newPos,minBounds,maxBounds)
{
  ChangeWalls(Player) 
  for(let i =0;i<Rooms;i++ ) //change based on rooms 
  {
    if(newPos.x >= minBounds[i][0] && newPos.x <= maxBounds[i][0] && newPos.z >= minBounds[i][1] && newPos.z <= maxBounds[i][1])
    {
      for(let i=0;i<CurrentRoomCollisonMax.length;i++)
      {
        if(newPos.x >= CurrentRoomCollisonMin[i][0] && newPos.x <= CurrentRoomCollisonMax[i][0] && newPos.z >= CurrentRoomCollisonMin[i][1] && newPos.z <= CurrentRoomCollisonMax[i][1])
        {
          return false;
        }
      }
      if(i % 2 == 0 && currentRoom != i/2) 
      {
        currentRoom = i/2
        if(followPlayer == true)
        {
          interpolatedPosition = new THREE.Vector3();
          interpolatedPosition.lerpVectors(cam.position, roomCamera[currentRoom], alpha);
          cam.position.copy(interpolatedPosition);
        }

        if (currentRoom == 0)
        {
          CurrentRoomCollisonMin.splice(0,CurrentRoomCollisonMin.length)
          CurrentRoomCollisonMax.splice(0,CurrentRoomCollisonMax.length)

          CurrentRoomCollisonMin = [...StartingRoomCollisonMin]
          CurrentRoomCollisonMax = [...StartingRoomCollisonMax]
          
        }
        if (currentRoom == 1)
        {
          CurrentRoomCollisonMin.splice(0,CurrentRoomCollisonMin.length)
          CurrentRoomCollisonMax.splice(0,CurrentRoomCollisonMax.length)

          CurrentRoomCollisonMin = [...HobbyRoomCollisonMin];
          CurrentRoomCollisonMax = [...HobbyRoomCollisonMax];
        }
        if (currentRoom == 2)
        {
          CurrentRoomCollisonMin.splice(0,CurrentRoomCollisonMin.length)
          CurrentRoomCollisonMax.splice(0,CurrentRoomCollisonMax.length)

          CurrentRoomCollisonMin = [...SkillSetRoomCollisonMin];
          CurrentRoomCollisonMax = [...SkillSetRoomCollisonMax];
        }
        if (currentRoom == 3)
        {
          CurrentRoomCollisonMin.splice(0,CurrentRoomCollisonMin.length)
          CurrentRoomCollisonMax.splice(0,CurrentRoomCollisonMax.length)

          CurrentRoomCollisonMin = [...ProjectRoomCollisonMin];
          CurrentRoomCollisonMax = [...ProjectRoomCollisonMax];
        }
        if (currentRoom == 4)
        {
          CurrentRoomCollisonMin.splice(0,CurrentRoomCollisonMin.length)
          CurrentRoomCollisonMax.splice(0,CurrentRoomCollisonMax.length)

          CurrentRoomCollisonMin = [...ContactInformationRoomCollisonMin];
          CurrentRoomCollisonMax = [...ContactInformationRoomCollisonMax];
        }
      }
 
      return true;
    }
  }
  return false;
}
function DisplayStartingRoom(Player)
{
  for(let i=0;i<StartingRoomPopUp.length;i++)
  {
    if(Player.position.distanceTo(new THREE.Vector3(QuestionMarksStartingRoom[i].position.x,0,QuestionMarksStartingRoom[i].position.z)) < TriggerDistance)
    {
      for(let j=0;j < StartingRoomPopUp.length;j++)
      {
        QuestionMarksStartingRoom[j].visible = false;
      }
      break;
    }
    else
    {
      QuestionMarksStartingRoom[i].visible = true;
    }
  }
  for(let i=0;i<StartingRoomPopUp.length;i++)
  {

    if(Player.position.distanceTo(new THREE.Vector3(QuestionMarksStartingRoom[i].position.x,0,QuestionMarksStartingRoom[i].position.z)) < TriggerDistance)
    {
      if(currentFocusStartingRoom != StartingRoomPopUp[i])
      {
        if (i == 0)
        {
          document.getElementById("buttonOpen").style.backgroundImage = "url('" + StartingRoomOverlay + "')";
          
          buttonOverlay.disabled = false;
          document.getElementById("buttonOpenLink").href = "Contact Information.html";
          document.getElementById("FocusBackground").style.opacity = 1;
          document.getElementById("buttonOpen").style.opacity = 1;
        }
        currentFocusStartingRoom = StartingRoomPopUp[i];
        document.getElementById("PopUp").src = currentFocusStartingRoom;
        document.getElementById("PopUp").style.opacity = 1;

        if(followPlayer == true)
        {
          isFollowingPlayer = false;
        }

        interpolatedPosition = new THREE.Vector3();
interpolatedPosition.lerpVectors(cam.position, StartingRoomCamera[i], alpha);
cam.position.copy(interpolatedPosition);
      }
      return;
    }
  }

  currentFocusStartingRoom = null;
  document.getElementById("PopUp").src = "";
  document.getElementById("PopUp").style.opacity = 0
  document.getElementById("buttonOpen").style.opacity = 0;
  document.getElementById("FocusBackground").style.opacity = 0;
  buttonOverlay.disabled = true;
  if(followPlayer == true)
  {
    isFollowingPlayer = true
  }
  else
  {
    interpolatedPosition = new THREE.Vector3();
    interpolatedPosition.lerpVectors(cam.position, roomCamera[currentRoom], alpha);
    cam.position.copy(interpolatedPosition);
  }
}
function DisplayHobbies(Player)
{
  for(let i=0;i<QuestionMarks.length;i++)
  {
    if(Player.position.distanceTo(new THREE.Vector3(QuestionMarks[i].position.x,0,QuestionMarks[i].position.z)) < TriggerDistance)
    {
      for(let j=0;j < QuestionMarks.length;j++)
      {
        QuestionMarks[j].visible = false;
      }
      break;
    }
    else
    {
      QuestionMarks[i].visible = true;
    }
  }
  for(let i=0;i<HobbyPopUp.length;i++)
  {

    if(Player.position.distanceTo(new THREE.Vector3(QuestionMarks[i].position.x,0,QuestionMarks[i].position.z)) < TriggerDistance)
    {
      if(currentFocus != HobbyPopUp[i])
      {
        if (currentFocus != null)
        {
        }
        currentFocus = HobbyPopUp[i];
        document.getElementById("PopUp").src = currentFocus
        document.getElementById("PopUp").style.opacity = 1

        if(followPlayer == true)
        {
          isFollowingPlayer = false;
        }

        interpolatedPosition = new THREE.Vector3();
        interpolatedPosition.lerpVectors(cam.position, HobbyCamera[i], alpha);
        cam.position.copy(interpolatedPosition);
        
      }
      return;
    }
  }
  if (currentFocus != null)
  {
  }
  currentFocus = null;
  document.getElementById("PopUp").src = "";
  document.getElementById("PopUp").style.opacity = 0
  if(followPlayer == true)
  {
    isFollowingPlayer = true
  }
  else
  {
    interpolatedPosition = new THREE.Vector3();
    interpolatedPosition.lerpVectors(cam.position, roomCamera[currentRoom], alpha);
    cam.position.copy(interpolatedPosition);
  }
}
function DisplaySkillSetRoom(Player)
{
  for(let i=0;i<QuestionMarksSkillSet.length;i++)
  {
    if(Player.position.distanceTo(new THREE.Vector3(QuestionMarksSkillSet[i].position.x,0,QuestionMarksSkillSet[i].position.z)) < TriggerDistance)
    {
      for(let j=0;j < QuestionMarksSkillSet.length;j++)
      {
        QuestionMarksSkillSet[j].visible = false;
      }
      break;
    }
    else
    {
      QuestionMarksSkillSet[i].visible = true;
    }
  }
  for(let i=0;i<SkillSetRoomPopUp.length;i++)
  {

    if(Player.position.distanceTo(new THREE.Vector3(QuestionMarksSkillSet[i].position.x,0,QuestionMarksSkillSet[i].position.z)) < TriggerDistance)
    {
      if(currentFocusSkillSetRoom != SkillSetRoomPopUp[i])
      {
        if (currentFocusSkillSetRoom != null)
        {
        }
        currentFocusSkillSetRoom = SkillSetRoomPopUp[i];
        document.getElementById("PopUp").src = SkillSetRoomPopUp[i];
        document.getElementById("PopUp").style.opacity = 1

        if(followPlayer == true)
        {
          isFollowingPlayer = false;
        }

        interpolatedPosition = new THREE.Vector3();
        interpolatedPosition.lerpVectors(cam.position, SkillSetRoomCamera[i], alpha);
        cam.position.copy(interpolatedPosition);
      }
      return;
    }
  }
  if (currentFocusSkillSetRoom != null)
  {
  }
  currentFocusSkillSetRoom = null;
  document.getElementById("PopUp").src = ""
  document.getElementById("PopUp").style.opacity = 0
  if(followPlayer == true)
  {
    isFollowingPlayer = true
  }
  else
  {
    interpolatedPosition = new THREE.Vector3();
    interpolatedPosition.lerpVectors(cam.position, roomCamera[currentRoom], alpha);
    cam.position.copy(interpolatedPosition);
  }
}
function DisplayProjects(Player)
{
  for(let i=0;i<ProjectPopUp.length;i++)
  {
    if(Player.position.distanceTo(new THREE.Vector3(QuestionMarksProject[i].position.x,0,QuestionMarksProject[i].position.z)) < TriggerDistanceProjectRoom)
    {
      for(let j=0;j < QuestionMarksProject.length;j++)
      {
        QuestionMarksProject[j].visible = false;
      }
      break;
    }
    else
    {
      QuestionMarksProject[i].visible = true;
    }
  }
  for(let i=0;i<ProjectPopUp.length;i++)
  {

    if(Player.position.distanceTo(new THREE.Vector3(QuestionMarksProject[i].position.x,0,QuestionMarksProject[i].position.z)) < TriggerDistanceProjectRoom)
    {
      if(currentFocusProjectRoom != ProjectPopUp[i])
      {
        if (ProjectOverlay[i] != null)
        {
          document.getElementById("buttonOpen").style.backgroundImage = "url('" + ProjectOverlay[i] + "')";
          buttonOverlay.disabled = false;
          console.log(document.getElementById("buttonOpen").style.backgroundImage);
          document.getElementById("buttonOpenLink").href = ProjectLink[i];
          document.getElementById("buttonOpen").style.opacity = 1;
        }
        currentFocusProjectRoom = ProjectPopUp[i]; 
        document.getElementById("ProjectPopUpBox").src = currentFocusProjectRoom;

        document.getElementById("PopUpPhoneFrame").style.opacity = 1;



        //document.getElementById("TapTheScreen").style.opacity = 1;

        videoBox.style.opacity = 1;

        if(followPlayer == true)
        {
          isFollowingPlayer = false;
        }

        interpolatedPosition = new THREE.Vector3();
        interpolatedPosition.lerpVectors(cam.position, ProjectRoomCamera[i], alpha);
        cam.position.copy(interpolatedPosition);
      }
      return;
    }
  }
  if (currentFocusProjectRoom != null)
  {
  }
  currentFocusProjectRoom = null;
  document.getElementById("ProjectPopUpBox").src = "";
  document.getElementById("PopUpPhoneFrame").style.opacity = 0;
  //document.getElementById("TapTheScreen").style.opacity = 0;
  document.getElementById("buttonOpen").style.opacity = 0;
  buttonOverlay.disabled = true;
  videoBox.style.opacity = 0;
  if(followPlayer == true)
  {
    isFollowingPlayer = true
  }
  else
  {
    interpolatedPosition = new THREE.Vector3();
    interpolatedPosition.lerpVectors(cam.position, roomCamera[currentRoom], alpha);
    cam.position.copy(interpolatedPosition);
  }
}
function DisplayContactInformationRoom(Player)
{
  for(let i=0;i<ContactInformationPopUp.length;i++)
  {
    if(Player.position.distanceTo(new THREE.Vector3(QuestionMarksContactInformation[i].position.x,0,QuestionMarksContactInformation[i].position.z)) < TriggerDistance)
    {
      for(let j=0;j < ContactInformationPopUp.length;j++)
      {
        QuestionMarksContactInformation[j].visible = false;
      }
      break;
    }
    else
    {
      QuestionMarksContactInformation[i].visible = true;
    }
  }
  for(let i=0;i<ContactInformationPopUp.length;i++)
  {

    if(Player.position.distanceTo(new THREE.Vector3(QuestionMarksContactInformation[i].position.x,0,QuestionMarksContactInformation[i].position.z)) < TriggerDistance)
    {
      if(currentFocusContactInformationRoom != ContactInformationPopUp[i])
      {
        if (i == 0)
        {
          document.getElementById("buttonOpen").style.backgroundImage = "url('" + StartingRoomOverlay + "')";
          
          buttonOverlay.disabled = false;
          document.getElementById("buttonOpenLink").href = "Contact Information.html";
          document.getElementById("buttonOpen").style.opacity = 1;
        }
        currentFocusContactInformationRoom = ContactInformationPopUp[i];
        document.getElementById("PopUp").src = currentFocusContactInformationRoom;
        document.getElementById("PopUp").style.opacity = 1;

        if(followPlayer == true)
        {
          isFollowingPlayer = false;
        }

        interpolatedPosition = new THREE.Vector3();
        interpolatedPosition.lerpVectors(cam.position, ContactInformationRoomCamera[i], alpha);
        cam.position.copy(interpolatedPosition);
      }
      return;
    }
  }

  currentFocusContactInformationRoom = null;
  document.getElementById("PopUp").src = "";
  document.getElementById("PopUp").style.opacity = 0
  document.getElementById("buttonOpen").style.opacity = 0;
  buttonOverlay.disabled = true;
  if(followPlayer == true)
  {
    isFollowingPlayer = true
  }
  else
  {
    cam.position.copy(roomCamera[currentRoom]);
  }
}
function PlayerCameraMovement(Target)
{
  cam.position.x = Target;
  cam.position.y = 110;
  cam.position.z = 250;
  //new THREE.Vector3(controlObject.position.x,controlObject.position.y,controlObject.position.z);
}
function replaceFirstInstance(originalString, searchString, replacement) {
  const index = originalString.indexOf(searchString);
  if (index === -1) {
      // If the searchString is not found, return the original string
      return originalString;
  }
  // Replace the first instance of searchString with replacement
  return originalString.substring(0, index) + replacement + originalString.substring(index + searchString.length);
}
if(navigator.maxTouchPoints ) 
{
  $(document).ready(function() {
  
    var options = { 
      zone: document.getElementById('joystick-container'),
      color: 'white',
      size: 100,
    };

    var joyManager = nipplejs.create(options);
    joyManager.on('move', function (evt, data) {
      const forward = data.vector.y;
      const turn = data.vector.x;
      if (forward > 0) {
        fwdValue = Math.abs(forward);
        bkdValue = 0;
        dirZ = -1;
      } else if (forward < 0) {
        fwdValue = 0;
        bkdValue = Math.abs(forward);
        dirZ = 1;
      }

      if (turn > 0) {
        lftValue = 0;
        rgtValue = Math.abs(turn);
        dirX = 1;
      } else if (turn < 0) {
        lftValue = Math.abs(turn);
        rgtValue = 0;
        dirX = -1;
      }
    })

  joyManager.on('end', function (evt) {
      bkdValue = 0;
      fwdValue = 0;
      lftValue = 0;
      rgtValue = 0;
    })
  });
}

class BasicCharacterControllerInput {
  constructor() {
    this._Init();    
  }

  _Init() {
    this._keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      space: false,
      shift: false,
    };
    document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
    document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
    document.addEventListener('keyleft', (e) => this._onKeyDown(e), false);
    document.addEventListener('keyright', (e) => this._onKeyUp(e), false);

    document.addEventListener("visibilitychange", (event) => {
      if (document.visibilityState == "visible") {
        //TAB IS ACTIVE
      } else {
        //TAB IS INACTIVE
        this._keys.forward = false;
        this._keys.left = false;
        this._keys.backward = false;
        this._keys.right = false;
        this._keys.space = false;


      }
    });
  }

  _onKeyDown(event) {
    switch (event.keyCode) {
      case 87: // w
        this._keys.forward = true;
        break;
      case 65: // a
        this._keys.left = true;
        break;
      case 83: // s
        this._keys.backward = true;
        break;
      case 68: // d
        this._keys.right = true;
        break;
      case 32: // SPACE
        this._keys.space = true;
        break;
      case 16: // SHIFT
        this._keys.shift = true;
        break;
    }
  }

  _onKeyUp(event) {
    switch(event.keyCode) {
      case 87: // w
        this._keys.forward = false;
        break;
      case 65: // a
        this._keys.left = false;
        break;
      case 83: // s
        this._keys.backward = false;
        break;
      case 68: // d
        this._keys.right = false;
        break;
      case 32: // SPACE
        this._keys.space = false;
        break;
      case 16: // SHIFT
        this._keys.shift = false;
        break;
    }
  }
};


class FiniteStateMachine {
  constructor() {
    this._states = {};
    this._currentState = null;
  }

  _AddState(name, type) {
    this._states[name] = type;
  }

  SetState(name) {
    const prevState = this._currentState;
    
    if (prevState) {
      if (prevState.Name == name) {
        return;
      }
      prevState.Exit();
    }

    const state = new this._states[name](this);

    this._currentState = state;
    state.Enter(prevState);
  }

  Update(timeElapsed, input) {
    if (this._currentState) {
      this._currentState.Update(timeElapsed, input);
    }
  }
};


class CharacterFSM extends FiniteStateMachine {
  constructor(proxy) {
    super();
    this._proxy = proxy;
    this._Init();
  }

  _Init() {
    this._AddState('idle', IdleState);
    this._AddState('walk', WalkState);
  }
};


class State {
  constructor(parent) {
    this._parent = parent;
  }

  Enter() {}
  Exit() {}
  Update() {}
};




class WalkState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'walk';
  }

  Enter(prevState) {
    const curAction = this._parent._proxy._animations['walk'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;

      curAction.enabled = true;


        curAction.time = 0.0;
        curAction.setEffectiveTimeScale(1.0);
        curAction.setEffectiveWeight(1.0);

      curAction.crossFadeFrom(prevAction, 0.5, true);
      curAction.play();
    } else {
      curAction.play();
    }
  }

  Exit() {
  }

  Update(timeElapsed, input) {
    if (input._keys.forward || input._keys.backward || input._keys.left || input._keys.right) {
      return;
    }

    this._parent.SetState('idle');
  }
};

class IdleState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'idle';
  }

  Enter(prevState) {
    const idleAction = this._parent._proxy._animations['idle'].action;
    if (prevState) {
      const prevAction = this._parent._proxy._animations[prevState.Name].action;
      idleAction.time = 0.0;
      idleAction.enabled = true;
      idleAction.setEffectiveTimeScale(1.0);
      idleAction.setEffectiveWeight(1.0);
      idleAction.crossFadeFrom(prevAction, 0.5, true);
      idleAction.play();
    } else {
      idleAction.play();
    }
  }

  Exit() {
  }

  Update(_, input) {
    if (input._keys.forward || input._keys.backward || input._keys.left || input._keys.right) {
      this._parent.SetState('walk');
    } 
  }
};


class CharacterControllerDemo {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this._threejs = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      gammaOutput: false,
      toneMapping: THREE.NoToneMapping
    });

    webRenderer = this._threejs;
    webRenderer.setClearColor(0x000000); // Set background color to black
    webRenderer.autoClear = false; // To allow render overlay on top of sprited sphere

    this._threejs.setPixelRatio( window.devicePixelRatio );
    this._threejs.setSize( window.innerWidth, window.innerHeight );
    this._threejs.autoClear = false; // To allow render overlay on top of sprited sphere

    
    this._threejs.outputEncoding = THREE.sRGBEncoding;
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(window.devicePixelRatio);
    this._threejs.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this._threejs.domElement);



    window.addEventListener('resize', () => {
      this._OnWindowResize();
    }, false);

    const fov = 60;
    const aspect = width / height;
    const near = 1.0;
    const far = 6500;
    this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    cam = this._camera
    cam.position.z = 1500;

    this._camera.position.copy(roomCamera[0]);


    this._scene = new THREE.Scene();

    const roomloader = new GLTFLoader(loadingManagerFBX);

    document.body.appendChild( this._threejs.domElement );

    cam.aspect = window.innerWidth / window.innerHeight;
    cam.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);


    // Room Walls
    roomloader.load( './3D Models/Room/Room.gltf', (room)  => {
      room.scene.scale.set(350,350,350);
      this._scene.add( room.scene );
      OtherObjects.push(room);
    }, undefined, function ( error ) {
      console.error( error );
    } );

    roomloader.load( './3D Models/Room/Room Starting Walls.gltf', (roomSW)  => {
      roomSW.scene.scale.set(350,350,350);
      roomWallStartingRoom = roomSW
      this._scene.add( roomWallStartingRoom.scene );
      RoomWalls.push(roomSW)
      roomSW.scene.visible = false;

    }, undefined, function ( error ) {
      console.error( error );
    } );

    roomloader.load( './3D Models/Room/Corridor 1 Walls.gltf', (Corridor1)  => {
      Corridor1.scene.scale.set(350,350,350);
      roomWallCorridor1 = Corridor1
      this._scene.add( roomWallCorridor1.scene );
      RoomWalls.push(Corridor1)
    }, undefined, function ( error ) {
      console.error( error );
    } );

    roomloader.load( './3D Models/Room/Room Hobbies Walls.gltf', (roomHW)  => {
      roomHW.scene.scale.set(350,350,350);
      roomWallHobbiesRoom = roomHW;
      this._scene.add( roomWallHobbiesRoom.scene );
      RoomWalls.push(roomHW)
    }, undefined, function ( error ) {
      console.error( error );
    } );

    roomloader.load( './3D Models/Room/Corridor 2 Walls.gltf', (Corridor2)  => {
      Corridor2.scene.scale.set(350,350,350);
      roomWallCorridor2 = Corridor2
      this._scene.add( roomWallCorridor2.scene );
      RoomWalls.push(Corridor2)
    }, undefined, function ( error ) {
      console.error( error );
    } );

    roomloader.load( './3D Models/Room/Room Skill Set Walls.gltf', (roomSSW)  => {
      roomSSW.scene.scale.set(350,350,350);
      roomWallSkillSetRoom = roomSSW;
      this._scene.add( roomWallSkillSetRoom.scene );
      RoomWalls.push(roomSSW)
    }, undefined, function ( error ) {
      console.error( error );
    } );

    roomloader.load( './3D Models/Room/Corridor 3 Walls.gltf', (Corridor3)  => {
      Corridor3.scene.scale.set(350,350,350);
      roomWallCorridor3 = Corridor3;
      this._scene.add( roomWallCorridor3.scene );
      RoomWalls.push(Corridor3)
    }, undefined, function ( error ) {
      console.error( error );
    } );

    roomloader.load( './3D Models/Room/Room Project Walls.gltf', (roomPW)  => {
      roomPW.scene.scale.set(350,350,350);
      roomWallProjectRoom = roomPW;
      this._scene.add( roomWallProjectRoom.scene );
      RoomWalls.push(roomPW)
    }, undefined, function ( error ) {
      console.error( error );
    } );  
    roomloader.load( './3D Models/Room/Room Information Walls.gltf', (roomIW)  => {
      roomIW.scene.scale.set(350,350,350);
      roomWallInformationRoom = roomIW;
      this._scene.add( roomIW.scene );
      RoomWalls.push(roomIW)
    }, undefined, function ( error ) {
      console.error( error );
    } );  

// Scene and Models
  // Starting Room
  // Function to load 3D models into the scene 3

  function loadModel(modelPath, scale, position, rotation, objectList, visibility) {
      roomloader.load(modelPath, (model) => {
          model.scene.scale.set(...scale);
          model.scene.position.set(...position);
          model.scene.rotation.set(...rotation);
          this._scene.add(model.scene);
          model.scene.visible = visibility;
          if(visibility == false)
          {
            UnlockPainting = model;
          }
          objectList.push(model);
          releaseTexture(model)
      }, undefined, (error) => {
          console.error(error);
      });
  }    
                    // Scene and Models
                    
                    // Starting Room
  if (!navigator.maxTouchPoints) {

      loadModel.call(this, './3D Models/Room/Assets/Keybinds.gltf', [7, 7, 7], [0, 0, 60], [0, 0, 0], StartingRoomObjects);
  }
                    
  loadModel.call(this, './3D Models/Room/Assets/Statue.gltf', [30, 30, 30], [0, 0, -100], [0, Math.PI / 2 * 3, 0], StartingRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Paint Green.gltf', [5, 5, 5], [31, 6.2, -100], [0, Math.PI, 0], PaintCans,true);
  loadModel.call(this, './3D Models/Room/Assets/Tour Guide.gltf', [20, 20, 20], [125, 0, 70], [0, Math.PI, 0], StartingRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/World Globe.gltf', [10, 10, 10], [80, 0, -105], [0, Math.PI, 0], StartingRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Assistant.gltf', [20, 20, 20], [-110, 0, 110], [0, Math.PI * 2, 0], StartingRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Fish Tank.gltf', [15, 15, 15], [-111, 15, 60], [0, Math.PI * 2, 0], StartingRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Frame.gltf', [15, 15, 15], [-126, 50, 0], [0, Math.PI * 2, 0], StartingRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Flower Painting.gltf', [15, 15, 15], [-126, 50, 0], [0, Math.PI * 2, 0], StartingRoomObjects,false);
  loadModel.call(this, './3D Models/Room/Assets/Certificate Brunel Graduation.gltf', [10, 10, 10], [-105, 40, -125], [0, Math.PI / 2 * 3, 0], StartingRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Certificate Brunel Graduation.gltf', [10, 10, 10], [-75, 40, -125], [0, Math.PI / 2 * 3, 0], StartingRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Certificate Brunel Graduation.gltf', [10, 10, 10], [-45, 40, -125], [0, Math.PI / 2 * 3, 0], StartingRoomObjects,true);

// Hobbies Room
  loadModel.call(this, './3D Models/Room/Assets/Gym Bench.gltf', [20, 20, 20], [210, -1, -60], [0, Math.PI / 2, 0], HobbyRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Basketball hoop and ball.gltf', [15, 15, 15], [420, 6, -72], [0, (Math.PI/2) * 3, 0], HobbyRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Clothing Rail.gltf', [18, 18, 18], [425, 0, 60], [0, Math.PI, 0], HobbyRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/PC Workstation.gltf', [20, 20, 20], [306, -11, -75], [0, (Math.PI/2) * 3, 0], HobbyRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Paint Darker Green.gltf', [4, 4, 4], [346, 6.3, -75], [0, (Math.PI/2) * 3, 0], PaintCans,true);
  loadModel.call(this, './3D Models/Room/Assets/Music Workstation.gltf', [20, 20, 20], [195, 13, 60], [0, (Math.PI/2), 0], HobbyRoomObjects,true);

           //Skills Room
    // Load models for Skill Set Room
  loadModel.call(this, './3D Models/Room/Assets/Blackboard.gltf', [40, 40, 40], [689, 45, -123], [0, Math.PI, 0], SkillSetRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Earth Mat.gltf', [30, 30, 30], [689, 0, -84], [0, (Math.PI/2) * 3, 0], SkillSetRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Programming Skills Table.gltf', [15, 15, 15], [783, 0, -107], [0, Math.PI * 2, 0], SkillSetRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Other Programs Table.gltf', [15, 15, 15], [593, 0, -107], [0, Math.PI * 2, 0], SkillSetRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Mircosoft Shelf.gltf', [15, 15, 15], [783, 30, -120], [0, Math.PI * 2, 0], SkillSetRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Audio Manipulation Shelf.gltf', [15, 15, 15], [593, 30, -120], [0, Math.PI * 2, 0], SkillSetRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Unity Blocks.gltf', [15, 15, 15], [610, 0, 87], [0, Math.PI * 2, 0], SkillSetRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Eclipse Blocks.gltf', [15, 15, 15], [577, 0, 111], [0, Math.PI * 2, 0], SkillSetRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Paint Light Blue.gltf', [4, 4, 4], [589, 6.3, 121], [0, Math.PI * 2, 0], PaintCans,true);
  loadModel.call(this, './3D Models/Room/Assets/Maze Table.gltf', [20, 20, 20], [790, 0, 100], [0, Math.PI * 2, 0], SkillSetRoomObjects,true);

                      //Project Room

// Load models for Project Room
  loadModel.call(this, './3D Models/Room/Assets/Into Space Poster.gltf', [10, 10, 10], [1138, 45, -190], [0, (Math.PI/2)*3, 0], ProjectRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/spAce Poster.gltf', [10, 10, 10], [1183, 45, -190], [0, (Math.PI/2)*3, 0 ], ProjectRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Cube Turn Poster.gltf', [10, 10, 10], [1228, 45, -190], [0, (Math.PI/2)*3, 0], ProjectRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Self-Destruct Poster.gltf', [10, 10, 10], [1273, 45, -190], [0, (Math.PI/2)*3, 0], ProjectRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Save The Sea Turtles Poster.gltf', [10, 10, 10], [1318, 45, -190], [0, (Math.PI/2)*3, 0], ProjectRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Presynct Area.gltf', [15, 15, 15], [1338, 15, 100], [0, (Math.PI/2)*3, 0], ProjectRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Table with Stools.gltf', [15, 15, 15], [1008, 0, -100], [0, Math.PI*2, 0], ProjectRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/3D Modelling Area.gltf', [25, 25, 25], [1428, 1, -70], [0, Math.PI*2, 0], ProjectRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Character Holding Toys.gltf', [25, 25, 25], [1160, 1, -100], [0, Math.PI/2, 0], ProjectRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/University Area.gltf', [18, 18, 18], [1120, 10, 120], [0, (Math.PI/2)*3, 0], ProjectRoomObjects,true);

  // Load models for Contact Information Room
  loadModel.call(this, './3D Models/Room/Assets/Assistant.gltf', [20, 20, 20], [1593, 0, -11], [0, Math.PI, 0], ContactInformationRoomObjects,true);
  loadModel.call(this, './3D Models/Room/Assets/Contact Information Room Assets.gltf', [350, 350, 350], [0, 0, 0], [0, 0, 0], ContactInformationRoomObjects,true);

// Load models for Paint Cans
  loadModel.call(this, './3D Models/Room/Assets/Paint Yellow.gltf', [4, 4, 4], [1435, 6.3, 110], [0, Math.PI*2, 0], PaintCans,true);
  loadModel.call(this, './3D Models/Room/Assets/Paint Brown.gltf', [4, 4, 4], [1008, 6.3, -170], [0, Math.PI*2, 0], PaintCans,true);
  loadModel.call(this, './3D Models/Room/Assets/Paint White.gltf', [4, 4, 4], [1462, 6.3, -85], [0, Math.PI*2, 0], PaintCans,true);

// Sprites 
//Starting Room      
    //Painting Loaded      
    function createSprite(mapPath, scale, position, visibility, container) {
    const map = new THREE.TextureLoader().load(mapPath);
    const material = new THREE.SpriteMaterial({ map: map, color: 0xffffff });
    const sprite = new THREE.Sprite(material);
    
    this._scene.add(sprite);
    container.push(sprite);

    sprite.scale.set(...scale);
    sprite.position.set(...position);
    sprite.visible = visibility;

    return sprite;
}

// Paint Cans Sprites

for (let i = 0; i <= 6; i++) {
    const mapPath = `./Sprites/Painting States/${i}OUTOF6.png`;

    createSprite.call(this, mapPath, [10.8, 7.81, 1], [-118, 90, 0], false, PaintCansSprite);
}

// Sprite Question Marks
const createQuestionMark = (mapPath, scale, position,QuestionMarksArray) => {
    const sprite = createSprite.call(this, mapPath, scale, position, true, QuestionMarksArray);
    sprite.visible = true;
};

//Starting Room
  // Contact Information
  StartingRoomPopUp.push('./Sprites/Starting Room Pop Up/Phone Contact Information.png');

  // Tour Guide
  StartingRoomPopUp.push('./Sprites/Starting Room Pop Up/Map.png');

  //School History
  StartingRoomPopUp.push('./Sprites/Starting Room Pop Up/Academic History.png');

  //Location
  StartingRoomPopUp.push('./Sprites/Starting Room Pop Up/Location.png');



                            
//Hobbies
    //Hobbies - Gym
    const mapHobbyGym = new THREE.TextureLoader().load();
    HobbyPopUp.push('./Sprites/Hobby Pop up/Hobbies Working Out.png');

    //Hobbies - Basketball
    HobbyPopUp.push('./Sprites/Hobby Pop up/Hobbies Sports.png');

    //Hobbies - Fashion
    HobbyPopUp.push('./Sprites/Hobby Pop up/Hobbies Fashion.png');
    
    //Hobbies - Gaming
    HobbyPopUp.push('./Sprites/Hobby Pop up/Hobbies Gaming.png');

    //Hobbies - Music
    HobbyPopUp.push('./Sprites/Hobby Pop up/Hobbies Music.png');


    //Skill Set Right Side
    SkillSetRoomPopUp.push('./Sprites/Skill Set Pop Up/Right Section.png');

    //Skill Set Left Side
    SkillSetRoomPopUp.push('./Sprites/Skill Set Pop Up/Left Section.png');

    //Skill Set Left Side
    SkillSetRoomPopUp.push('./Sprites/Skill Set Pop Up/Left Section.png');

    //Skill Set Right Side
    SkillSetRoomPopUp.push('./Sprites/Skill Set Pop Up/Right Section.png');
    //Skill Set Right Side
    SkillSetRoomPopUp.push('./Sprites/Skill Set Pop Up/Software Development Note.png');
    //Skill Set Right Side
    SkillSetRoomPopUp.push('./Sprites/Skill Set Pop Up/Problem Solving Note.png');
    
    //Project Room - Games
    ProjectPopUp.push("./Sprites/Project Pop Up/Game Showcase.mp4");

    //Project Room - 3D Models
    ProjectPopUp.push("./Sprites/Project Pop Up/3D Modelling Showcase.mp4");
    
    //Project Room - PRESYNCT
    ProjectPopUp.push("./Sprites/Project Pop Up/PRESYNCT Showcase.mp4");

    //Project Room - Tiktok
    ProjectPopUp.push("./Sprites/Project Pop Up/TikTok Showcase.mp4");

    //Project Room - University Work
    ProjectPopUp.push("./Sprites/Project Pop Up/University Showcase.mp4");

    //Contact Information Room

      // Contact Information
  ContactInformationPopUp.push('./Sprites/Starting Room Pop Up/Phone Contact Information.png');


createQuestionMark('./Sprites/Hobby Pop up/Working Out.png', [21.6, 9.32, 1], [210, 50, -60],QuestionMarks);
createQuestionMark('./Sprites/Hobby Pop up/Sports.png', [21.6, 5.6, 1], [385, 80, -72],QuestionMarks);
createQuestionMark('./Sprites/Hobby Pop up/Fashion.png', [21.6, 5.08, 1], [425, 60, 70],QuestionMarks);
createQuestionMark('./Sprites/Hobby Pop up/Gaming.png', [21.6, 5.46, 1], [311, 60, -40],QuestionMarks);
createQuestionMark('./Sprites/Hobby Pop up/Music.png', [21.6, 6.86, 1], [195, 60, 75],QuestionMarks);

// Starting Room Question Marks
createQuestionMark('./Sprites/Contact Information.png', [32.4, 9.66, 1], [-108, 50, 115],QuestionMarksStartingRoom);
createQuestionMark('./Sprites/Tour Guide.png', [32.4, 5.4, 1], [120, 50, 69],QuestionMarksStartingRoom);
createQuestionMark('./Sprites/Academic History.png', [32.4, 12.93, 1], [-75, 70, -120],QuestionMarksStartingRoom);
createQuestionMark('./Sprites/Location.png', [32.4, 6.58, 1], [80, 50, -105],QuestionMarksStartingRoom);

// Skillset Room Question Marks
createQuestionMark('./Sprites/Skill Set Pop Up/Programming Languages.png', [48.6, 13.32, 1], [783, 40, -107],QuestionMarksSkillSet);
createQuestionMark('./Sprites/Skill Set Pop Up/Graphic Design.png', [48.6, 5.2, 1], [593, 40, -107],QuestionMarksSkillSet);
createQuestionMark('./Sprites/Skill Set Pop Up/Audio Editing.png', [48.6, 6.615, 1], [593, 90, -118],QuestionMarksSkillSet);
createQuestionMark('./Sprites/Skill Set Pop Up/Microsoft Office.png', [48.6, 5.13, 1], [783, 90, -118],QuestionMarksSkillSet);
createQuestionMark('./Sprites/Skill Set Pop Up/Software Development.png', [43.2, 12.12, 1], [594, 90, 99],QuestionMarksSkillSet);
createQuestionMark('./Sprites/Skill Set Pop Up/Problem Solving.png', [43.2, 18.84, 1], [790, 50, 100],QuestionMarksSkillSet);

// Project Room Question Marks
createQuestionMark('./Sprites/Project Pop Up/Games Made By Alvin.png', [94.08, 29.52, 1], [1228, 90, -180], QuestionMarksProject);
createQuestionMark('./Sprites/Project Pop Up/3D Modelling.png', [48.6, 17.235, 1], [1362, 82, -70], QuestionMarksProject);
createQuestionMark('./Sprites/Project Pop Up/PRESYNCT Clothing.png', [48.6, 18.99, 1], [1338, 50, 130], QuestionMarksProject);
createQuestionMark('./Sprites/Project Pop Up/Tiktok.png', [48.6, 13.185, 1], [1033, 85, -130], QuestionMarksProject);
createQuestionMark('./Sprites/Project Pop Up/University Work.png', [48.6, 18.99, 1], [1121, 75, 121], QuestionMarksProject);

createQuestionMark('./Sprites/Contact Information.png', [32.4, 9.66, 1], [1593, 50, -11],QuestionMarksContactInformation);

    buttonOverlay = document.getElementById("buttonOpen");
    document.getElementById("buttonOpen").src=  "";
    buttonOverlay.style.opacity = 0;
    buttonOverlay.disabled = true;

    videoBox = document.getElementById("ProjectPopUpBox");
    document.getElementById("ProjectPopUpBox").src=  "";
    videoBox.style.opacity = 0;
    

    //Lighting
    let light = new THREE.DirectionalLight(0xFFFFFF, 0.8);
    light.position.set(-100, 100, 100);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 4096;
    light.shadow.mapSize.height = 4096;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 50;
    light.shadow.camera.right = -50;
    light.shadow.camera.top = 50;
    light.shadow.camera.bottom = -50;
    this._scene.add(light);

    light = new THREE.AmbientLight(0xFFFFFF, 0.1);
    this._scene.add(light);

    const controls = new OrbitControls(
      this._camera, this._threejs.domElement);
    controls.target.set(0, 10, 0);
    controls.enabled = false;
    controls.update();


    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([

    ]);
    texture.encoding = THREE.sRGBEncoding;
    texture.colorSpace = THREE.SRGBColorSpace
    this._scene.background = texture;



    this._mixers = [];
    this._previousRAF = null;

    this._LoadAnimatedModel();
    this._RAF();
  }
  
  _LoadAnimatedModel() {
    const params = {
      camera: this._camera,
      scene: this._scene,
    }
    this._controls = new BasicCharacterController(params);
  }

  _LoadAnimatedModelAndPlay(path, modelFile, animFile, offset) {
    const loader = new FBXLoader();
    loader.setPath(path);
    loader.load(modelFile, (fbx) => {
      fbx.scale.setScalar(0.1);
      fbx.traverse(c => {
        c.castShadow = false;
      });
      fbx.position.copy(offset);

      const anim = new FBXLoader();
      anim.setPath(path);
      anim.load(animFile, (anim) => {
        const m = new THREE.AnimationMixer(fbx);
        this._mixers.push(m);
        const idle = m.clipAction(anim.animations[0]);
        idle.play();
      });
      this._scene.add(fbx);
      loader.dispose();
    });
  }

  _OnWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();

    this._threejs.setSize(window.innerWidth , window.innerHeight)
  }

  _RAF() {
    requestAnimationFrame((t) => {
      if (this._previousRAF === null) {
        this._previousRAF = t;
      }

      this._RAF();

      this._threejs.render(this._scene, this._camera);
      this._Step(t - this._previousRAF);
      this._previousRAF = t;
    });
  }

  _Step(timeElapsed) {


    const timeElapsedS = timeElapsed * 0.001;
    if (this._mixers) {
      this._mixers.map(m => m.update(timeElapsedS));
    }

    if (this._controls) {
      this._controls.Update(timeElapsedS);
    }
  }
}


// Function to dispose of all objects in the scene


loadingManagerFBX = new THREE.LoadingManager();

loadingManagerFBX.onProgress = function(url, loaded, total) {
  loadingManagerFBXProgress = (loaded / total) * 100;
  if (document.getElementById("LoadingScreenProgress")) {
    document.getElementById("LoadingScreenProgress").textContent = Math.round(loadingManagerFBXProgress).toString();
    let roomsLoadedTextElement = document.getElementById("RoomsLoadedText");
    let roomsLoadedText = roomsLoadedTextElement.innerHTML; // Use innerHTML to preserve HTML formatting

    if (loaded >= ((total/100)*15) && (roomsLoadedText.indexOf("starting room [ ]") > -1)) {
        roomsLoadedText = roomsLoadedText.replace("starting room [ ]", "starting room [X]");
    } else if (loaded >= ((total/100)*30) && (roomsLoadedText.indexOf("hobbies room [ ]") > -1)) {
        roomsLoadedText = roomsLoadedText.replace("hobbies room [ ]", "hobbies room [X]");
    } else if (loaded >= ((total/100)*50) && (roomsLoadedText.indexOf("skillsets room [ ]") > -1)) {
        roomsLoadedText = roomsLoadedText.replace("skillsets room [ ]", "skillsets room [X]");
    } else if (loaded >= ((total/100)*80) && (roomsLoadedText.indexOf("projects room [ ]") > -1)) {
        roomsLoadedText = roomsLoadedText.replace("projects room [ ]", "projects room [X]");
    } else if (loaded >= (total) && (roomsLoadedText.indexOf("contact room [ ]") > -1)) {
        roomsLoadedText = roomsLoadedText.replace("contact room [ ]", "contact room [X]");
    }

    roomsLoadedTextElement.innerHTML = roomsLoadedText; // Update the element with modified HTML
}

}
loadingManagerFBX.onLoad = function() {
  document.getElementById("LoadingScreenRoom").remove();
  document.getElementById("LoadingScreenProgress").remove();
  document.getElementById("LoadingScreenBackground").remove();
  document.getElementById("LoadingScreenHeading").remove();
  document.getElementById("LoadingScreenSubHeading").remove();
  document.getElementById("RoomsLoadedText").remove();

  window.onbeforeunload = disposeScene(this._scene);
  ChangeWalls(controlObject);
}
let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new CharacterControllerDemo();
});