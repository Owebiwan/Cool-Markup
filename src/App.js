import React from "react";
import "./App.scss";
let marked = require("marked");

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![Jaquoine Pheonix](https://google/Umyytc)
`;

// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
  breaks: true,
});

// INSERTS target="_blank" INTO HREF TAGS (required for codepen links)
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + "</a>";
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
  }
  handleChange(e) {
    this.setState({
      markdown: e.target.value,
    });
  }
  handleEditorMaximize() {
    this.setState({
      editorMaximized: !this.state.editorMaximized,
    });
  }
  handlePreviewMaximize() {
    this.setState({
      previewMaximized: !this.state.previewMaximized,
    });
  }
  render() {
    const classes = this.state.editorMaximized
      ? ["editorWrap maximized", "previewWrap hide", "fa fa-compress"]
      : this.state.previewMaximized
      ? ["editorWrap hide", "previewWrap maximized", "fa fa-compress"]
      : ["editorWrap", "previewWrap", "fa fa-arrows-alt"];
    return (
      <div>
        <div className={classes[0]}>
          <section className="toolbar">
            <i className="fa fa-edit"></i>
            Code Editor
            <i className={classes[2]} onClick={this.handleEditorMaximize} />
          </section>
          <section>
            <textarea
              id="editor"
              onChange={this.handleChange}
              type="text"
              value={this.state.markdown}
            />
          </section>
        </div>
        <div className={classes[1]}>
          <section className="toolbar">
            <i className="fa fa-eye"></i>
            Previewer
            <i className={classes[2]} onClick={this.handleEditorMaximize} />
          </section>
          <section>
            <div
              dangerouslySetInnerHTML={{
                __html: marked(this.state.markdown, { renderer: renderer }),
              }}
              id="preview"
            />
          </section>
        </div>
      </div>
    );
  }
}

export default App;
