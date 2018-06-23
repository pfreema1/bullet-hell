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
  }
}
