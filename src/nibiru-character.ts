export class NibiruCharacter extends Entity {
  constructor(model: GLTFShape, transform: Transform) {
    super();
    engine.addEntity(this);
    this.addComponent(model);
    this.addComponent(transform);

    this.addComponent(new Animator());
    this.getComponent(Animator).addClip(
      new AnimationState('Running', { looping: true })
    );
    this.getComponent(Animator).addClip(
      new AnimationState('Idle', { looping: true })
    );
    this.getComponent(Animator).addClip(
      new AnimationState('Jump', { looping: true, speed: 1.3 })
    );
  }
  // Play running animation
  playRunning() {
    this.getComponent(Animator).getClip('Running').play();
  }

  // Play idle animation
  playIdle() {
    this.getComponent(Animator).getClip('Idle').play();
  }

  // Play idle animation
  playJump() {
    this.getComponent(Animator).getClip('Jump').play();
  }
}
