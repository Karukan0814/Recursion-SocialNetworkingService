import "../style/Widgets.css";
import { TwitterTimelineEmbed } from "react-twitter-embed";

type Props = {
  // searchFlag?: boolean;
};
const Widgets = ({}: Props) => {
  return (
    <div className="widgets">
      <div className="widgets__widgetContainer">
        <h2>What's happening</h2>
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="jalva_dev"
          options={{ height: 400 }}
        />
      </div>
    </div>
  );
};

export default Widgets;
