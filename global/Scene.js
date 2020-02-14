import {Dimension} from "../assets/assets.js";
export class Scene{

    constructor(canvas, dimensions, bgColor = "#000"){

        this.canvas = canvas;
        this.dimensions = new Dimension(dimensions.width, dimensions.height);
        this.ctx = this.canvas.getContext("2d");
        this.bgColor = bgColor;
        this.setup();

    }

    setup(){

        this.canvas.width = this.dimensions.width;
        this.canvas.height = this.dimensions.height;
        this.canvas.fillStyle = this.bgColor;

    }

    paintBG(){

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.strokeStyle = "#fff";
        this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();

    }

    drawFPS(drawText, strokeColor, fillColor, fontFamily, size, offset = 0){

        const FPS = "FPS: " + drawText.toString();
        this.ctx.save();
        this.ctx.strokeStyle = strokeColor;
        this.ctx.fillStyle = fillColor;
        this.ctx.font = `${size}px ${fontFamily}`;
        this.ctx.fillText(
            FPS, 
            this.canvas.width - ((((size / 2) + 2) * FPS.length) + offset), 
            this.canvas.height - offset
        );
        this.ctx.restore();

    }

}