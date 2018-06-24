'use strict';

import GameEngine from 'lance/GameEngine';
import SimplePhysicsEngine from 'lance/physics/SimplePhysicsEngine';
// import PlayerAvatar from './PlayerAvatar';
import TwoVector from 'lance/serialize/TwoVector';
// import Paddle from './Paddle';
// import Ball from './Ball';
import Boxy from './Boxy';
import Bullet from './Bullet';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
const BULLET_COUNT = 100;

export default class MyGameEngine extends GameEngine {
  constructor(options) {
    super(options);
    this.physicsEngine = new SimplePhysicsEngine({ gameEngine: this });

    // create array of references to bullet
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
        position: new TwoVector(200, 200),
        playerId: 2
      })
    );

    for (let i = 0; i < BULLET_COUNT; i++) {
      let bullet = new Bullet(this, null, {
        position: new TwoVector(600, 600)
      });

      this.addObjectToWorld(bullet);

      this.bulletArr.push(bullet);
    }
  }

  processInput(inputData, playerId) {
    super.processInput(inputData, playerId);

    // get the player paddle tied to the player socket
    let player = this.world.queryObject({ playerId });

    if (player) {
      player.handleInput(inputData, this);
    }
  }

  // addBullet(position) {
  //   let bullet = new Bullet(this, null, {
  //     position: new TwoVector(position.x, position.y)
  //   });
  //   this.addObjectToWorld(bullet);

  //   this.bulletArr.push(bullet);
  // }

  setBulletActive(mousePos) {
    // console.log('running setBulletActive in gameengine!');
    // console.log('this:  ', this);
    console.log('bulletArr length:  ', this.bulletArr.length);
  }

  postStepHandleBullet() {
    for (let bullet of this.bulletArr) {
      if (bullet.position.x <= 0) {
        bullet.velocity.x *= -1;
      } else if (bullet.position.x >= CANVAS_WIDTH) {
        bullet.velocity.x *= -1;
      } else if (bullet.position.y <= 0) {
        bullet.velocity.y *= -1;
      } else if (bullet.position.y >= CANVAS_HEIGHT) {
        bullet.velocity.y *= -1;
      }
    }

    // console.log('this.bulletArr.length:  ', this.bulletArr.length);
  }
}
