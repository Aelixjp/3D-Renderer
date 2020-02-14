import {cos, sin, proyectionMatrix} from "./Maths.js";
import {Vector} from "../assets/assets.js";
export default class Camera{

    constructor(distance = 20, proyectionMode = "ORTHO", angleRaiseSpeed = 1){
        this.distance = distance;
        this.proyectionMode = proyectionMode;
        this.angle = 0;
        this.angleRaiseSpeed = angleRaiseSpeed;
    }

    raiseAngle(){
        this.angle += this.angleRaiseSpeed;
    }

    decreaseAngle(){
        this.angle -= this.angleRaiseSpeed;
    }

    generalRotation(rotationMatrix, matrix){

        if(matrix.length & rotationMatrix[0].length)
        {
            let increment = new Array(matrix.length).fill(0);
            rotationMatrix.map((row, i) => row.map((col, j) => increment[i] += matrix[j] * rotationMatrix[i][j]));
            return new Vector(...increment);
        }

        return new Vector();

    }

    rotateX(matrix){

        const rotateXMatrix = [
            [1, 0, 0],
            [0, cos(this.angle), -sin(this.angle)],
            [0, sin(this.angle), cos(this.angle)]
        ];

        return this.generalRotation(rotateXMatrix, matrix);

    }

    rotateY(matrix){

        const rotateYMatrix = [
            [cos(this.angle), 0, sin(this.angle)],
            [0, 1, 0],
            [-sin(this.angle), 0, cos(this.angle)]
        ];

        return this.generalRotation(rotateYMatrix, matrix);

    }

    rotateZ(matrix){

        const rotateZMatrix = [
            [cos(this.angle), -sin(this.angle), 0],
            [sin(this.angle), cos(this.angle), 0],
            [0, 0, 1]
        ];

        return this.generalRotation(rotateZMatrix, matrix);

    }

}