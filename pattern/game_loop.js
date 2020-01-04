// game object

class Game {
    constructor(canvas_id) {
        this.lastRender = 0;

        this.audioHandler = new AudioHandler();
        this.inputHandler = new InputHandler();
        
        this.objectPool = [];
        
        this.eventQueue = [];
        this.eventIndex = 0;

        this.canvas = document.getElementById(canvas_id);
        this.context = this.canvas.getContext('2d');

        this.state = undefined;

        this.userObject = undefined;
        
    }

    reset() {
        this.lastRender = 0;
        this.objectPool = [];
        
        this.eventQueue = [];
        this.eventIndex = 0;

        this.userObject = undefined;
        this.canvas.onclick = undefined;
    }

    // Updates the state of the world for the elapsed time since last render
    update(progress) {
        // sending the input to objrct from event loop
        while (this.eventIndex < this.eventQueue.length) {
            const command = this.eventQueue[this.eventIndex];
            command.execute(this.userObject, progress);
            this.eventIndex++;
        }

        this.objectPool.forEach(object => {
            object.update(progress);
        });
    }

    updateGameState(state) {
        game.state = state;

        switch(state) {
            case 'MAIN_MENU':
                setup_menu();
                break;
            case 'ASTEROID_SHOWER':
                setup_asteroid_shower_level();
                break;
            case 'TWIN_CAPTIVA':
                setup_twin_captiva_level();
                break;
            case 'SHOWDOWN':
                setup_showdown_level();
                break;
            case 'YOU_WIN':
                this.updateGameState('MAIN_MENU');
                // setup_win_screen();
                break;
            case 'GAME_OVER':
                this.updateGameState('MAIN_MENU');
                // setup_game_over_screen();
                break;
            default:
                game.state = undefined;
        }
    }
    
    // Draws the state of the world
    draw() {
        // clear the canvas
        if (isLevel())
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // draw each object from the object pool?
        this.objectPool.forEach(object => {
            object.draw();
        });
    }
}

function isLevel() {
    return (game.state !== 'MAIN_MENU' && game.state !== "YOU_WIN" && game.state !== "GAME_OVER");
}

// game loop
function loop(timestamp) {
    var progress = (timestamp - game.lastRender) / 16; // here, '16' has something to do with 60 fps

    if (isLevel()) {
        if (game.userObject.health <= 0) {
            game.updateGameState('GAME_OVER');
        }
        else {
            // updating user object state
            game.inputHandler.handleInput();

            // updating rest of the objects state
            game.update(progress);
            game.draw();
        }
    }

    game.lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

function setup_menu() {
    game.reset();
    show_menu();
}

let game = new Game('play-area');
game.updateGameState('MAIN_MENU');
window.requestAnimationFrame(loop);
