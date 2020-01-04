// TODO: where to implement state pattern?

class Ship extends GameObject {
    constructor(x, y, color) {
        super();

        this.x = x;
        this.y = y;
        this.color = color;

        this.health = 100;

        this.x_v = 0;
        this.y_v = 0;
        this.r = 0;
    }

    draw() {
        game.context.save();
        
        game.context.translate(this.x, this.y);
        game.context.rotate((Math.PI/180) * this.r);

        // the hull
        game.context.strokeStyle = this.color;
        game.context.lineWidth = 2;
        
        game.context.beginPath ();
        game.context.moveTo(0, -10);
        game.context.lineTo(10, 5);
        game.context.lineTo(0, 10);
        game.context.lineTo(-10, 5);
        game.context.lineTo(0, -10);
        game.context.closePath();

        game.context.stroke();

        // the turret
        game.context.strokeStyle = 'lightgreen';
        game.context.lineWidth = 3;

        game.context.beginPath ();
        game.context.arc(0, 2, 3, 0, 2 * Math.PI);
        game.context.closePath();

        game.context.stroke();

        // health bar
        game.context.strokeStyle = 'lightblue';
        game.context.lineWidth = 4;

        game.context.beginPath ();
        
        game.context.moveTo(-10, 15);
        game.context.lineTo(-10 + (this.health / 100) * 20, 15);
        
        game.context.closePath();

        game.context.stroke();

        game.context.restore();
    }

    accelerate(progress) {
        let accelerationVector = {
            x: progress * .1 * Math.cos((this.r-90) * (Math.PI/180)),
            y: progress * .1 * Math.sin((this.r-90) * (Math.PI/180))
        };

        this.x_v += accelerationVector.x;
        this.y_v += accelerationVector.y;
    }

    decelerate(progress) {
        this.x_v /= 1.0375;
        this.y_v /= 1.0375;
    }

    steerLeft(progress) {
        this.r -= progress * 2;
    }

    steerRight(progress) {
        this.r += progress * 2;
    }

    shoot(progress) {
        console.log('user ship fired');
    }

    crash(damage) {
        this.health = Math.max(0, this.health - damage);
        this.notify('CRASH');
    }

    capture() {
        this.health = 0;
        this.x_v = 0;
        this.y_v = 0;
        this.notify('CAPTURE');
    }

    update(progress) {
        this.x += this.x_v;
        this.y += this.y_v;
        let radius = 20;

        if (this.x - radius < 0)
            this.x_v = 0;
        else if (this.x + radius > game.canvas.width)
            this.x_v = 0;

        if (this.y - radius < 0)
            this.y_v = 0;
        else if (this.y + radius > game.canvas.height)
            this.y_v = 0;
    }
}
