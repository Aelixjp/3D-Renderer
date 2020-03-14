import {Vector, Dimension} from "./assets.js";
import {cos, sin} from "../global/Maths.js";
export class Point extends Vector{

    constructor(x = 0, y= 0 , z = 0){
        super(x, y, z);
        this.name = 'point';
    }

}

export class Square{

    constructor(x = 0, y = 0, z = 0, w = 50){

        this.p1 = new Point(x - w, y - w, z);
        this.p2 = new Point(x + w, y - w, z);
        this.p3 = new Point(x + w, y + w, z);
        this.p4 = new Point(x - w, y + w, z);
        this.points = [this.p1,this.p2,this.p3,this.p4];
        this.name = 'square';

    }

}

export class Cube{

    constructor(x = 0, y = 0, z = 20, w = 50, angleRaiseSpeed = 1){

        this.ORIGINAL_VECTORIAL_Z = z;
        this.square1 = new Square(x, y, -z, w);
        this.square2 = new Square(x, y, z, w);
        this.squares = [this.square1, this.square2];
        this.size = new Dimension(w, w);
        this.points = {
            p1: this.square1.p1,    //P1 square1
            p2: this.square1.p2,    //P2 square1
            p3: this.square1.p3,    //P3 square1
            p4: this.square1.p4,    //P4 square1
            p5: this.square1.p1,    //P1 square1
            p6: this.square2.p1,
            p7: this.square2.p2,
            p8: this.square1.p2,    //P2 square1
            p9: this.square2.p2,
            p10: this.square2.p3,
            p11: this.square1.p3,   //P3 square1
            p12: this.square2.p3,
            p13: this.square2.p4,
            p14: this.square1.p4,   //P4 square1
            p15: this.square2.p4,
            p16: this.square2.p1
        }
        this.angle = 0;
        this.name = 'cube';
        this.angleRaiseSpeed = angleRaiseSpeed;

    }

    raiseAngle(){
        this.angle += this.angleRaiseSpeed;
    }

    decreaseAngle(){
        this.angle -= this.angleRaiseSpeed;
    }

    resetAngle(){
        this.angle = 0;
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

    applyRotation(rotationMatrix){

        let squareMatrix = new Array(this.squares[0].points.length);
        let newVecs = [];

        this.squares[0].points.forEach((point, i) =>{
            squareMatrix = this.generalRotation(rotationMatrix, Vector.vectorToMatrix(point));
            newVecs.push(squareMatrix);
            this.squares[0].points[i] = new Point(squareMatrix.x, squareMatrix.y, squareMatrix.z);
        });

        this.squares[1].points.forEach((point, i) =>{
            squareMatrix = this.generalRotation(rotationMatrix, Vector.vectorToMatrix(point));
            newVecs.push(squareMatrix);
            this.squares[1].points[i] = new Point(squareMatrix.x, squareMatrix.y, squareMatrix.z);
        });

        this.resetAngle();
        return this.setCubeTransform(newVecs);

    }

    rotateX(optAngle){
        
        const angle = optAngle ? Number.isFloat(optAngle) ? optAngle : this.angle : this.angle;
        const rotateXMatrix = [
            [1, 0, 0],
            [0, cos(angle), -sin(angle)],
            [0, sin(angle), cos(angle)]
        ];

        return this.applyRotation(rotateXMatrix);

    }

    rotateY(optAngle){

        const angle = optAngle ? Number.isFloat(optAngle) ? optAngle : this.angle : this.angle;
        const rotateYMatrix = [
            [cos(angle), 0, sin(angle)],
            [0, 1, 0],
            [-sin(angle), 0, cos(angle)]
        ];

        return this.applyRotation(rotateYMatrix);

    }

    rotateZ(optAngle){

        const angle = optAngle ? Number.isFloat(optAngle) ? optAngle : this.angle : this.angle;
        const rotateZMatrix = [
            [cos(angle), -sin(angle), 0],
            [sin(angle), cos(angle), 0],
            [0, 0, 1]
        ];

        return this.applyRotation(rotateZMatrix);

    }

    setCubeTransform(vectors){

        for(let i = 0; i < Object.keys(this.points).length; i++){
            
            if(i < 5){
                this.points[`p${i + 1}`] = new Point(vectors[i % 4].x, vectors[i % 4].y, vectors[i % 4].z);
            }else{
                if(i >= 5 && i < 7){
                    this.points[`p${i + 1}`] = new Point(vectors[i - 1].x, vectors[i - 1].y, vectors[i - 1].z);
                }
            }

            switch(i){
                case 7:
                    this.points[`p${i + 1}`] = new Point(vectors[1].x, vectors[1].y, vectors[1].z);
                    break;
                case 8:
                    this.points[`p${i + 1}`] = new Point(vectors[5].x, vectors[5].y, vectors[5].z);
                    break;
                case 9:
                    this.points[`p${i + 1}`] = new Point(vectors[6].x, vectors[6].y, vectors[6].z);
                    break;
                case 10:
                    this.points[`p${i + 1}`] = new Point(vectors[2].x, vectors[2].y, vectors[2].z);
                    break;
                case 11:
                    this.points[`p${i + 1}`] = new Point(vectors[6].x, vectors[6].y, vectors[6].z);
                    break;
                case 12:
                    this.points[`p${i + 1}`] = new Point(vectors[7].x, vectors[7].y, vectors[7].z);
                    break;
                case 13:
                    this.points[`p${i + 1}`] = new Point(vectors[3].x, vectors[3].y, vectors[3].z);
                    break;
                case 14:
                    this.points[`p${i + 1}`] = new Point(vectors[7].x, vectors[7].y, vectors[7].z);
                    break;
                case 15:
                    this.points[`p${i + 1}`] = new Point(vectors[4].x, vectors[4].y, vectors[4].z);
                    break;
                default:
                    break;
            }

        }

        return this.points;

    }

}