import { Search, WidthFull } from "@mui/icons-material";
import React from "react";
import {
  TwitterShareButton,
  TwitterTimelineEmbed,
  TwitterTweetEmbed,
} from "react-twitter-embed";
import "../style/Widgets.css";
import SearchInput from "./SearchInput";

type Props = {
  // searchFlag?: boolean;
};
const Widgets = ({}: Props) => {
  return (
    <div className="widgets">
      {/* {searchFlag && <SearchInput />} */}

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
