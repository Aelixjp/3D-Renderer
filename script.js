import {Scene} from "./global/Scene.js";
import {Timer} from "./timer/Timer.js";
import Renderer from "./global/Renderer.js";
import {Point, Square, Cube} from "./assets/Shapes.js"
import {Vector} from "./assets/assets.js";
import Camera from "./global/Camera.js";
window.onload = ()=>{

    const canvas = document.getElementById("canvas");
    const CWIDTH = 600;
    const CHEIGHT = 600;
    const BG_COLOR = "#000";
    const FPS_LIMIT = 60;
    let timer, scene, renderer, camera;
    let cube;

    function draw(timestamp = 0){
        scene.paintBG();
        timer.oninit(timestamp,()=>{

            //Code controlled by timer should be here...
            renderer.drawShape(cube);

        });
        scene.drawFPS(timer.currentFPS, "#fff", "#fff", 'Verdana', 30, 25);
        requestAnimationFrame(draw);
    }

    function setup(){
        scene = new Scene(canvas, {width: CWIDTH, height: CHEIGHT});
        timer = new Timer(FPS_LIMIT);
        renderer = new Renderer(scene);
        cube = new Cube(0, 0, 100, 100);
        camera = new Camera(25);
        window.addEventListener("keydown", ev =>{

            switch(ev.keyCode){

                //Left arrow
                case 37:
                    camera.raiseAngle();
                    cube.updatePoints(camera.rotateY.bind(camera));
                    camera.angle = 0;
                    break;
                
                //Up arrow
                case 38:
                    camera.decreaseAngle();
                    cube.updatePoints(camera.rotateX.bind(camera));
                    camera.angle = 0;
                    break;

                //Right arrow
                case 39:
                    camera.decreaseAngle();
                    cube.updatePoints(camera.rotateY.bind(camera))
                    camera.angle = 0;
                    break;

                //Down arrow
                case 40:
                    camera.raiseAngle();
                    cube.updatePoints(camera.rotateX.bind(camera));
                    camera.angle = 0;
                    break;

                //A
                case 65:
                    camera.decreaseAngle();
                    cube.updatePoints(camera.rotateZ.bind(camera))
                    camera.angle = 0;
                    break;

                //S
                case 68:
                    camera.raiseAngle();
                    cube.updatePoints(camera.rotateZ.bind(camera))
                    camera.angle = 0;
                    break;

                default:
                    break;

            }

        });
        draw();
    }

    setup();

};