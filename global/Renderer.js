import {degToRadians} from "../global/Maths.js";
export default class Renderer{

    constructor(scene){

        this.scene = scene;
        this.ctx = this.scene.ctx;
        this.shapes = [];

    }

    drawShape(shape, strokeStyle = "#fff", fillStyle = "#fff"){

        this.ctx.save();
        this.ctx.strokeStyle = strokeStyle;
        this.ctx.fillStyle = fillStyle;
        this.ctx.translate(
            (this.ctx.canvas.width / 2), 
            (this.ctx.canvas.height / 2)
        );

        switch(shape.name){

            case 'point':

                this.ctx.beginPath();
                this.ctx.arc(shape.x, shape.y, shape.z, 0, degToRadians(360));
                this.ctx.stroke();
                this.ctx.fill();
                break;
            
            case 'square':

                this.ctx.beginPath();
                
                for(let i = 0; i < shape.points.length; i++){
                    
                    if(i != shape.points.length - 1){
                        this.ctx.moveTo(shape.points[i].x, shape.points[i].y);
                        this.ctx.lineTo(shape.points[i + 1].x, shape.points[i + 1].y);
                    }else{
                        this.ctx.moveTo(shape.points[i].x, shape.points[i].y);
                        this.ctx.lineTo(shape.points[0].x, shape.points[0].y);
                    }

                }

                this.ctx.stroke();
                break;

            case 'cube':

                this.ctx.beginPath();
                
                for(let i = 0; i < Object.keys(shape.points).length - 1; i++){

                    this.ctx.moveTo(shape.points[`p${i + 1}`].x, shape.points[`p${i + 1}`].y);
                    this.ctx.lineTo(shape.points[`p${i + 2}`].x, shape.points[`p${i + 2}`].y);

                }

                this.ctx.stroke();
                break;

            default:
                break;

        }

        this.ctx.restore();

    }

}