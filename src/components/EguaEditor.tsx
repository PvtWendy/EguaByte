import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { DeleguaWeb } from "./DeleguaWeb";
import { useQuestions } from "@/pages/api/questionsContext";

const EguaEditor = () => {
  const [code, setCode] = useState<string>("escreva('Olá mundo')");
  const [consoleResult, setConsoleResult] = useState<string[]>([]);
  const { questions } = useQuestions();

  useEffect(() => {
    setCode(getDefaultCode());
  }, [questions.value]);

  function getDefaultCode(): string {
    switch (questions.value) {
      case "Question 1":
        setConsoleResult([]);
        return `
        funcao somaMinMax(array){
          // Escreva sua função aqui

        }

        somaMinMax([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        `;
      case "Question 2":
        setConsoleResult([]);
        return `
        funcao taxaPosNeg(array){
          // Escreva sua função aqui

        }

        taxaPosNeg([0, 1, 2, 3, 4, 5, -6, 7, -8, -9, -10])
        `;
      case "Question 3":
        setConsoleResult([]);
        return `
        funcao inteiroSolitario(array){
          // Escreva sua função aqui

        }

        somaMinMax([1, 2, 3, 4, 5, 4, 3, 2, 1])
        `;
      default:
        return "escreva('Olá mundo')";
    }
  }
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
        height="70%"
        width="100%"
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
