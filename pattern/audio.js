// observer pattern

class AudioHandler extends Observer {
    constructor () {
        super();

        this.sounds = {};
        this.addSounds();
    }

    addSounds() {
        this.sounds['PORTAL_RESET'] = document.getElementById('portal');
        this.sounds['ACHIEVEMENT'] = document.getElementById('achievement');
        this.sounds['CRASH'] = document.getElementById('crash');
        this.sounds['CAPTURE'] = document.getElementById('portal');
    }

    subscribe(subject) {
        subject.addObserver(this);
    }
    
    update(message) {
        this.sounds[message].play();
    }
}
