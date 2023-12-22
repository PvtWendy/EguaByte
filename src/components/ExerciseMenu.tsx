import { useQuestions } from "@/pages/api/questionsContext";
import { useEffect, useState } from "react";

export default function ExerciseMenu() {
  const [menuState, setMenuState] = useState(false);
  const { questions, dispatch } = useQuestions();

  //Toggles the menu
  const toggleQuestions = (): void => {
    setMenuState(!menuState);
  };

  //Sends an action with a payload to change the question
  const handleButtonClick = (questionNum: number): void => {
    dispatch({ type: "ChangeCurrentQuestion", payload: questionNum });
    toggleQuestions();
  };

  //Renders the button to the other question if is unlocked, puts a checkmark on it if complete and not initialpage
  const renderQuestionButtons = () => {
    return questions.questionArray
      .filter((question) => question.isUnlocked)
      .map((question, index) => (
        <button key={index} onClick={() => handleButtonClick(index)}>
          {question.title}
          {question.isCompleted && index > 0 && "✅"}
        </button>
      ));
  };

  //Renders the Question's JSX
  const renderQuestionContent = () => {
    const currentQuestion = questions.questionArray[questions.questionNumber];

    return <div><h2>{currentQuestion.title}</h2>{currentQuestion.questionJSX}</div>;
  };

  //Renders the Component
  return (
    <div className="questions">
      {menuState ? (
        <div>
          <button onClick={() => toggleQuestions()}>Voltar</button>
          {renderQuestionButtons()}
        </div>
      ) : (
        <div>
          <button onClick={() => toggleQuestions()}>Lista de Exercicios</button>
          {renderQuestionContent()}
        </div>
      )}
    </div>
  );
}
