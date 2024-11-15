//Scoreコンポーネント
export default function Score({ winTime }) {
  return <div>Score {winTime && `${winTime}`}</div>;
}
