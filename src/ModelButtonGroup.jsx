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
  { name: "Camisa", label: "Camisa", icon: faShirt, color: "blue" },
  { name: "Hoodie", label: "Hoodie", icon: faTshirt, color: "green" },
  { name: "Gorra", label: "Gorra", icon: faHatCowboy, color: "blue" },
  { name: "Mousepad", label: "Mousepad", icon: faComputerMouse, color: "green" },
];

export default function ModelButtonGroup({ sceneState, setSceneState, loadModel }) {
  return (
    <div className="model-button-group">
      {models.map(({ name, label, icon, color }) => (
        <button
            key={name}
            className={`model-button ${color}`}
            onClick={() => loadModel(`/models/${name}.glb`, sceneState, setSceneState)}
        >
          <FontAwesomeIcon icon={icon} />
          {label}
        </button>
      ))}
    </div>
  );
}
