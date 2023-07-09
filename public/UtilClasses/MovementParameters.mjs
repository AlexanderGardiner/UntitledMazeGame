export default class Colour {
    constructor(maxSpeed, acceleration, deceleration, dashSpeed, dashAcceleration, dashLength, dashRechargeTime) {
        this.maxSpeed = maxSpeed;
        this.acceleration = acceleration;
        this.deceleration = deceleration;
        this.dashSpeed = dashSpeed;
        this.dashAcceleration = dashAcceleration;
        this.dashLength = dashLength;
        this.dashRechargeTime = dashRechargeTime;
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

    getDashAcceleration() {
        return this.dashAcceleration;
    }
    getDashSpeed() {
        return this.dashSpeed;
    }

    getDashLength() {
        return this.dashLength;
    }

    getDashRechargeTime() {
        return this.dashRechargeTime;
    }
}