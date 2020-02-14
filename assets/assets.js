export class Dimension{

    constructor(w = 0, h = 0){
        this.width = w;
        this.height = h;
    }

}

export class Vector{

    constructor(x = 0, y = 0, z = 0){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static vectorToMatrix(vec){
        return [vec.x, vec.y, vec.z];
    }

}