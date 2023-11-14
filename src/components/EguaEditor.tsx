import Editor from "@monaco-editor/react";
import { useState } from "react";

const EguaEditor = () => {
  const [code, setCode] = useState<string | undefined>("// Start coding here...");

  const handleExecute = () => {
    try {
      if (code !== undefined) {
        const result = eval(code);
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="editorTopBar">
        <button onClick={handleExecute}>Executar</button>
      </div>
      <Editor
         height="95vh"
         width="70vw"
         theme='vs-dark'
         defaultLanguage="javascript"
         defaultValue={code}
         onChange={(value, event) => setCode(value)}
      />
    </div>
  );
};

export default EguaEditor;
