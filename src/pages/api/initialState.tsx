//Define and Export QuestionsState type
export type QuestionsState = {
  questionNumber: number;
  questionArray: Array<{
    title: string;
    questionJSX: React.ReactNode;
    input: Array<string> | null;
    expectedOutput: Array<string> | null;
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
      title: "Exercicio 1: Contagem de 1 até 10",
      questionJSX: (
        <div>
          <p>
            Usando o que você aprendeu até agora, faça a função ao lado escrever
            os números de 1 a 10
          </p>
        </div>
      ),
      input: null,
      expectedOutput: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      additionalCode: "escreverNumeros();",
      defaultCode: `
funcao escreverNumeros(){
    // Escreva sua função aqui

}
      `,
      isCompleted: false,
      isUnlocked: true,
    },
    {
      title: "Exercício 2: Filtrar Números Negativos",
      questionJSX: (
        <div>
          <p>
            Crie uma função que recebe um array de números positivos e negativos
            e escreve, em uma única linha, os números negativos presentes no
            array.
          </p>
          <p>Exemplo</p>
          <p>Entrada: 3, -2, 7, -5, 8</p>
          <p>Saida: -2 -5</p>
        </div>
      ),
      input: ["3, -2, 7, -5, 8", "1, -3, 5, -7, 9", "-2, 4, -6, 8, -10"],
      expectedOutput: ["-2 -5", "-3 -7", "-2 -6 -10"],
      additionalCode:
        "escreverNegativos([3, -2, 7, -5, 8]);escreverNegativos([1, -3, 5, -7, 9]);escreverNegativos([-2, 4, -6, 8, -10]);",
      defaultCode: `
    funcao escreverNegativos(numeros){
        // Escreva sua função aqui
    
    }
      `,
      isCompleted: false,
      isUnlocked: false,
    },
    {
      title: "Exercício 3: Inverter uma String",
      questionJSX: (
        <div>
          <p>
            Crie uma função que recebe uma string como entrada e retorna a
            string invertida.
          </p>
          <p>Exemplo:</p>
          <p>Entrada: "abcde"</p>
          <p>Saída: "edcba"</p>
        </div>
      ),
      input: ['abcde', 'hello', 'world'],
      expectedOutput: ['edcba', 'olleh', 'dlrow'],
      additionalCode: "inverterString('abcde');inverterString('hello');inverterString('world');",
      defaultCode: `
     funcao inverterString(str){
         // Escreva sua função aqui
     
     }
        `,
      isCompleted: false,
      isUnlocked: false,
    },
    {
      title: "Exercício 4: Contar Palavras em uma Frase",
      questionJSX: (
        <div>
          <p>
            Crie uma função que recebe uma frase como entrada e conta o número
            de palavras na frase.
          </p>
          <p>Exemplo:</p>
          <p>Entrada: "Olá, como vai?"</p>
          <p>Saída: 3</p>
        </div>
      ),
      input: ['Olá, como vai?', 'Isso é um exemplo.', 'Conte as palavras nesta frase.'],
      expectedOutput: ["3", "4", "5"],
      additionalCode: "contarPalavras('Olá, como vai?');contarPalavras('Isso é um exemplo.');contarPalavras('Conte as palavras nesta frase.');",
      defaultCode: `
     funcao contarPalavras(frase){
         // Escreva sua função aqui
     
     }
        `,
      isCompleted: false,
      isUnlocked: false,
    },
    {
      title: "Exercício 5: Encontrar o Elemento Único",
      questionJSX: (
        <div>
          <p>
            Dado um array de inteiros, onde todos os elementos, exceto um,
            ocorrem duas vezes, encontre o elemento único.
          </p>
          <p>Exemplo:</p>
          <p>Entrada: 1 2 3 1 2</p>
          <p>Saída: 3</p>
        </div>
      ),
      input: ["1 2 3 1 2", "4 5 4 6 6", "7 8 9 8 7"],
      expectedOutput: ["3", "5", "9"],
      additionalCode: "encontrarElementoUnico([1, 2, 3, 1, 2]);encontrarElementoUnico([4, 5, 4, 6, 6]);encontrarElementoUnico([7, 8, 9, 8, 7]);",
      defaultCode: `
     funcao encontrarElementoUnico(array){
         // Escreva sua função aqui
     
     }
        `,
      isCompleted: false,
      isUnlocked: false,
    },

  ],
};
