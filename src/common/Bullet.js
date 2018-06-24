'use strict';

import DynamicObject from 'lance/serialize/DynamicObject';

export default class Bullet extends DynamicObject {
  get bendingMultiple() {
    return 0.8;
  }
  get bendingVelocityMultiple() {
    return 0;
  }

  constructor(gameEngine, options, props) {
    super(gameEngine, options, props);
    this.class = Bullet;

    this.setupVelocity();

    this.width = 10;
    this.height = 10;
  }

  setupVelocity() {
    this.velocity.set(0, 0);
  }

  onAddToWorld(gameEngine) {
    // console.log('running add to world!');
    if (gameEngine.renderer) {
      gameEngine.renderer.addSprite(this, 'bullet');
    }
  }
}
