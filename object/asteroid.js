// can use prototype pattern to create a spawner

class Asteroid extends GameObject {
    constructor() {
        super();
        
        this.x = Math.random() * game.canvas.width;
        this.y = Math.random() * game.canvas.height;
        this.r = 5 + (Math.random() * 20);
        this.x_v = Math.random() - .5;
        this.y_v = Math.random() - .5;
    }

    draw() {
        game.context.save();

        game.context.strokeStyle = 'white';
        game.context.lineWidth = this.brightness;

        game.context.beginPath ();
        game.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        game.context.closePath();

        game.context.stroke();
        
        game.context.restore()
    }

    update() {
        if (this.r > 0) {
            // if collides, play a sound and decrease health of space ship
            this.x += this.x_v;
            this.y += this.y_v;

            if (this.x + this.r < 0)
                this.x = game.canvas.width + this.r;
            else if (this.x - this.r > game.canvas.width)
                this.x = -this.r;

            if (this.y + this.r < 0)
                this.y = game.canvas.height + this.r;
            else if (this.y - this.r > game.canvas.height)
                this.y = -this.r;

            // check if it touches with the user object
            const distanceFromShip = Math.sqrt( Math.pow(this.x - game.userObject.x, 2) + Math.pow(this.y - game.userObject.y, 2) );
            if (distanceFromShip <= 20) {
                game.userObject.crash(this.r);
                this.r = 0;
            }
        }
    }
}
