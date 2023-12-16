import { useQuestions } from "@/pages/api/questionsContext";
import { useEffect, useState } from "react";

export default function Questions() {
  const [menuState, setMenuState] = useState(false);
  const { questions, dispatch } = useQuestions();

  const toggleQuestions = (): void => {
    setMenuState(!menuState);
  };

  const handleButtonClick = (questionNum: number): void => {
    dispatch({ type: `ChangeCurrentQuestion${questionNum}` });
    toggleQuestions();
  };

  useEffect(() => {
    console.log("Questions state updated:", questions);
  }, [questions]);

  const renderQuestionContent = () => {
    switch (questions.value) {
      case "Question 1":
        return (
          <div>
            <p>
              Dados cinco números positivos, você precisa encontrar a soma
              mínima e máxima possível ao somar exatamente quatro desses cinco
              números. Em seguida, imprima os valores mínimo e máximo como dois
              inteiros longos separados por espaço.
            </p>
            <p>Exemplo:</p>
            <p>Entrada: 1 2 3 4 5</p>
            <p>Saída: 10 14</p>
          </div>
        );
      case "Question 2":
        return (
          <div>
            <p>
              Dado um array de inteiros, calcule as proporções dos elementos que
              são positivos, negativos e zero. Imprima o valor decimal de cada
              fração em uma nova linha com 6 casas decimais.
            </p>
            <p>Exemplo:</p>
            <p>Entrada: -4 3 -9 0 4 1</p>
            <p>Saída:</p>
            <p>0.500000</p>
            <p>0.333333</p>
            <p>0.166667</p>
          </div>
        );
      case "Question 3":
        return (
          <div>
            <p>
              Dado um array de inteiros, onde todos os elementos, exceto um,
              ocorrem duas vezes, encontre o elemento único.
            </p>
            <p>Exemplo:</p>
            <p>Entrada: 1 2 3 1 2</p>
            <p>Saída: 3</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="questions">
      {!menuState ? (
        <div>
          <button onClick={() => toggleQuestions()}>Voltar</button>
          <button onClick={() => handleButtonClick(1)}>
            Exercicio 1: <br />
            Soma Maior e Menor
          </button>
          <button onClick={() => handleButtonClick(2)}>
            Exercicio 2: <br />
            Números Positivos e Negativos
          </button>
          <button onClick={() => handleButtonClick(3)}>
            Exercicio 3: <br />
            Inteiro Solitário
          </button>
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
