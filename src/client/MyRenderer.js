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
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');

    // this.ctx.fillStyle = 'rgb(200, 0, 0)';
    // this.ctx.fillRect(10, 10, 50, 50);
  }

  draw(t, dt) {
    super.draw(t, dt);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // iterate through all the sprite game objects
    // for (let objId of Object.keys(this.sprites)) {
    //   if (this.sprites[objId].el) {
    //     this.sprites[objId].el.style.top =
    //       this.gameEngine.world.objects[objId].position.y + 'px';
    //     this.sprites[objId].el.style.left =
    //       this.gameEngine.world.objects[objId].position.x + 'px';
    //   }
    // }

    for (let objId of Object.keys(this.sprites)) {
      //   console.log('this.sprites[objId]:  ', this.sprites[objId]);
      if (this.sprites[objId].el) {
        if (this.sprites[objId].el === 'boxy1') {
          this.ctx.fillStyle = 'rgb(200, 0, 0)';
        } else if (this.sprites[objId].el === 'boxy2') {
          this.ctx.fillStyle = 'rgb(0, 0, 200)';
        }
        this.ctx.fillRect(
          this.gameEngine.world.objects[objId].position.x,
          this.gameEngine.world.objects[objId].position.y,
          30,
          30
        );
      }
    }
  }

  addSprite(obj, objName) {
    if (objName === 'boxy') objName += obj.playerId;

    this.sprites[obj.id] = {
      //   el: document.querySelector('.' + objName)
      el: objName
    };
  }
}
