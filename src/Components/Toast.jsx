// Toast.jsx
import '../styles/Toast.css';

export default function Toast({ message, onClose , type}) {
  return (
    <div className={`toast ${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>✖</button>
    </div>
  );
}
