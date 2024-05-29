import "../style/SpeechBubble.css";
type Props = {
  isMine: boolean;
  text: string;
};
const SpeechBubble = ({ isMine, text }: Props) => {
  return (
    <div className={`speech ${isMine ? "mine" : ""}`}>
      <p>{text}</p>
    </div>
  );
};

export default SpeechBubble;
