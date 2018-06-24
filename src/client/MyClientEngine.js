import ClientEngine from 'lance/ClientEngine';
import MyRenderer from '../client/MyRenderer';
import KeyboardControls from 'lance/controls/KeyboardControls';

export default class MyClientEngine extends ClientEngine {
  constructor(gameEngine, options) {
    super(gameEngine, options, MyRenderer);

    this.controls = new KeyboardControls(this);
    this.controls.bindKey('w', 'up', { repeat: true });
    this.controls.bindKey('s', 'down', { repeat: true });
    this.controls.bindKey('a', 'left', { repeat: true });
    this.controls.bindKey('d', 'right', { repeat: true });
    this.controls.bindKey('space', 'space');

    this.lastClick = Date.now();

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
    // listener for mouse click
    document.addEventListener('click', e => {
      // if (Date.now() > this.lastClick + 1000) {
      //   this.sendInput('shoot', { movement: true, x: e.clientX, y: e.clientY });
      //   this.lastClick = Date.now();
      // }
      this.sendInput('shoot', { movement: true, x: e.clientX, y: e.clientY });
    });
  }
}
