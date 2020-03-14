import {Scene} from "./global/Scene.js";
import {Timer} from "./timer/Timer.js";
import Renderer from "./global/Renderer.js";
import {Square, Cube} from "./assets/Shapes.js";
import Camera from "./global/Camera.js";
import Keyboard from "./global/Keyboard.js";
window.onload = ()=>{

    const canvas = document.getElementById("canvas");
    const CWIDTH = 600;
    const CHEIGHT = 600;
    const BG_COLOR = "#000";
    const FPS_LIMIT = 60;

    let timer, scene, renderer, camera, keyboard;
    let cube;

    const keysForUse = [37, 38, 39, 40, 65, 68];

    function draw(timestamp = 0){
        scene.paintBG();
        timer.oninit(timestamp,()=>{

            //Code controlled by timer should be here...
            keyboard.controlCamera(cube, camera);
        });
        renderer.drawShape(cube);
        scene.drawFPS(timer.currentFPS, "#fff", "#fff", 'Verdana', 30, 25);
        requestAnimationFrame(draw);
    }

    function setup(){
        scene = new Scene(canvas, {width: CWIDTH, height: CHEIGHT}, BG_COLOR);
        timer = new Timer(FPS_LIMIT);
        renderer = new Renderer(scene);
        cube = new Cube(0, 0, 300, 300, 2);
        camera = new Camera(1.9);
        camera.proyect(cube);
        keyboard = new Keyboard();
        keyboard.setup(keysForUse);
        keyboard.addKeyboardMapperListener("keydown");
        keyboard.addKeyboardMapperListener("keyup");
        draw();
    }

    setup();

};