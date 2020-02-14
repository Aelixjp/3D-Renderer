export class Timer{

    constructor(FPSLimit){
    
        this.start;
        this.lastTime = 0;
        this.FPS = FPSLimit;
        this.currentFPS = 0;
        this.FPSCounter = 0;
        this.limitTime = 1000;
        this.currentTimestamp = 0;
        
    }

    oninit(timestamp, callback){

        this.start = !this.start ? this.currentTimestamp : this.start;
        this.currentTimestamp = timestamp % this.limitTime;
        let delta = Math.abs(this.currentTimestamp - this.start);

        if(this.currentTimestamp > this.limitTime - 100){
            this.lastTime = delta;
        }

        callback();
        this.FPSCounter++;

        if(this.lastTime > delta){
            this.currentFPS = this.FPSCounter;
            this.FPSCounter = 0;
            this.start = 0;
            this.currentTimestamp = 0;
            this.lastTime = 0;
        }

    }

}