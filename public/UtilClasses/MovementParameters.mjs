export default class Colour {
    constructor(maxSpeed, acceleration, deceleration, dashSpeed, dashLength, dashRechargeTime) {
        this.maxSpeed = maxSpeed;
        this.acceleration = acceleration;
        this.deceleration = deceleration;
        this.dashSpeed = dashSpeed;
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