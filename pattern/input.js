let isKeyPressed = {}

function keydown(event) {
    var key = event.key;
    isKeyPressed[key] = true;
}
  
function keyup(event) {
    var key = event.key;
    isKeyPressed[key] = false;
}

// Input handler part of command pattern

class InputHandler {
    constructor() {
        this.keyCommandMapping = {};
        this.noneCommand = new NoneCommand();

        this.assignDefaultCommandsForKeys();

        window.addEventListener("keydown", keydown, false);
        window.addEventListener("keyup", keyup, false);
    }

    assignDefaultCommandsForKeys() {
        this.keyCommandMapping['ArrowUp'] = new AccelerateCommand();
        this.keyCommandMapping['ArrowDown'] = new DecelerateCommand();
        this.keyCommandMapping['ArrowLeft'] = new SteerLeftCommand();
        this.keyCommandMapping['ArrowRight'] = new SteerRightCommand();
        this.keyCommandMapping[' '] = new ShootCommand();
    }

    assignCommandForKey(commandObj, key) {
        this.keyCommandMapping[key] = commandObj;
    }

    handleInput() {
        const keys = Object.keys(this.keyCommandMapping);
        let isAnyKeyPressed = false;

        keys.forEach(key => {
            if (isKeyPressed[key]) {
                isAnyKeyPressed = true;
                game.eventQueue.push(this.keyCommandMapping[key]);
            }
        });

        if (!isAnyKeyPressed)
            game.eventQueue.push(this.noneCommand);
    }
}
