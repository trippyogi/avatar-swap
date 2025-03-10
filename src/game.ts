import * as utils from '@dcl/ecs-scene-utils';
import { NibiruCharacter } from './nibiru-character';

const cube = new Entity();
cube.addComponent(new BoxShape());
cube.addComponent(
  new Transform({ position: new Vector3(8, 0, 8), scale: new Vector3(2, 2, 2) })
);
engine.addEntity(cube);

// Base
const base = new Entity();
base.addComponent(new GLTFShape('models/baseGrass.glb'));
engine.addEntity(base);

// Arissa
const nibiruCharacter = new NibiruCharacter(
  new GLTFShape('models/HoodedNibiru.glb'),
  new Transform({
    position: new Vector3(0, -0.9, -0.5),
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
        nibiruCharacter.getComponent(Transform).scale.setAll(1.8);
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
    } else if (currentPosition.y != Camera.instance.position.y) {
      currentPosition.copyFrom(Camera.instance.position);
      nibiruCharacter.playJump();
    } else {
      currentPosition.copyFrom(Camera.instance.position);
      nibiruCharacter.playRunning();
    }
  }
}
engine.addSystem(new CheckPlayerIsMovingSystem());
