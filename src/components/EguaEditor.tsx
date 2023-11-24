import Editor from "@monaco-editor/react";
import { useState } from "react";
import { DeleguaWeb } from "./DeleguaWeb";


const EguaEditor = () => {
  const [code, setCode] = useState<string>("// Start coding here...");


  const handleEditorChange = (value : string | undefined) => {
    setCode(value || "");
  };


  const handleExecute = async function () {
    const delegua = new DeleguaWeb("", console.log());

    const codigo = code.split("\n")

    const retornoLexador = delegua.lexador.mapear(codigo, -1);
    const retornoAvaliadorSintatico =
        delegua.avaliadorSintatico.analisar(retornoLexador, 0);

    await delegua.executar({ retornoLexador, retornoAvaliadorSintatico });
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
         value={code}
         onChange={handleEditorChange}
      />
    </div>
  );
};

export default EguaEditor;
