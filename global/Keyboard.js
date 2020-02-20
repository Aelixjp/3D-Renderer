export default class Keyboard{

    constructor(){ 
    }

    setup(keys){
        this.usableKeys = keys;
        this.pressedKeys = new Array(this.usableKeys.length).fill(false);
    }

    addKeyboardMapperListener(listenerType){
        window.addEventListener(listenerType, ev =>{
            if(listenerType === "keydown" || listenerType === "keypressed"){
                this.mapKeyPressed(ev);
            }else if(listenerType === "keyup" || listenerType == "keyreleased"){
                this.mapKeyReleased(ev);
            }
        });
    }

    //Use this function if you want to do something only with an specific key (this key may exists in the usableKeys array). 
    traceKey(key, callback){

        if(this.usableKeys.includes(key)){

            if(this.pressedKeys[this.usableKeys.indexOf(key)]){

                callback(key);
                return true;

            }

        }

        return false;
    }

    controlCamera(shape, camera){

        const pressedKeys = this.usableKeys.filter((key, i) => this.pressedKeys[i] ? true : false);
        
        pressedKeys.forEach(pressedKey =>{

            switch(pressedKey){

                //Left arrow
                case 37:
                    shape.decreaseAngle();
                    shape.rotateY();
                    camera.proyect(shape);
                    break;
                
                //Up arrow
                case 38:
                    shape.raiseAngle();
                    shape.rotateX();
                    camera.proyect(shape);
                    break;

                //Right arrow
                case 39:
                    shape.raiseAngle();
                    shape.rotateY();
                    camera.proyect(shape);
                    break;

                //Down arrow
                case 40:
                    shape.decreaseAngle();
                    shape.rotateX();
                    camera.proyect(shape);
                    break;

                //A
                case 65:
                    shape.decreaseAngle();
                    shape.rotateZ();
                    camera.proyect(shape);
                    break;

                //S
                case 68:
                    shape.raiseAngle();
                    shape.rotateZ();
                    camera.proyect(shape);
                    break;

                default:
                    break;

            }

        });

        // if(this.currentPressed === 37)
        // {
        //     shape.decreaseAngle();
        //     shape.rotateY();
        //     camera.proyect(shape);

        // }if(this.currentPressed === 38)
        // {
        //     shape.raiseAngle();
        //     shape.rotateX();
        //     camera.proyect(shape);

        // }if(this.currentPressed === 39)
        // {

        //     shape.raiseAngle();
        //     shape.rotateY();
        //     camera.proyect(shape);

        // }if(this.currentPressed === 40)
        // {
            
        //     shape.decreaseAngle();
        //     shape.rotateX();
        //     camera.proyect(shape);

        // }if(this.currentPressed === 65)
        // {
        //     shape.decreaseAngle();
        //     shape.rotateZ();
        //     camera.proyect(shape);

        // }if(this.currentPressed === 68)
        // {
        //     shape.raiseAngle();
        //     shape.rotateZ();
        //     camera.proyect(shape);

        // }

    }

    mapKeyPressed(ev){

        if(this.usableKeys.includes(ev.keyCode)){
            const index = this.usableKeys.indexOf(ev.keyCode);
            this.pressedKeys[index] = true;
        }

    }

    mapKeyReleased(ev){

        if(this.usableKeys.includes(ev.keyCode)){
            const index = this.usableKeys.indexOf(ev.keyCode);
            this.pressedKeys[index] = false;
        }

    }

}