'use strict';

import GameEngine from 'lance/GameEngine';
import SimplePhysicsEngine from 'lance/physics/SimplePhysicsEngine';
import TwoVector from 'lance/serialize/TwoVector';
import Boxy from './Boxy';
import Bullet from './Bullet';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
const BULLET_COUNT = 100;

export default class MyGameEngine extends GameEngine {
  constructor(options) {
    super(options);
    this.physicsEngine = new SimplePhysicsEngine({ gameEngine: this });

    this.currentBulletToSetActive = 3;

    this.bulletArr = [];
  }

  // register the game objects on the serializer
  registerClasses(serializer) {
    // serializer.registerClass(Paddle);
    // serializer.registerClass(Ball);
    serializer.registerClass(Boxy);
    serializer.registerClass(Bullet);
  }

  start() {
    super.start();

    // register game logic to run as post step function
    this.on('postStep', () => {
      this.postStepHandleBullet();
    });

    this.on('collisionStart', obj => {
      this.handleCollisionStart(obj);
    });

    // create references to game objects
    this.on('objectAdded', object => {
      // console.log('running objectAdded:  ', object);
      if (object.class === Bullet) {
        this.bullet = object;
      } else if (object.playerId === 1) {
        this.boxy1 = object;
      } else if (object.playerId === 2) {
        this.boxy2 = object;
      }
    });
  }

  // this method will be called only on the server
  initGame() {
    this.addObjectToWorld(
      new Boxy(this, null, {
        position: new TwoVector(50, 50),
        playerId: 1
      })
    );

    this.addObjectToWorld(
      new Boxy(this, null, {
        position: new TwoVector(600, 200),
        playerId: 2
      })
    );

    // create bullets of amount BULLET_COUNT
    for (let i = 0; i < BULLET_COUNT; i++) {
      let bullet = new Bullet(this, null, {
        position: new TwoVector(100 + i, 10 + i * 20)
      });

      this.addObjectToWorld(bullet);
    }
  }

  handleCollisionStart(obj) {
    // console.log('collisaion obj:  ', obj);
    Object.keys(obj).forEach(key => {
      if (obj[key].playerId !== 0) {
        console.log('box was hit!  playerId:  ', obj[key].playerId);
      }
    });
  }

  processInput(inputData, playerId) {
    super.processInput(inputData, playerId);

    // get the player paddle tied to the player socket
    let player = this.world.queryObject({ playerId });

    if (player) {
      player.handleInput(inputData, this);
    }
  }

  setBulletActive(mousePos) {
    // console.log('running setBulletActive in gameengine!');
    console.log('this:  ', this);
    console.log('this.world.objects type:  ', typeof this.world.objects);

    this.world.objects[this.currentBulletToSetActive].velocity.set(2, 2);

    this.bulletArr.push(this.world.objects[this.currentBulletToSetActive]);

    this.currentBulletToSetActive += 1;
  }

  postStepHandleBullet() {
    this.physicsEngine.collisionDetection.detect();

    // bouncing of bullets
    for (let bullet of this.bulletArr) {
      if (bullet.position.x <= 0) {
        bullet.velocity.x *= -1;
      } else if (bullet.position.x >= CANVAS_WIDTH) {
        bullet.velocity.x *= -1;
      } else if (bullet.position.y <= 1) {
        bullet.velocity.y *= -1;
      } else if (bullet.position.y >= CANVAS_HEIGHT) {
        bullet.velocity.y *= -1;
      }
    }
  }
}
