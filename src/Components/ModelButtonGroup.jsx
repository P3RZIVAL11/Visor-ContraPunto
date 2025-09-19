import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCube,
  faMugHot,
  faBottleWater,
  faShirt,
  faHatCowboy,
  faTshirt,
  faCircle,
  faComputerMouse,
} from "@fortawesome/free-solid-svg-icons";

const models = [
  { name: "LlaveroFull2", label: "Llavero 1", icon: faCube, color: "blue" },
  { name: "LlaveroCircular", label: "Llavero 2", icon: faCircle, color: "green" },
  { name: "Taza", label: "Taza", icon: faMugHot, color: "blue" },
  { name: "Botella1", label: "Botella", icon: faBottleWater, color: "green" },
  { name: "CamisaN", label: "Camisa", icon: faShirt, color: "blue" },
  { name: "Hoodie", label: "Hoodie", icon: faTshirt, color: "green" },
  { name: "Gorra", label: "Gorra", icon: faHatCowboy, color: "blue" },
  { name: "Mousepad", label: "Mousepad", icon: faComputerMouse, color: "green" },
];
const models1 = [
  {
    name: "LlaveroFull2",
    label: "Llavero 1",
    icon: faCube,
    color: "blue",
    variants: {
      original: "/models/LlaveroFull2.glb"
    }
  },
  {
    name: "LlaveroCircular",
    label: "Llavero 2",
    icon: faCircle,
    color: "green",
    variants: {
      original: "/models/LlaveroCircular.glb"
    }
  },
  {
    name: "Taza",
    label: "Taza",
    icon: faMugHot,
    color: "blue",
    variants: {
      original: "/models/Taza.glb"
    }
  },
  {
    name: "Botella1",
    label: "Botella",
    icon: faBottleWater,
    color: "green",
    variants: {
      original: "/models/Botella1.glb"
    }
  },
  {
    name: "CamisaB",
    label: "Camisa",
    icon: faShirt,
    color: "blue",
    variants: {
      black: "/models/CamisaN.glb",
      original: "/models/CamisaN.glb"
    }
  },
  {
    name: "Hoodie",
    label: "Hoodie",
    icon: faTshirt,
    color: "green",
    variants: {
      black: "/models/HoodieN.glb",
      original: "/models/Hoodie.glb"
    }
  },
  {
    name: "Gorra",
    label: "Gorra",
    icon: faHatCowboy,
    color: "blue",
    variants: {
      original: "/models/Gorra.glb"
    }
  },
  {
    name: "Mousepad",
    label: "Mousepad",
    icon: faComputerMouse,
    color: "green",
    variants: {
      original: "/models/Mousepad.glb"
    }
  }
];


export default function ModelButtonGroup({ sceneState, setSceneState, loadModel, setToastMessage}) {
  return (
    <div className="model-button-group">
      {models1.map(({ name, label, icon, color , variants}) => (
        <div key={name} className="model-button-wrapper">
          <button
              key={name}
              className={`model-button ${color}`}
              onClick={() => loadModel(`/models/${name}.glb`, sceneState, setSceneState,setToastMessage)}
          >
            <FontAwesomeIcon icon={icon} />
            {label}
          </button>

          {variants.black && (
            <div
              className="variant-indicator"
              title="Versión"
              onClick={(e) => {
                e.stopPropagation(); // evita que se dispare el botón principal
                loadModel(variants.black, sceneState, setSceneState, setToastMessage);
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
