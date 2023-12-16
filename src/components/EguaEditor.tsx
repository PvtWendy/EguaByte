import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { DeleguaWeb } from "./DeleguaWeb";
import { useQuestions } from "@/pages/api/questionsContext";

const EguaEditor = () => {
  const [code, setCode] = useState<string>("escreva('Olá mundo')");
  const [consoleResult, setConsoleResult] = useState<string[]>([]);
  const { questions } = useQuestions();

  //Effect to update code when questions.value is changed
  useEffect(() => {
    setCode(getDefaultCode());
  }, [questions.value]);

  //The code it updates to
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

  //Editor changes handler
  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  //Adds to ConsoleResult the console logs
  const executeConsole = (result: string) => {
    setConsoleResult((prevResult: string[]) => [...prevResult, result]);
  };

  //Makes Delegua actually able to run
  const handleExecute = async function () {
    setConsoleResult([])
    const delegua = new DeleguaWeb("", executeConsole);

    const codigo = code.split("\n");

    const retornoLexador = delegua.lexador.mapear(codigo, -1);
    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(
      retornoLexador,
      0
    );

    await delegua.executar({ retornoLexador, retornoAvaliadorSintatico });
  };

  //Function to render the table that displays test results
  const renderTable = () => {
    switch (questions.value) {
      case "Question 1":
        return (
          <table className="resultTable">
            <thead>
              <tr>
                <th>Entrada</th>
                <th>Saída Esperada</th>
                <th>Saída Encontrada</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>100 5 50 10 25</td>
                <td>90 180</td>
                <td>{consoleResult[0]}</td>
              </tr>
              <tr>
                <td>5 5 5 5 5</td>
                <td>25 25</td>
                <td>{consoleResult[1]}</td>
              </tr>
              <tr>
                <td>1 2 3 4 5</td>
                <td>10 14</td>
                <td>{consoleResult[2]}</td>
              </tr>
            </tbody>
          </table>
        );
      case "Question 2":
        return (
          <table className="resultTable">
            <thead>
              <tr>
                <th>Entrada</th>
                <th>Saída Esperada</th>
                <th>Saída Encontrada</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Value1</td>
                <td>Expected1</td>
                <td>Actual1</td>
              </tr>
              <tr>
                <td>Value2</td>
                <td>Expected2</td>
                <td>Actual2</td>
              </tr>
            </tbody>
          </table>
        );

      case "Question 3":
        return (
          <table className="resultTable">
            <thead>
              <tr>
                <th>Entrada</th>
                <th>Saída Esperada</th>
                <th>Saída Encontrada</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Value1</td>
                <td>Expected1</td>
                <td>Actual1</td>
              </tr>
              <tr>
                <td>Value2</td>
                <td>Expected2</td>
                <td>Actual2</td>
              </tr>
            </tbody>
          </table>
        );

      default:
        return (
          <div className="editorConsole">
            {consoleResult.map((element, index) => (
              <p key={index}>{element}</p>
            ))}
          </div>
        );
    }
  };
  return (
    <div className="editorContainer">
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
      <div className="editorConsole">{renderTable()}</div>
    </div>
  );
};

export default EguaEditor;
