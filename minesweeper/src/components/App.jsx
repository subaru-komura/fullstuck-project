import { useState, useEffect, useRef } from "react";
import "../styles/App.css";
import Cell from "./Cell";
import Score from "./Score";
import Timer from "./Timer";
//マテリアルデザインの部品を拝借
import { Button } from "@mui/material";

const GRID_SIZE = 4; // 4x4のグリッド
const NUM_MINES = 3; // 地雷の数

//Board作成
function createBoard() {
  // 初期化
  const board = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(null));

  // 地雷の設置
  board[0][0] = { revealed: false, isMine: false, nearbyMines: 0 };
  board[0][1] = { revealed: false, isMine: false, nearbyMines: 1 };
  board[0][2] = { revealed: false, isMine: false, nearbyMines: 1 };
  board[0][3] = { revealed: false, isMine: false, nearbyMines: 1 };

  board[1][0] = { revealed: false, isMine: false, nearbyMines: 1 };
  board[1][1] = { revealed: false, isMine: false, nearbyMines: 3 };
  board[1][2] = { revealed: false, isMine: true, nearbyMines: 0 };
  board[1][3] = { revealed: false, isMine: false, nearbyMines: 2 };

  board[2][0] = { revealed: false, isMine: true, nearbyMines: 0 };
  board[2][1] = { revealed: false, isMine: false, nearbyMines: 3 };
  board[2][2] = { revealed: false, isMine: true, nearbyMines: 0 };
  board[2][3] = { revealed: false, isMine: false, nearbyMines: 2 };

  board[3][0] = { revealed: false, isMine: false, nearbyMines: 1 };
  board[3][1] = { revealed: false, isMine: false, nearbyMines: 2 };
  board[3][2] = { revealed: false, isMine: false, nearbyMines: 1 };
  board[3][3] = { revealed: false, isMine: false, nearbyMines: 1 };
  return board;
}

//Gameリセット関数
function resetGame(setBoard, resetStopwatch) {
  console.log("リセットボタンがクリックされました");
  setBoard(createBoard());
  resetStopwatch(); // ストップウォッチのリセット
}

//Resetコンポーネント
const Reset = ({ onReset }) => {
  return (
    <Button
      variant="contained"
      onClick={() => {
        onReset();
      }}
    >
      Reset
    </Button>
  );
};

function App() {
  const [board, setBoard] = useState(createBoard());
  const stopwatchStart = useRef(null); // ストップウォッチのスタート関数を保持
  const stopwatchReset = useRef(null); // ストップウォッチのリセット関数を保持
  const stopwatchPause = useRef(null); // ストップウォッチの一時停止関数を保持
  const [winTime, setwinTime] = useState(null); //ゲームに勝利した時の時刻を保存
  const [hasStarted, setHasStarted] = useState(false); // 初クリック判定

  //Cellがクリックされた際にBoardを更新して再描画させる
  function clickCell(rowIndex, colIndex) {
    // console.log(rowIndex, colIndex, "セルがクリックされました");
    //初回クリックの場合のみ実行
    if (!hasStarted) {
      stopwatchStart.current(); // ストップウォッチを開始
      setHasStarted(true); // ゲーム開始済みに設定
    }

    //爆弾の場合ストップウォッチの時刻を記録する
    if (board[rowIndex][colIndex].isMine) {
      // console.log("爆弾だよ");
      stopwatchPause.current(false); //ストップウォッチを止める
    }
    let tmpboard = JSON.parse(JSON.stringify(board));
    //クリックしたセルをみえるようにする
    tmpboard[rowIndex][colIndex].revealed = true;
    //コンプリートしているかチェックする
    const remainingCells = tmpboard.flatMap((row, rowIndex) =>
      row
        .filter((cell) => cell.revealed === false) // 未表示のセルのみを抽出
        .map((cell, colIndex) => ({
          rowIndex,
          colIndex,
          isMine: cell.isMine,
        }))
    );
    // console.log("remainingCells:", remainingCells);
    // console.log("remainingCells.length:", remainingCells.length);
    // 残ったセルがNUM_MINESと等しいかつすべてが爆弾の場合のみWIN
    if (
      remainingCells.length == NUM_MINES &&
      remainingCells.every((cell) => cell.isMine === true)
    ) {
      console.log("You Win!");
      stopwatchPause.current(true); // 勝利時の時刻を打刻
    }
    setBoard(tmpboard);
  }

  //boardが変わるたびにデバッグログ出力
  useEffect(() => {
    // console.log("boardがレンダーされたよ"); //StrictModeが有効になっているので初回ロード時に二回出力される
    // console.log(board); // boardが更新された後の状態を出力
  }, [board]); // boardが変わるたびに実行

  // console.log(board[0][0]);
  return (
    <div className="App">
      <h1>Minesweeper</h1>
      <div className="timer">
        <Timer
          stopwatchStart={stopwatchStart}
          stopwatchReset={stopwatchReset}
          stopwatchPause={stopwatchPause}
          setwinTime={setwinTime}
        />
      </div>
      <div className="Score">
        <Score winTime={winTime} />
      </div>
      <div className="grid">
        {/* {board[0][0].nearbyMines} */}
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell.isMine ? "💣" : cell.nearbyMines}
              revealed={cell.revealed}
              onClick={() => clickCell(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
      <div className="reset">
        <Reset
          onReset={() => {
            resetGame(setBoard, stopwatchReset.current);
            setHasStarted(false);
            setwinTime(null); // リセット時に勝利時の時間もクリア
          }}
        />
      </div>
    </div>
  );
}

export default App;
