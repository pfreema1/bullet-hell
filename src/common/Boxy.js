'use strict';

import DynamicObject from 'lance/serialize/DynamicObject';

export default class Boxy extends DynamicObject {
  constructor(gameEngine, options, props) {
    super(gameEngine, options, props);
    if (props && props.playerId) this.playerId = props.playerId;
    this.class = Boxy;

    this.movementSpeed = 5;

    this.width = 30;
    this.height = 30;
  }

  shoot(mousePos, gameEngine) {
    // console.log('this boxy be shootin!');
    // console.log('mousePos:  ', mousePos);
    gameEngine.addBullet(mousePos);
  }

  // this gets called from processInput in MyGameEngine
  handleInput(inputData, gameEngine) {
    if (inputData.input === 'up') {
      this.position.y -= this.movementSpeed;
    } else if (inputData.input === 'down') {
      this.position.y += this.movementSpeed;
    } else if (inputData.input === 'left') {
      this.position.x -= this.movementSpeed;
    } else if (inputData.input === 'right') {
      this.position.x += this.movementSpeed;
    } else if (inputData.input === 'shoot') {
      let mousePos = {
        x: inputData.options.x,
        y: inputData.options.y
      };
      this.shoot(mousePos, gameEngine);
    }
  }

  onAddToWorld(gameEngine) {
    if (gameEngine.renderer) {
      gameEngine.renderer.addSprite(this, 'boxy');
    }
  }
}
