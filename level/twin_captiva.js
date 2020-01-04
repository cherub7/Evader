
function setup_twin_captiva_level() {
    let ship = game.userObject;
    if (!ship)
        ship = new Ship(100, 100, 'white');

    game.reset();
    game.objectPool.push(ship);

    const captiva1 = new Captiva(game.canvas.width - 30, 30, 150);
    const captiva2 = new Captiva(30, game.canvas.height - 30, 200);

    game.objectPool.push(captiva1);
    game.objectPool.push(captiva2);

    for (let i = 0; i < 15; i++) {
        const asteroid = new Asteroid();
        game.objectPool.push(asteroid);
    }

    game.userObject = ship;

    game.audioHandler.subscribe(ship);
    game.audioHandler.subscribe(captiva2);
}
