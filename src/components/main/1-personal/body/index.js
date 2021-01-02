import React from "react";

import {
  TextAccent,
  TextHeading,
  Text,
  TextType,
  ParseTextForLinks,
} from "../../../../elements";
import { Main } from "../../../../content";

import Style from "./style.module.scss";

class Body extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      language: "english",
    };

    this.linkHover = this.linkHover.bind(this);
  }

  linkHover(actions) {
    const { photoLinkCallback } = this.props;
    actions.forEach(({action, param }) => {
      switch(action) {
        case "image":
          photoLinkCallback(param);
          break;
        case "text":
          this.setState({
            language: param
          });
          break;
        default:
          break;
      }
    })
  }

  render() {
    const { language } = this.state;
    const { accent, link_text, title_text } = Main.personal;
    return (
      <div className={Style.body}>
        <TextAccent>
          <TextType speed={120} revealed={true}>
            {accent[language]}
          </TextType>
        </TextAccent>
        <TextHeading>
          {ParseTextForLinks(
            title_text.text,
            title_text.links,
            this.linkHover
          )}
        </TextHeading>
        <Text className={Style.bio}>
          {ParseTextForLinks(link_text.text[0], link_text.links)}
        </Text>
        <Text className={`${Style.bio} ${Style.additional}`}>
          {ParseTextForLinks(
            link_text.text[1],
            link_text.links,
            this.linkHover
          )}
        </Text>
      </div>
    );
  }
}
export { Body };
