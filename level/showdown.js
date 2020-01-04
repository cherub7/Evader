
function setup_showdown_level() {
    let ship = game.userObject;
    if (!ship)
        ship = new Ship(100, 100, 'white');

    game.reset();
    game.objectPool.push(ship);

    for (let i = 0; i < 10; i++) {
        const asteroid = new Asteroid();
        game.objectPool.push(asteroid);
    }

    const endCaptiva = new EndCaptiva(game.canvas.width/2, game.canvas.height/2, 200);
    game.objectPool.push(endCaptiva);

    const endDestination = new EndDestination();
    game.objectPool.push(endDestination);

    game.userObject = ship;

    game.audioHandler.subscribe(ship);
    game.audioHandler.subscribe(endCaptiva);
    game.audioHandler.subscribe(endDestination);
}
