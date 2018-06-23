'use strict';

import DynamicObject from 'lance/serialize/DynamicObject';

export default class Boxy extends DynamicObject {
  constructor(gameEngine, options, props) {
    super(gameEngine, options, props);
    if (props && props.playerId) this.playerId = props.playerId;
    this.class = Boxy;
  }

  onAddToWorld(gameEngine) {
    if (gameEngine.renderer) {
      gameEngine.renderer.addSprite(this, 'boxy');
    }
  }
}
