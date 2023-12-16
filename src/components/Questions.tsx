import { useState } from "react";

export default function Questions() {
  const [menuState, setMenuState] = useState(false);
  const toggleQuestions = (): void => {
    setMenuState(!menuState);
  };
  return (
    <div className="questions">
      {!menuState ? (
        <div>
          <button onClick={() => toggleQuestions()}>Voltar</button>
          <button>
            Exercicio 1: <br />
            Soma Maior e Menor
          </button>
          <button>
            Exercicio 2: <br />
            Números Positivos e Negativos
          </button>
          <button>
            Exercicio 3: <br />
            Inteiro Solitário
          </button>
        </div>
      ) : (
        <div>
          <button onClick={() => toggleQuestions()}>Lista de Exercicios</button>
        </div>
      )}
    </div>
  );
}
