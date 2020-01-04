
function setup_asteroid_shower_level() {
    game.reset();

    for (let i = 0; i < 30; i++) {
        const asteroid = new Asteroid();
        game.objectPool.push(asteroid);
    }

    const destination = new Destination();
    game.objectPool.push(destination);

    const ship = new Ship(100, 100, 'white');
    game.objectPool.push(ship);

    game.userObject = ship;

    game.audioHandler.subscribe(destination);
    game.audioHandler.subscribe(ship);
}
