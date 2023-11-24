import Editor from "@monaco-editor/react";
import { useState } from "react";
import { DeleguaWeb } from "./DeleguaWeb";

const EguaEditor = () => {
  const [code, setCode] = useState<string>("escreva('Olá mundo')");
  const [consoleResult, setConsoleResult] = useState<string[]>([]);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  const executeConsole = (result: string) => {
    setConsoleResult((prevResult: string[]) => [...prevResult, result]);
  };

  const handleExecute = async function () {
    const delegua = new DeleguaWeb("", executeConsole);

    const codigo = code.split("\n");

    const retornoLexador = delegua.lexador.mapear(codigo, -1);
    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(
      retornoLexador,
      0
    );

    await delegua.executar({ retornoLexador, retornoAvaliadorSintatico });
  };

  return (
    <div>
      <div className="editorTopBar">
        <button onClick={handleExecute}>Executar</button>
      </div>
      <Editor
        height="70vh"
        width="70vw"
        theme="vs-dark"
        defaultLanguage="javascript"
        value={code}
        onChange={handleEditorChange}
      />
      <div className="editorConsole">
        {consoleResult.map((element, index) => (
          <p key={index}>{element}</p>
        ))}
      </div>
    </div>
  );
};

export default EguaEditor;
