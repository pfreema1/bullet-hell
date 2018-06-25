'use strict';

import Renderer from 'lance/render/Renderer';

export default class MyRenderer extends Renderer {
  constructor(gameEngine, clientEngine) {
    super(gameEngine, clientEngine);

    this.sprites = {};

    if (
      document.readyState === 'complete' ||
      document.readyState === 'loaded' ||
      document.readyState === 'interactive'
    ) {
      this.onDOMLoaded();
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        this.onDOMLoaded();
      });
    }
  }

  onDOMLoaded() {
    this.canvas = document.querySelector('#gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // this.ctx.fillStyle = 'rgb(200, 0, 0)';
    // this.ctx.fillRect(10, 10, 50, 50);
  }

  draw(t, dt) {
    super.draw(t, dt);

    // clear previous frame so we can animate
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // loop through sprites
    for (let objId of Object.keys(this.sprites)) {
      //   console.log('this.sprites[objId]:  ', this.sprites[objId]);
      if (this.sprites[objId].el) {
        // set color of boxy
        if (this.sprites[objId].el === 'boxy1') {
          this.ctx.fillStyle = 'rgb(200, 0, 0)';
        } else if (this.sprites[objId].el === 'boxy2') {
          this.ctx.fillStyle = 'rgb(0, 0, 200)';
        } else if (this.sprites[objId].el === 'bullet') {
          this.ctx.fillStyle = 'rgb(255,255,255)';
        }

        this.ctx.fillRect(
          this.gameEngine.world.objects[objId].position.x,
          this.gameEngine.world.objects[objId].position.y,
          this.gameEngine.world.objects[objId].width,
          this.gameEngine.world.objects[objId].height
        );
      }
    }
  }

  addSprite(obj, objName) {
    // console.log('addSprite: obj:  ', obj);
    // console.log('addSprite: objName:  ', objName);

    if (objName === 'boxy') {
      objName += obj.playerId;
    }

    this.sprites[obj.id] = {
      //   el: document.querySelector('.' + objName)
      el: objName
    };
  }
}
