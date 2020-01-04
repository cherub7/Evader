// for command pattern
// we store each command type as an object

class Command {
    execute(actor, progress) {
        console.log(`default command object executed for ${actor}`);
    }
}

class AccelerateCommand extends Command {
    execute(actor, progress) {
        actor.accelerate(progress);
    }
}

class DecelerateCommand extends Command {
    execute(actor, progress) {
        actor.decelerate(progress);
    }
}

class SteerLeftCommand extends Command {
    execute(actor, progress) {
        actor.steerLeft(progress);
    }
}

class SteerRightCommand extends Command {
    execute(actor, progress) {
        actor.steerRight(progress);
    }
}

class ShootCommand extends Command {
    execute(actor, progress) {
        actor.shoot(progress);
    }
}

// none object pattern?
// a default object to denote none

class NoneCommand extends Command {
    execute(actor, progress) {
        // do nothing
    }
}
