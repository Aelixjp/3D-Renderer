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
                    cube.raiseAngle();
                    cube.rotateY();
                    break;
                
                //Up arrow
                case 38:
                    cube.decreaseAngle();
                    cube.rotateX();
                    break;

                //Right arrow
                case 39:
                    cube.decreaseAngle();
                    cube.rotateY();
                    break;

                //Down arrow
                case 40:
                    cube.raiseAngle();
                    cube.rotateX();
                    break;

                //A
                case 65:
                    cube.decreaseAngle();
                    cube.rotateZ();
                    break;

                //S
                case 68:
                    cube.raiseAngle();
                    cube.rotateZ();
                    break;

                default:
                    break;

            }

        });
        draw();
    }

    setup();

};