export default class Rotation3D {
    constructor(pitch, roll, yaw) {
        this.pitch = pitch;
        this.roll = roll;
        this.yaw = yaw;
    }

    getPitch() {
        return this.pitch;
    }

    getRoll() {
        return this.roll;
    }

    getYaw() {
        return this.yaw;
    }

    setPitch(pitch) {
        this.pitch = pitch;
    }

    setRoll(roll) {
        this.roll = roll;
    }

    setYaw(yaw) {
        this.yaw = yaw;
    }

    add(rotation3D) {
        return new Rotation3D(this.getPitch() + rotation3D.getPitch(), 
                              this.getRoll() + rotation3D.getRoll(), 
                              this.getYaw() + rotation3D.getYaw());
    }
}