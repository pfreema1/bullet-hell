'use strict';

import GameEngine from 'lance/GameEngine';
import SimplePhysicsEngine from 'lance/physics/SimplePhysicsEngine';
// import PlayerAvatar from './PlayerAvatar';
import TwoVector from 'lance/serialize/TwoVector';
// import Paddle from './Paddle';
// import Ball from './Ball';
import Boxy from './Boxy';
import Bullet from './Bullet';

export default class MyGameEngine extends GameEngine {
  constructor(options) {
    super(options);
    this.physicsEngine = new SimplePhysicsEngine({ gameEngine: this });
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
    // create the paddle objects
    // this.addObjectToWorld(
    //   new Paddle(this, null, {
    //     position: new TwoVector(PADDING, 0),
    //     playerId: 999
    //   })
    // );

    // this.addObjectToWorld(
    //   new Paddle(this, null, {
    //     position: new TwoVector(WIDTH - PADDING, 0),
    //     playerId: 2
    //   })
    // );

    // this.addObjectToWorld(
    //   new Ball(this, null, { position: new TwoVector(WIDTH / 2, HEIGHT / 2) })
    // );

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
  }

  processInput(inputData, playerId) {
    super.processInput(inputData, playerId);

    // get the player paddle tied to the player socket
    let player = this.world.queryObject({ playerId });

    if (player) {
      player.handleInput(inputData, this);
    }
  }

  addBullet(position) {
    this.addObjectToWorld(
      new Bullet(this, null, {
        position: new TwoVector(position.x, position.y)
      })
    );
  }

  postStepHandleBullet() {
    // if (!this.ball) return;
    // // CHECK LEFT EDGE:
    // if (
    //   this.ball.position.x <= PADDING + PADDLE_WIDTH &&
    //   this.ball.position.y >= this.paddle1.y &&
    //   this.ball.position.y <= this.paddle1.position.y + PADDLE_HEIGHT &&
    //   this.ball.velocity.x < 0
    // ) {
    //   // ball moving left hit player 1 paddle
    //   this.ball.velocity.x *= -1;
    //   this.ball.position.x = PADDING + PADDLE_WIDTH + 1;
    // } else if (this.ball.position.x <= 0) {
    //   // ball hit left wall
    //   this.ball.velocity.x *= -1;
    //   this.ball.position.x = 0;
    //   console.log(`player 2 scored`);
    // }
    // // CHECK RIGHT EDGE:
    // if (
    //   this.ball.position.x >= WIDTH - PADDING - PADDLE_WIDTH &&
    //   this.ball.position.y >= this.paddle2.position.y &&
    //   this.ball.position.y <= this.paddle2.position.y + PADDLE_HEIGHT &&
    //   this.ball.velocity.x > 0
    // ) {
    //   // ball moving right hits player 2 paddle
    //   this.ball.velocity.x *= -1;
    //   this.ball.position.x = WIDTH - PADDING - PADDLE_WIDTH - 1;
    // } else if (this.ball.position.x >= WIDTH) {
    //   // ball hit right wall
    //   this.ball.velocity.x *= -1;
    //   this.ball.position.x = WIDTH - 1;
    //   console.log(`player 1 scored`);
    // }
    // // ball hits top
    // if (this.ball.position.y <= 0) {
    //   this.ball.position.y = 1;
    //   this.ball.velocity.y *= -1;
    // } else if (this.ball.position.y >= HEIGHT) {
    //   // ball hits bottom
    //   this.ball.position.y = HEIGHT - 1;
    //   this.ball.velocity.y *= -1;
    // }
  }
}
