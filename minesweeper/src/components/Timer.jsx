import { useEffect } from "react";
//ストップウォッチの部品を拝借
import { useStopwatch } from "react-timer-hook";

//ストップウォッチ部品作成
function MyStopwatch({
  stopwatchStart,
  stopwatchReset,
  stopwatchPause,
  setwinTime,
}) {
  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  // start, reset, pause関数を親コンポーネントに渡す
  useEffect(() => {
    stopwatchStart.current = start;
    stopwatchReset.current = () => {
      reset();
      pause(); //リセット後にカウントアップしないようにpause
    };
    stopwatchPause.current = (winflg) => {
      pause();
      if (winflg) setwinTime(`${minutes}分${seconds}秒`); // 勝利時の時刻を親に渡す
    };
  }, [
    start,
    reset,
    pause,
    stopwatchStart,
    stopwatchReset,
    stopwatchPause,
    minutes,
    seconds,
    setwinTime,
  ]);

  return (
    <>
      <span> {minutes}</span>分<span>{seconds}</span>
      {"秒 "}
    </>
  );
}

//Timerコンポーネント
export default function Timer({
  stopwatchStart,
  stopwatchReset,
  stopwatchPause,
  setwinTime,
}) {
  return (
    <div>
      Timer
      {MyStopwatch({
        stopwatchStart,
        stopwatchReset,
        stopwatchPause,
        setwinTime,
      })}
    </div>
  );
}
