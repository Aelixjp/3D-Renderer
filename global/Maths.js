export const cos = angle => Math.cos(degToRadians(angle));
export const sin = angle => Math.sin(degToRadians(angle));
export const radToDegrees = rad => (180 / Math.PI) * rad;
export const degToRadians = deg => (Math.PI / 180) * deg;
export function multiplyMatrix(matrix, matrix2){

    if(matrix.length == matrix2[0].length){

        const result = []
        for(let i = 0; i < matrix2.length; i++){
            let increment = 0;
            for(let j = 0; j < matrix.length; j++){
                increment += matrix2[i][j] * matrix[j];
            }
            result.push(increment);
        }

        return result;

    }

    throw new Error(
        "¡La cantidad de filas del primer arreglo no coinciden con la cantidad de columnas del segundo arreglo!"
    );
}