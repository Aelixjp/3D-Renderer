import {Vector} from "../assets/assets.js";
import {multiplyMatrix} from "../global/Maths.js";
import { Point } from "../assets/Shapes.js";
export default class Camera{

    constructor(distance = 2, proyectionMode = "ORTHO"){
        this.distance = distance;
        this.proyectionMode = proyectionMode;
    }

    proyect(shape){

        let newPoints = [];
        for(const pointProp in shape.points){

            const point = shape.points[pointProp];
            const z = 1 / (this.distance - (point.z / (shape.ORIGINAL_VECTORIAL_Z * this.distance)));

            const proyectionMatrix = [
                [z, 0, 0],
                [0, z, 0]
            ];

            let newPoint = new Point(...multiplyMatrix(Vector.vectorToMatrix(point), proyectionMatrix));
            shape.points[pointProp] = newPoint;
            newPoints.push(newPoint);
        }

        return newPoints;
    }

}