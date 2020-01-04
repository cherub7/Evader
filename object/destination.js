class Destination extends GameObject {
    constructor() {
        super();

        this.x = 0;
        this.y = 0;
        this.t = 0;
        this.r = 0;
        this.color = undefined;
        this.brightness = 0;

        this.count = 0;

        this.reset();
    }

    reset() {
        const PADDING = 50;
        this.x = (Math.random() * (game.canvas.width - (2 * PADDING))) + PADDING;
        this.y = (Math.random() * (game.canvas.height - (2 * PADDING))) + PADDING;
        this.t = 200;
        this.r = 20 + (Math.random() * 30);
        this.color = 'lightblue';
        this.brightness = 2;
    }

    draw() {
        game.context.save();

        game.context.strokeStyle = this.color;
        game.context.lineWidth = this.brightness;

        game.context.beginPath ();
        game.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        game.context.closePath();

        game.context.stroke();
        
        game.context.restore();
    }

    update(progress) {
        // check if the ship's circle is inside the destination circle
        const centerDistance = Math.sqrt( Math.pow(this.x - game.userObject.x, 2) + Math.pow(this.y - game.userObject.y, 2) );
        const liesInside = ((centerDistance + 3) <= this.r); // 3 is ships's inner circle radius

        if (liesInside) {
            this.color = 'lightgreen';
            this.brightness += (this.r / this.t);
            this.t--;

            if (this.t == 0) {
                this.count++;

                if (this.count == 5) {
                    this.notify('ACHIEVEMENT');
                    game.updateGameState('TWIN_CAPTIVA');
                }
                else {
                    this.notify('PORTAL_RESET');
                }

                this.reset();
            }
        }
        else
            this.color = 'lightblue';
    }
}
