import * as utils from '@dcl/ecs-scene-utils';
import { NibiruCharacter } from './nibiru-character';

// Base
const base = new Entity();
base.addComponent(new GLTFShape('models/baseGrass.glb'));
engine.addEntity(base);

// Arissa
const nibiruCharacter = new NibiruCharacter(
  new GLTFShape('models/Hooded.glb'),
  new Transform({
    position: new Vector3(0, -0.9, -0.3),
    scale: new Vector3(0, 0, 0)
  })
);
nibiruCharacter.setParent(Attachable.AVATAR);

// Hide avatars
const hideAvatarsEntity = new Entity();
hideAvatarsEntity.addComponent(
  new AvatarModifierArea({
    area: { box: new Vector3(16, 4, 11) },
    modifiers: [AvatarModifiers.HIDE_AVATARS]
  })
);
hideAvatarsEntity.addComponent(
  new Transform({ position: new Vector3(8, 2, 10.5) })
);
engine.addEntity(hideAvatarsEntity);

// Create to show Arissa avatar
hideAvatarsEntity.addComponent(
  new utils.TriggerComponent(
    new utils.TriggerBoxShape(new Vector3(16, 4, 11), Vector3.Zero()),
    {
      onCameraEnter: () => {
        nibiruCharacter.getComponent(Transform).scale.setAll(1.5);
      },
      onCameraExit: () => {
        nibiruCharacter.getComponent(Transform).scale.setAll(0);
      }
    }
  )
);

// Check if player is moving
let currentPosition = new Vector3();

class CheckPlayerIsMovingSystem implements ISystem {
  update() {
    if (currentPosition.equals(Camera.instance.position)) {
      nibiruCharacter.playIdle();
    } else {
      currentPosition.copyFrom(Camera.instance.position);
      nibiruCharacter.playRunning();
    }
  }
}
engine.addSystem(new CheckPlayerIsMovingSystem());
