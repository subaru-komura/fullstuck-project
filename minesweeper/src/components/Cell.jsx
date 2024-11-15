export default function Cell({ value, onClick, onContextMenu, revealed }) {
  return (
    <div className="cell" onClick={onClick}>
      {revealed ? value : "___|"}
    </div>
  );
}
