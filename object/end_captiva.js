class EndCaptiva extends GameObject {
    constructor(x, y, t) {
        super();

        this.x = x;
        this.y = y;

        this.fuel = 20;
        this.state = 'rest'; // 'target', 'rest'

        this.t = t;

        this.x_v = 0;
        this.y_v = 0;
    }

    draw() {
        if (this.fuel > 0) {
            game.context.save();
            
            game.context.translate(this.x, this.y);
            game.context.rotate((Math.PI/180) * this.r);

            // the hull
            game.context.strokeStyle = 'red';
            game.context.lineWidth = 2;
            
            game.context.beginPath ();
            game.context.moveTo(0, -20);
            game.context.lineTo(20, 0);
            game.context.lineTo(0, 20);
            game.context.lineTo(-20, 0);
            game.context.lineTo(0, -20);
            game.context.closePath();

            game.context.stroke();

            // the cage
            game.context.strokeStyle = 'blue';
            game.context.lineWidth = 3;

            game.context.beginPath ();
            game.context.arc(-1, 0, 25, 0, 2 * Math.PI);
            
            game.context.closePath();

            game.context.stroke();

            // fuel
            for (let i = 0; i < this.fuel; i++) {
                game.context.strokeStyle = 'red';
                game.context.lineWidth = 3;

                game.context.beginPath ();
                game.context.arc(((2.5 * i) + 1.25) -25, 30, 1, 0, 2 * Math.PI);
            
                game.context.closePath();

                game.context.stroke();
            }

            
            game.context.restore();
        }
    }

    update(progress) {
        if (this.fuel > 0) {
            const distanceFromShip = Math.sqrt( Math.pow(this.x - game.userObject.x, 2) + Math.pow(this.y - game.userObject.y, 2) );
            const isCaptured = (distanceFromShip <= 25);

            if (isCaptured) {
                this.capture();
                this.x_v = 0;
                this.y_v = 0;
            }
            else {
                // state pattern
                // target -> rest -> target -> rest ....
                switch (this.state) {
                    case 'target':
                        this.target();
                        break;
                    case 'rest':
                        this.rest();
                        break;
                    default:
                        // none
                }
            }
        }

        this.x += this.x_v;
        this.y += this.y_v;

        let radius = 35;

        if (this.x - radius < 0)
            this.x_v = 0;
        else if (this.x + radius > game.canvas.width)
            this.x_v = 0;

        if (this.y - radius < 0)
            this.y_v = 0;
        else if (this.y + radius > game.canvas.height)
            this.y_v = 0;
    }

    target() {
        const target_x = game.userObject.x + (game.userObject.x_v * 10);
        const target_y = game.userObject.y + (game.userObject.y_v * 10);

        this.x_v = (target_x - this.x) / 35;
        this.y_v = (target_y - this.y) / 35;
        
        this.t = 150;
        this.state='rest';
    }

    rest() {
        if (this.t > 0) {
            this.t--;
            if ( this.t == 110) {
                this.x_v = 0;
                this.y_v = 0;
            }
        }
        else {
            this.fuel--;
            this.state = 'target';
        }
    }

    capture() {
        game.userObject.capture();
        game.userObject.x = this.x;
        game.userObject.y = this.y;
        game.userObject.r = 0;
    }
}
