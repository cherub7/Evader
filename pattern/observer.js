class Observer {
    
    subscribe(subject) {
        subject.addObserver(this);
    }

    update(message) {
        // do something with recieved message
    }
}
