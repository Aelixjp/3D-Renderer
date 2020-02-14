export const cos = angle => Math.cos(degToRadians(angle));
export const sin = angle => Math.sin(degToRadians(angle));
export const radToDegrees = rad => (180 / Math.PI) * rad;
export const degToRadians = deg => (Math.PI / 180) * deg;
export const proyectionMatrix = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
]