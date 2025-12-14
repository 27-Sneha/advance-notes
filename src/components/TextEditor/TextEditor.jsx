import { useRef, forwardRef, useImperativeHandle } from "react";
import "./TextEditor.css";

const TextEditor = forwardRef((props, ref) => {
  const editorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getContent: () => editorRef.current.innerHTML,
    setContent: (html) => (editorRef.current.innerHTML = html),
    focus: () => editorRef.current.focus(),
  }));

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  return (
    <div className="text-editor-container">
      <div className="text-editor-toolbar">
        <button onClick={() => handleFormat("bold")}>B</button>
        <button onClick={() => handleFormat("italic")}>I</button>
        <button onClick={() => handleFormat("underline")}>U</button>

        <button onClick={() => handleFormat("justifyLeft")}>Left</button>
        <button onClick={() => handleFormat("justifyCenter")}>Center</button>
        <button onClick={() => handleFormat("justifyRight")}>Right</button>

        <select onChange={(e) => handleFormat("fontSize", e.target.value)}>
          <option value="3">Normal</option>
          <option value="4">Large</option>
          <option value="5">X-Large</option>
        </select>
        <select onChange={(e) => handleFormat("formatBlock", e.target.value)}>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="h5">Heading 5</option>
          <option value="h6">Heading 6</option>
        </select>

        <input
          type="color"
          id="favcolor"
          name="favcolor"
          onClick={(e) => handleFormat("foreColor", false, e.target.value)}
        ></input>
      </div>

      <div
        ref={editorRef}
        contentEditable
        className="text-editor-content"
        autoCorrect="false"
        spellCheck="false"
      ></div>
    </div>
  );
});

export default TextEditor;
