import { Subject } from 'rxjs';

class DataService {
    subscriber = new Subject();
    data;

    constructor() {
        this.send = this.send.bind(this);
    }

    send(value) {
        this.data = value;
        this.subscriber.next(value);
    }
}

export default new DataService();