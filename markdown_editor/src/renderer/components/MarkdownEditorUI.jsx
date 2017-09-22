import React from 'react';
import { ipcRenderer } from 'electron';
import Editor from './Editor';
import style from './MarkdownEditorUI.css';
import Previewer from './Previewer';

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

  componentDidMount() {
    ipcRenderer.on('REQUEST_TEXT', () => {
      ipcRenderer.send('REPLAY_TEXT', this.state.text);
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners();
  }

  render() {
    return (
      <div className={style.markdownEditor}>
        <Editor
          className={style.editorArea}
          value={this.state.text}
          onChange={this.onChangeText}
        />
        <Previewer
          className={style.previewerArea}
          value={this.state.text}
        />
      </div>
    );
  }
}
