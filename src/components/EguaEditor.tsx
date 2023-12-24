import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { DeleguaWeb } from "./DeleguaWeb";
import Modal from "react-modal";
import { useQuestions } from "@/pages/api/questionsContext";

const EguaEditor = () => {
  const [code, setCode] = useState<string>("escreva('Olá mundo')");
  const [consoleResult, setConsoleResult] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const { questions, dispatch } = useQuestions();

  //Effect to update code when the Question is changed
  useEffect(() => {
    setCode(questions.questionArray[questions.questionNumber].defaultCode);
    setConsoleResult([]);
  }, [questions.questionNumber]);

  //When consoleResult is changed to be greater than 1 result, and it isn't the free editor
  //run checkCompletion
  useEffect(() => {
    if (consoleResult.length > 0 && questions.questionNumber != 0) {
      checkCompletion();
    }
  }, [consoleResult]);

  //Closes dialog box
  const handleDialogClose = () => {
    dispatch({
      type: "UpdateQuestionStatus",
      payload: questions.questionNumber,
    });
    setShowDialog(false);
    setCompleted(false);
  };
  //Closes dialog box and changes the questionNumber to the next possible int
  const handleDialogNext = () => {
    dispatch({
      type: "UpdateQuestionStatus",
      payload: questions.questionNumber,
    });

    const nextQuestionNumber = questions.questionNumber + 1;
    dispatch({ type: "ChangeCurrentQuestion", payload: nextQuestionNumber });

    setShowDialog(false);
    setCompleted(false);
  };

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

  //Checks if every answer is the same as expected
  const checkCompletion = () => {
    const currentQuestion = questions.questionArray[questions.questionNumber];
    const { expectedOutput } = currentQuestion;
    const consoleResults = consoleResult.slice(0, expectedOutput?.length ?? 0);

    const combinedResults = (expectedOutput || []).map((item, index) => ({
      expected: item,
      result: consoleResults[index],
    }));

    const isCompleted = combinedResults.every(
      ({ expected, result }) => result === expected
    );
    if (isCompleted) {
      setCompleted(true);
      setShowDialog(true);
    }
  };
  //Renders the table header
  const renderTableHeader = () => {
    const currentQuestion = questions.questionArray[questions.questionNumber];
    if (!currentQuestion || questions.questionNumber === 0) {
      return null; // No header for the free console
    }

    const { input, expectedOutput } = currentQuestion;

    return (
      <tr>
        {input !== null && <th>Entrada</th>}
        {expectedOutput !== null && <th>Saída Esperada</th>}
        <th>Saída Encontrada</th>
      </tr>
    );
  };
  //Renders the table rows
  const renderTableRow = (
    { expected, result }: { expected: any; result: any },
    index: number
  ) => {
    const currentQuestion = questions.questionArray[questions.questionNumber];

    return (
      <tr key={index} className={result === expected ? "green" : ""}>
        {currentQuestion.input !== null && (
          <td>{currentQuestion.input[index]}</td>
        )}
        <td>{expected}</td>
        <td>{result}</td>
      </tr>
    );
  };

  //Renders the table that displays test results
  const renderTable = () => {
    const currentQuestion = questions.questionArray[questions.questionNumber];

    if (!currentQuestion || questions.questionNumber === 0) {
      return (
        <div>
          {consoleResult.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      );
    }

    const { expectedOutput } = currentQuestion;
    const consoleResults = consoleResult.slice(0, expectedOutput?.length ?? 0);

    const combinedResults = (expectedOutput || []).map((item, index) => ({
      expected: item,
      result: consoleResults[index],
    }));

    return (
      <div>
        <table className="resultTable">
          <thead>{renderTableHeader()}</thead>
          <tbody>{combinedResults.map(renderTableRow)}</tbody>
        </table>
      </div>
    );
  };

  //Style for modalOverlay
  const modalOverlay = {
    overlay: {
      backgroundColor: "rgba(30, 30, 30, 0.5)",
    },
    
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
      <Modal
        className="modal"
        isOpen={showDialog}
        onRequestClose={handleDialogClose}
        style={modalOverlay}
      >
        <p>Parabéns, você completou o desafio!</p>
        <button onClick={handleDialogClose}>Fechar</button>
        <button onClick={handleDialogNext}>Próximo</button>
      </Modal>
    </div>
  );
};

export default EguaEditor;
