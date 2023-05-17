export default class Colour {
    constructor(maxSpeed, acceleration, deceleration) {
        this.maxSpeed = maxSpeed;
        this.acceleration = acceleration;
        this.deceleration = deceleration;
    }

    getMaxSpeed() {
        return this.maxSpeed;
    }

    getAcceleration() {
        return this.acceleration;
    }

    getDeceleration() {
        return this.deceleration;
    }
}