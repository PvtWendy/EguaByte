//Define and Export QuestionsState type
export type QuestionsState = {
  questionNumber: number;
  questionArray: Array<{
    title: string;
    questionJSX: React.ReactNode;
    input: Array<Array<number>> | null;
    expectedOutput: string | null;
    additionalCode: string | null;
    defaultCode: string;
    isCompleted: boolean;
    isUnlocked: boolean;
  }>;
};

//Define and Export InitialState
export const initialState: QuestionsState = {
  questionNumber: 0,
  questionArray: [
    {
      title: "Pagina Inicial: Editor Livre",
      questionJSX: (
        <div>
          <h2>Bem-vindo ao ÉguaByte!</h2>
          <p>
            O ÉguaByte é uma plataforma baseada em Delegua que imita o
            HackerRank, onde suas habilidades de programação serão testadas.
          </p>
          <p>
            Cada exercício consiste em uma descrição, o que você terá que fazer,
            um exemplo das entradas que serão fornecidas e um exemplo das saídas
            que devem ser geradas para essa entrada.
          </p>
          <p>
            Sua responsabilidade será criar uma função dentro do template
            fornecido, que irá produzir as respostas corretas usando
            "escreva()".
          </p>
          <p>
            Haverá de 3 automatizados que indicarão se sua função foi feita
            corretamente e apontarão onde estão seus erros. Essa página também
            serve como um editor livre, onde você pode escrever o que quiser, e
            executar no console. Boa sorte!
          </p>
        </div>
      ),
      input: null,
      expectedOutput: null,
      additionalCode: null,
      defaultCode: "escreva('Olá mundo')",
      isCompleted: true,
      isUnlocked: true,
    },
    {
      title: "Exercicio 1: Escrevendo de 1 a 10",
      questionJSX: (
        <p>
          Usando o que você sabe, escreva os números de 1 até 10 dentro da
          função ao lado
        </p>
      ),
      input: null,
      expectedOutput: "1 2 3 4 5 6 7 8 9 10",
      additionalCode: "escreverNumeros();",
      defaultCode: "funcao escreverNumeros(){//escreva sua função aqui};",
      isCompleted: false,
      isUnlocked: true,
    },
  ],
};
