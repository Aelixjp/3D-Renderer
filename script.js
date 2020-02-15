import {Scene} from "./global/Scene.js";
import {Timer} from "./timer/Timer.js";
import Renderer from "./global/Renderer.js";
import {Cube} from "./assets/Shapes.js";
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
        scene = new Scene(canvas, {width: CWIDTH, height: CHEIGHT}, BG_COLOR);
        timer = new Timer(FPS_LIMIT);
        renderer = new Renderer(scene);
        cube = new Cube(0, 0, 300, 300);
        camera = new Camera(1.9);
        camera.proyect(cube);
        window.addEventListener("keydown", ev =>{

            switch(ev.keyCode){

                //Left arrow
                case 37:
                    cube.decreaseAngle();
                    cube.rotateY();
                    camera.proyect(cube)
                    break;
                
                //Up arrow
                case 38:
                    cube.raiseAngle();
                    cube.rotateX();
                    camera.proyect(cube)
                    break;

                //Right arrow
                case 39:
                    cube.raiseAngle();
                    cube.rotateY();
                    camera.proyect(cube)
                    break;

                //Down arrow
                case 40:
                    cube.decreaseAngle();
                    cube.rotateX();
                    camera.proyect(cube)
                    break;

                //A
                case 65:
                    cube.decreaseAngle();
                    cube.rotateZ();
                    camera.proyect(cube)
                    break;

                //S
                case 68:
                    cube.raiseAngle();
                    cube.rotateZ();
                    camera.proyect(cube)
                    break;

                default:
                    break;

            }

        });
        draw();
    }

    setup();

};