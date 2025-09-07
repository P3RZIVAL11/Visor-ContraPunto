import { useEffect, useRef, useState } from "react";
import { initScene, loadModel, applyTexture } from "./viewerLogic";
import ModelButtonGroup from "./ModelButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle, faRedo, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import './styles/visor.css';

export default function Viewer() {
  const canvasRef = useRef();
  const [sceneState, setSceneState] = useState({
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    model: null,
    isLoading: false,
  });

  useEffect(() => {
    const cleanup = initScene(canvasRef, setSceneState);
    return cleanup;
  }, []);
  // Este se activa cuando la escena ya está lista
useEffect(() => {
  if (sceneState.scene) {
    loadModel("/models/LlaveroFull2.glb", sceneState, setSceneState);
  }
}, [sceneState.scene]);

  return (
    <div>
       <div
        className="model-button-group "
      >
        <ModelButtonGroup
          sceneState={sceneState}
          setSceneState={setSceneState}
          loadModel={loadModel}
        />
      </div>

      <div className="float-button-group">
        <button className="float-button" title="Ayuda">
          <FontAwesomeIcon icon={faQuestionCircle} />
        </button>
        <button className="float-button" title="Reiniciar">
          <FontAwesomeIcon icon={faRedo} />
        </button>
        <button className="float-button" title="Retornar">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
      <input
        type="file"
        accept="image/*"
        className="image-upload-container"
        style={{ bottom: "20px", left: "20px", zIndex: 10 }}
        onChange={(e) => applyTexture(e, sceneState)}
      />

  
      <canvas ref={canvasRef} id="viewer" style={{ width: "100%", height: "100vh", display: "block" }} />
    </div>
  );
}




/*import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function Viewer() {
  const canvasRef = useRef();
  const [sceneState, setSceneState] = useState({
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    model: null,
  });

  // Inicializar la escena
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 1, 3);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate=true;

    // Luces
    const light1 = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    light1.position.set(0, 20, 0);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 1);
    light2.position.set(5, 10, 7.5);
    scene.add(light2);

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    setSceneState({ scene, camera, renderer, controls, model: null });

    return () => {
      window.removeEventListener("resize", onResize);
      controls.update();
    };
  }, []);

  // Cargar modelo
  const loadModel = (path) => {
    if (!sceneState.scene) return;
    const loader = new GLTFLoader();
    loader.load(
      path,
      (gltf) => {
        if (sceneState.model) sceneState.scene.remove(sceneState.model);
        const model = gltf.scene;
        model.position.set(0, -0.5, 0);
        model.scale.set(1, 1, 1);
        sceneState.scene.add(model);
        setSceneState((prev) => ({ ...prev, model }));
      },
      undefined,
      (error) => {
        console.error("❌ Error al cargar el modelo:", error);
      }
    );
  };

  // Subir imagen como textura
  const handleTextureUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !sceneState.model) return;

    const url = URL.createObjectURL(file);
    const texture = new THREE.TextureLoader().load(url, () => {
      sceneState.model.traverse((child) => {
        if (child.isMesh) {
          child.material.map = texture;
          child.material.transparent = true;
          child.material.needsUpdate = true;
        }
      });
    });
  };

  return (
    <div>
      {/* Botones }
      <div className="top-right position-absolute d-flex flex-wrap gap-2 p-2">
        <button className="btn btn-primary btn-sm" onClick={() => loadModel("/models/Llavero1.glb")}>
          Llavero 1
        </button>
        <button className="btn btn-success btn-sm" onClick={() => loadModel("/models/LlaveroCircular.glb")}>
          Llavero 2
        </button>
        <button className="btn btn-primary btn-sm" onClick={() => loadModel("/models/Taza.glb")}>
          Taza
        </button>
        <button className="btn btn-success btn-sm" onClick={() => loadModel("/models/Botella1.glb")}>
          Botella
        </button>
        <button className="btn btn-primary btn-sm" onClick={() => loadModel("/models/Camisa.glb")}>
          Camisa
        </button>
        <button className="btn btn-success btn-sm" onClick={() => loadModel("/models/Hoodie.glb")}>
          Hoodie
        </button>
        <button className="btn btn-primary btn-sm" onClick={() => loadModel("/models/Gorra.glb")}>
          Gorra
        </button>
      </div>

      {/* Input de imagen }
      <input
        type="file"
        accept="image/*"
        className="form-control w-auto position-absolute"
        style={{ bottom: "20px", left: "20px", zIndex: 10 }}
        onChange={handleTextureUpload}
      />

      {/* Canvas }
      <canvas ref={canvasRef} id="viewer" style={{ width: "100%", height: "100vh", display: "block" }} />
    </div>
  );
}*/
