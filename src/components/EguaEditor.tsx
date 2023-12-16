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
        `;
      case "Question 2":
        setConsoleResult([]);
        return `
        funcao taxaPosNeg(array){
          // Escreva sua função aqui

        }
        `;
      case "Question 3":
        setConsoleResult([]);
        return `
        funcao inteiroSolitario(array){
          // Escreva sua função aqui

        }
        `;
      default:
        return "escreva('Olá mundo')";
    }
  }

  // Function to append additional code based on the question
  const appendAdditionalCode = (
    currentCode: string,
    questionValue: string
  ): string => {
    switch (questionValue) {
      case "Question 1":
        return (
          currentCode +
          "\n" +
          "somaMinMax([100, 5, 50, 10, 25])\n" +
          "somaMinMax([5, 5, 5, 5, 5])\n" +
          "somaMinMax([1, 2, 3, 4, 5])"
        );
      case "Question 2":
        return (
          currentCode +
          "\n" +
          "taxaPosNeg([-4, 3, -9 ,0, 4, 1])\n" +
          "taxaPosNeg([-1, -2, -3 4 5 6])\n" +
          "taxaPosNeg([0, 0, 0 ,0 ,0, 0])"
        );
      case "Question 3":
        return (
          currentCode +
          "\n" +
          "inteiroSolitario([Value1, Value2, Value3])\n" +
          "inteiroSolitario([Value4, Value5, Value6])\n" +
          "inteiroSolitario([Value7, Value8, Value9])"
        );
      default:
        return currentCode;
    }
  };

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
    setConsoleResult([]);
    const delegua = new DeleguaWeb("", executeConsole);

    const currentCode = code;

    const updatedCode = appendAdditionalCode(currentCode, questions.value);

    const codigo = updatedCode.split("\n");

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
                <td>-4 3 -9 0 4 1</td>
                <td>
                  0.500000 <br /> 0.333333 <br /> 0.166667
                </td>
                <td>{consoleResult[0]} <br /> {consoleResult[1]} <br /> {consoleResult[2]}</td>
              </tr>
              <tr>
                <td>-1 -2 -3 4 5 6</td>
                <td>0.500000 <br /> 0.500000 <br /> 0</td>
                <td>{consoleResult[3]} <br /> {consoleResult[4]} <br /> {consoleResult[5]}</td>
              </tr>
              <tr>
                <td>0 0 0 0 0 0 0</td>
                <td>0 <br />0 <br /> 1</td>
                <td>{consoleResult[6]} <br /> {consoleResult[7]} <br /> {consoleResult[8]}</td>
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
                <td>1 2 3 4 3 2 1</td>
                <td>4</td>
                <td>{consoleResult[0]}</td>
              </tr>
              <tr>
                <td>1 2 3 2 1</td>
                <td>3</td>
                <td>{consoleResult[1]}</td>
              </tr>
              <tr>
                <td>5 5 6 4 4</td>
                <td>6</td>
                <td>{consoleResult[2]}</td>
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
