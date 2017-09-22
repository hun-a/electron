import React from 'react';
import Editor from './Editor';

export default class MarkdownEditorUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(e) {
    this.setState({
      text: e.target.value
    });
  }

  render() {
    return (
      <div>
        <Editor
          value={this.state.text}
          onChange={this.onChangeText}
        />
      </div>
    );
  }
}
