import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { DeleguaWeb } from "./DeleguaWeb";
import { useQuestions } from "@/pages/api/questionsContext";

const EguaEditor = () => {
  const [code, setCode] = useState<string>("escreva('Olá mundo')");
  const [consoleResult, setConsoleResult] = useState<string[]>([]);
  const { questions } = useQuestions();

  //Effect to update code when the Question is changed
  useEffect(() => {
    setCode(questions.questionArray[questions.questionNumber].defaultCode);
    setConsoleResult([]);
  }, [questions.questionNumber]);

  useEffect(() => {
    renderTable();
  }, [consoleResult]);

  // Function to append additional code based on the question
  const appendAdditionalCode = (
    currentCode: string,
    additionalCode: string | null
  ): string => {
    return currentCode + (additionalCode ? `\n${additionalCode}` : "");
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

    const updatedCode = appendAdditionalCode(
      currentCode,
      questions.questionArray[questions.questionNumber].additionalCode
    );

    const codigo = updatedCode.split("\n");

    const retornoLexador = delegua.lexador.mapear(codigo, -1);
    const retornoAvaliadorSintatico = delegua.avaliadorSintatico.analisar(
      retornoLexador,
      0
    );

    await delegua.executar({ retornoLexador, retornoAvaliadorSintatico });
  };

  // Function to render the table that displays test results
  const renderTable = () => {
    const currentQuestion = questions.questionArray[questions.questionNumber];

    //Renders the free console
    if (!currentQuestion || questions.questionNumber === 0) {
      return (
        <div>
          {consoleResult.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      );
    }

    const { input, expectedOutput } = currentQuestion;
    const consoleResults = consoleResult.slice(0, expectedOutput?.length ?? 0);

    // Combine expectedOutput and consoleResults into a single array
    const combinedResults = (expectedOutput || []).map((item, index) => ({
      expected: item,
      result: consoleResults[index],
    }));
    
    return (
      <div>
        <table className="resultTable">
          <thead>
            <tr>
              {input !== null && <th>Entrada</th>}
              {expectedOutput !== null && <th>Saída Esperada</th>}
              <th>Saída Encontrada</th>
            </tr>
          </thead>
          <tbody>
            {combinedResults?.map(({ expected, result }, index) => (
              <tr key={index} className={result === expected ? "green" : ""}>
                {input !== null && <td>{input[index]}</td>}
                <td>{expected}</td>
                <td>{result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  //Renders component
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
