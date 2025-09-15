import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function initScene(canvasRef, setSceneState) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 1, 3);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.current,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;

  const light1 = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
  light1.position.set(0, 20, 0);
  scene.add(light1);

  const light2 = new THREE.DirectionalLight(0xffffff, 1);
  light2.position.set(5, 10, 7.5);
  scene.add(light2);

  /*const light3 = new THREE.DirectionalLight(0x161DF1, 1);
  light3.position.set(10, 10, 10);
  scene.add(light3);*/

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener("resize", onResize);

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
}

export function loadModel(path, sceneState, setSceneState,setToastMessage) {
  if (!sceneState.scene || !sceneState.camera || sceneState.isLoading) return;

  setSceneState((prev) => ({ ...prev, isLoading: true }));
  const loader = new GLTFLoader();
  loader.load(
    path,
    (gltf) => {
      if (sceneState.model) sceneState.scene.remove(sceneState.model);
      setSceneState((prev) => ({ ...prev, isLoading: true, currentModelPath: path }));
      const model = gltf.scene;

      sceneState.controls.target.set(0, 0, 0);
      sceneState.controls.update();
      // Calcular el bounding box
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      // Centrar el modelo en el origen
      model.position.sub(center);

      // Ajustar distancia de cámara
      const maxDim = Math.max(size.x, size.y, size.z);
      const distance = maxDim * 2; // Puedes ajustar el factor si quieres más zoom

      sceneState.camera.position.set(0, 0, distance);
      sceneState.camera.lookAt(0, 0, 0);

      // Agregar modelo a la escena
      sceneState.scene.add(model);
      setSceneState((prev) => ({ ...prev, model, isLoading: false }));
    },
    undefined,
    (error) => {
      console.error("❌ Error al cargar el modelo:", error);
      setSceneState((prev) => ({ ...prev, isLoading: false }));
      setToastMessage({ message: "❌ Error al cargar el modelo", type: "error" });
;
    
    }
  );
}


export function applyTexture(e, sceneState,setToastMessage) {
  let applied = false;
  const file = e.target.files[0];
  if (!file || !sceneState.model) return;
  console.log("FILE: "+file)
  const url = URL.createObjectURL(file);
  console.log("URL: "+url)
  const texture = new THREE.TextureLoader().load(url, () => {

    texture.flipY = false; 
    sceneState.model.traverse((child) => {
      if (child.isMesh) {
        console.log("NAME: "+child.name)
        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];
        materials.forEach((mat) => {
          console.log("Material:", mat.name, "Tipo:", mat.type);
          if (mat.name === "Material_Imagen") {
            mat.map = texture;
            mat.transparent = true;
            mat.needsUpdate = true;            
            applied=true
          }
        });
      }
    });
    console.log(applied)
    applied ? setToastMessage({ message: "Exito al aplicar la Textura", type: "success" }) : setToastMessage({ message: "Error, elija la imagen nuevamente", type: "error" });
  
  });}
