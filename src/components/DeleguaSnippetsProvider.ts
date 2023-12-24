import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';

interface IPrimitiva {
  nome: string;
  documentacao: string;
  exemplo: string;
}

type PrimitivaVetor = IPrimitiva[];

const primitivasVetor: PrimitivaVetor = [
  {
    nome: "mapear",
    documentacao:
      "Percorre um vetor executando uma função para cada item desse mesmo vetor.",
    exemplo: "null",
  },
  {
    nome: "adicionar",
    documentacao:
      "### Descrição \n \n" +
      "Escreve um ou mais argumentos na saída padrão da aplicação." +
      "\n\n ### Exemplo de Código " +
      "\n    v.adicionar(7)    " +
      "\n    v.adicionar(5)    " +
      "\n    v.adicionar(3)    " +
      "\n    escreva(v) // [7, 5, 3]    " +
      "\n \n ### Formas de uso  \n",
    exemplo: "vetor.adicionar(elemento)",
  },
  {
    nome: "concatenar",
    documentacao:
      "### Descrição \n \n" +
      "Adiciona ao conteúdo do vetor um ou mais elementos" +
      "\n\n ### Exemplo de Código " +
      "\n    var v = [7, 5, 3]    " +
      "\n    escreva(v.concatenar([1, 2, 4])) // [7, 5, 3, 1, 2, 4]    " +
      "\n \n ### Formas de uso  \n",
    exemplo: "vetor.concatenar(...argumentos)",
  },
  {
    nome: "empilhar",
    documentacao:
      "### Descrição \n \n" +
      "Adiciona um elemento ao final do vetor." +
      "\n\n ### Exemplo de Código " +
      "\n    var v = []     " +
      "\n    v.empilhar(7)    " +
      "\n    v.empilhar(5)    " +
      "\n    v.empilhar(3)    " +
      "\n    escreva(v) // [7, 5, 3]     " +
      "\n \n ### Formas de uso  \n",
    exemplo: "vetor.empilhar(conteúdo)",
  },
  {
    nome: "fatiar",
    documentacao:
      "### Descrição \n \n" +
      "Extrai uma fatia do vetor, dadas posições de início e fim. \n" +
      "\n\n ### Exemplo de Código " +
      "\n    var v = [1, 2, 3, 4, 5]     " +
      '\n    escreva(v.fatiar()) // "[1, 2, 3, 4, 5]", ou seja, não faz coisa alguma.     ' +
      '\n    escreva(v.fatiar(2, 4)) // "[3, 4]"    ' +
      '\n    escreva(v.fatiar(2)) // "[3, 4, 5]", ou seja, seleciona tudo da posição 3 até o final do vetor.     ' +
      "\n \n ### Formas de uso  \n" +
      "Fatiar suporta sobrecarga do método\n \n",
    exemplo:
      "vetor.fatiar(a partir desta posicao)\n\n" +
      "    vetor.fatiar(a partir desta posicao, ate esta posicao)    ",
  },
  {
    nome: "inclui",
    documentacao:
      "### Descrição \n \n" +
      "Extrai uma fatia do vetor, dadas posições de início e fim. \n" +
      "\n\n ### Exemplo de Código " +
      "\n    var v = [1, 2, 3]    " +
      "\n    escreva(v.inclui(2)) // verdadeiro    " +
      "\n    escreva(v.inclui(4)) // falso    " +
      "\n \n ### Formas de uso  \n",
    exemplo: "vetor.inclui(elemento)",
  },
  {
    nome: "inverter",
    documentacao:
      "### Descrição \n \n" +
      "Inverte a ordem dos elementos de um vetor.\n" +
      "\n\n ### Exemplo de Código " +
      "\n    var v = [1, 2, 3]     " +
      "\n    escreva(v.inverter()) // [3, 2, 1]     " +
      "\n \n ### Formas de uso  \n",
    exemplo: "vetor.inverter()",
  },
  {
    nome: "ordenar",
    documentacao:
      "### Descrição \n \n" +
      "Ordena valores em ordem crescente. Esta função só aceita vetores.\n" +
      "\n\n ### Exemplo de Código " +
      "\n    // A ordenação padrão é ascendente, ou seja, para o caso de números, a ordem fica do menor para o maior.    " +
      "\n    var v = [4, 2, 12, 5]     " +
      "\n    escreva(v.ordenar()) // [2, 4, 5, 12]     " +
      "\n    // Para o caso de textos, a ordenação é feita em ordem alfabética, caractere a caractere.    " +
      '\n    var v = ["aaa", "a", "aba", "abb", "abc"]    ' +
      '\n    escreva(v.ordenar()) // ["a", "aaa", "aba", "abb", "abc"]    ' +
      "\n \n ### Formas de uso  \n",
    exemplo: "vetor.ordenar()",
  },
  {
    nome: "remover",
    documentacao:
      "### Descrição \n \n" +
      "Remove um elemento do vetor caso o elemento exista no vetor.\n" +
      "\n\n ### Exemplo de Código " +
      "\n    var vetor = [1, 2, 3]     " +
      "\n    vetor.remover(2)     " +
      "\n    escreva(vetor) // [1, 3]     " +
      "\n \n ### Formas de uso  \n",
    exemplo: "vetor.remover(elemento)",
  },
  {
    nome: "removerPrimeiro",
    documentacao:
      "### Descrição \n \n" +
      "Remove o primeiro elemento do vetor caso o elemento exista no vetor.\n" +
      "\n\n ### Exemplo de Código " +
      "\n    var vetor = [1, 2, 3]    " +
      "\n    var primeiroElemento = vetor.removerPrimeiro()    " +
      "\n    escreva(primeiroElemento) // 1    " +
      "\n    escreva(vetor) // [2, 3]    " +
      "\n \n ### Formas de uso  \n",
    exemplo: "vetor.removerPrimeiro()",
  },
  {
    nome: "removerUltimo",
    documentacao:
      "### Descrição \n \n" +
      "Remove o último elemento do vetor caso o elemento exista no vetor.\n" +
      "\n\n ### Exemplo de Código " +
      "\n    var vetor = [1, 2, 3]    " +
      "\n    var ultimoElemento = vetor.removerUltimo()    " +
      "\n    escreva(ultimoElemento) // 3    " +
      "\n    escreva(vetor) // [1, 2]    " +
      "\n \n ### Formas de uso  \n",
    exemplo: "vetor.removerUltimo()",
  },
  {
    nome: "somar",
    documentacao:
      "### Descrição \n \n" +
      "Soma ou concatena todos os elementos do vetor (de acordo com o tipo de dados desses elementos) e retorna o resultado.\n" +
      "\n\n ### Exemplo de Código " +
      "\n    var vetor = [1, 2, 3, 4, 5]    " +
      "\n    escreva(vetor.somar()) // 15      " +
      "\n \n ### Formas de uso  \n",
    exemplo: "vetor.somar()",
  },
  {
    nome: "tamanho",
    documentacao:
      "### Descrição \n \n" +
      "Retorna o número de elementos que compõem o vetor.\n" +
      "\n\n ### Exemplo de Código " +
      "\n    var vetor = [0, 1, 2, 3, 4]     " +
      "\n    escreva(vetor.tamanho()) // 5     " +
      "\n \n ### Formas de uso  \n",
    exemplo: "vetor.tamanho()",
  },
  {
    nome: "juntar",
    documentacao:
      "### Descrição \n \n" +
      "Junta os elementos de um vetor em um literal de texto, separando os elementos pelo separados passado como parâmetro.\n" +
      "\n\n ### Exemplo de Código " +
      "\n    var vetor = ['maçã', 'laranja', 'banana', 'morango']     " +
      "\n    escreva(vetor.juntar(', ')) // maçã, laranja, banana, morango      " +
      "\n \n ### Formas de uso  \n",
    exemplo: "vetor.juntar(separador)",
  },
];
const ordenarPrimitivaPorNome = (a: IPrimitiva, b: IPrimitiva) => {
  const nome1 = a.nome.toUpperCase();
  const nome2 = b.nome.toUpperCase();

  if (nome1 > nome2) return 1;
  else if (nome1 < nome2) return -1;
  return 0;
};
type PrimitivaTexto = IPrimitiva[];

const primitivasTexto: PrimitivaTexto = [
  {
    nome: "aparar",
    documentacao:
      "### Descrição \n \n" +
      "Remover espaços em branco no início e no fim de um texto." +
      "\n\n ### Exemplo de Código " +
      '\n    var t = "   meu texto com espaços no início e no fim       "    ' +
      '\n    escreva("|" + t.aparar() + "|") // "|meu texto com espaços no início e no fim|"    ' +
      "\n \n ### Formas de uso  \n",
    exemplo: "texto.aparar()",
  },
  {
    nome: "apararFim",
    documentacao:
      "### Descrição \n \n" +
      "Remover espaços em branco no no fim de um texto." +
      "\n\n ### Exemplo de Código " +
      '\n    var t = "   meu texto com espaços no início e no fim       "    ' +
      '\n    escreva("|" + t.apararFim() + "|") // "|   meu texto com espaços no início e no fim|"    ' +
      "\n \n ### Formas de uso  \n",
    exemplo: "texto.apararFim()",
  },
  {
    nome: "apararInicio",
    documentacao:
      "### Descrição \n \n" +
      "Remover espaços em branco no início e no fim de um texto." +
      "\n\n ### Exemplo de Código " +
      '\n    var t = "   meu texto com espaços no início e no fim       "    ' +
      '\n    escreva("|" + t.apararInicio() + "|") // "|meu texto com espaços no início e no fim       |"    ' +
      "\n \n ### Formas de uso  \n",
    exemplo: "texto.apararInicio()",
  },
  {
    nome: "concatenar",
    documentacao:
      "### Descrição \n \n" +
      "Realiza a junção de palavras/textos." +
      "\n\n ### Exemplo de Código " +
      '\n    var t1 = "um"     ' +
      '\n    var t2 = "dois três"    ' +
      '\n    escreva(t1.concatenar(t2)) // "umdois três"    ' +
      "\n \n ### Formas de uso  \n",
    exemplo: "texto.concatenar(Outro texto)",
  },
  {
    nome: "dividir",
    documentacao:
      "### Descrição \n \n" +
      "Divide o texto pelo separador passado como parâmetro." +
      "\n\n ### Exemplo de Código " +
      '\n    var t = "um dois três"    ' +
      "\n    t.dividir(' ') // ['um','dois','três']    " +
      "\n \n ### Formas de uso  \n",
    exemplo: "texto.dividir('<delimitador (, ; ' ')>')",
  },
  {
    nome: "fatiar",
    documentacao:
      "### Descrição \n \n" +
      "Extrai uma fatia do texto, dadas posições de início e fim." +
      "\n\n ### Exemplo de Código " +
      '    var t = "Um dois três quatro"    ' +
      '\n    t.fatiar() // "um dois três quatro", ou seja, não faz coisa alguma.    ' +
      '\n    t.fatiar(2, 7) // "dois"    ' +
      '\n    t.fatiar(8, 12) // "três"    ' +
      '\n    t.fatiar(8) // "três quatro", ou seja, seleciona tudo da posição 8 até o final do texto.    ' +
      "\n \n ### Formas de uso  \n",
    exemplo:
      "texto.fatiar(início,final)" +
      "\n    texto.fatiar(a partir da posicao)    ",
  },
  {
    nome: "inclui",
    documentacao:
      "### Descrição \n \n" +
      "Devolve verdadeiro se elemento passado por parâmetro está contido no texto, e falso em caso contrário." +
      "\n\n ### Exemplo de Código " +
      '\n    var t = "um dois três"    ' +
      '\n    t.inclui("dois") // verdadeiro    ' +
      '\n    t.inclui("quatro") // falso    ' +
      "\n \n ### Formas de uso  \n",
    exemplo: "texto.inclui('palavra')",
  },
  {
    nome: "maiusculo",
    documentacao:
      "### Descrição \n \n" +
      "Converte todos os caracteres alfabéticos para maiúsculas." +
      "\n\n ### Exemplo de Código " +
      '\n    var t = "tudo em minúsculo"    ' +
      '\n    escreva(t.maiusculo()) // "TUDO EM MINÚSCULO"    ' +
      "\n \n ### Formas de uso  \n",
    exemplo: "texto.maiusculo()",
  },
  {
    nome: "minusculo",
    documentacao:
      "### Descrição \n \n" +
      "Converte todos os caracteres alfabéticos para minúsculas." +
      "\n\n ### Exemplo de Código " +
      '\n    var t = "TUDO EM MAIÚSCULO"    ' +
      '\n    escreva(t.minusculo()) // "tudo em maiúsculo"    ' +
      "\n \n ### Formas de uso  \n",
    exemplo: "texto.minusculo()",
  },
  {
    nome: "substituir",
    documentacao:
      "### Descrição \n \n" +
      "Substitui a primeira ocorrência no texto do primeiro parâmetro pelo segundo parâmetro." +
      "\n\n ### Exemplo de Código " +
      '\n    var t = "Eu gosto de caju"    ' +
      '\n    t.substituir("caju", "graviola") // Resultado será "Eu gosto de graviola"    ' +
      "\n \n ### Formas de uso  \n",
    exemplo: "texto.substituir('palavra a ser substituída', 'nova palavra')",
  },
  {
    nome: "subtexto",
    documentacao:
      "### Descrição \n \n" +
      "Extrai uma fatia do texto, dadas posições de início e fim." +
      "\n\n ### Exemplo de Código " +
      '\n    var t = "Eu gosto de caju e de graviola"    ' +
      '\n    t.subtexto(3, 16) // Resultado será "gosto de caju"    ' +
      "\n \n ### Formas de uso  \n",
    exemplo: "texto.subtexto(posição inicial, posição final)",
  },
  {
    nome: "tamanho",
    documentacao:
      "### Descrição \n \n" +
      "Devolve um número inteiro com o número de caracteres do texto." +
      "\n\n ### Exemplo de Código " +
      '\n    var t = "Um dois três quatro"    ' +
      "\n    t.tamanho() // 19    " +
      "\n \n ### Formas de uso  \n",
    exemplo: "texto.tamanho()",
  },
];
type MetodosBibliotecaGlobal = IPrimitiva[];

const metodosBibliotecaGlobal: MetodosBibliotecaGlobal = [
  {
    nome: "escreva",
    documentacao:
      "Escreve um ou mais argumentos na saída padrão da aplicação. \n" +
      "## Interpolação \n" +
      "Delégua suporta interpolação de variáveis: \n \n" +
      "    var comidaFavorita = 'strogonoff'     \n" +
      '    escreva("Minha comida favorita é ${comidaFavorita}")     ',
    exemplo: "função escreva(...argumentos)",
  },
  {
    nome: "filtrarPor",
    documentacao:
      "### Descrição \n \n" +
      "Retorna uma lista de elementos filtrados de um vetor." +
      "\n\n ### Exemplo de Código " +
      "\n    javascript var listaDeIdades = [91, 32, 15, 44, 12, 18, 101];     " +
      "\n    funcao checarIdade(idade) { retorna(idade >= 18); }    " +
      "\n    escreva(filtrarPor(listaDeIdades, checarIdade)); // [91, 32, 44, 18, 101]     " +
      +"\n\n     " +
      "\n \n ### Formas de uso  \n",
    exemplo: "filtrarPor(meuVetor, minhaFuncaoParaValidar)",
  },
  {
    nome: "texto",
    documentacao:
      "### Descrição \n \n" +
      "Transforma números flutuantes ou inteiros em texto." +
      "\n\n ### Exemplo de Código " +
      "\n    texto(7)    " +
      "\n \n ### Formas de uso  \n",
    exemplo: "texto(1234)",
  },
  {
    nome: "aleatorio",
    documentacao:
      "### Descrição \n \n" +
      "Retorna um número aleatório entre 0 e 1." +
      "\n\n ### Exemplo de Códig  o " +
      "\n    var numeroAleatorio = aleatorio();    " +
      "\n    escreva(numeroAleatorio);    " +
      "\n    // 0.8540051495195808    " +
      "\n \n ### Formas de uso  \n",
    exemplo: "aleatorio()",
  },
  {
    nome: "aleatorioEntre",
    documentacao:
      "### Descrição \n \n" +
      "Retorna um número inteiro aleatório entre os valores passados para a função." +
      "\n\n ### Exemplo de Código " +
      "\n    var numeroAleatorio = aleatorioEntre(1, 9);    " +
      "\n    escreva(numeroAleatorio); // Retornará um valor entre 1 e 8.    " +
      "\n \n ### Formas de uso  \n",
    exemplo: "aleatorioEntre(numero minimo, numero maximo)",
  },
  {
    nome: "inteiro",
    documentacao:
      "### Descrição \n \n" +
      "Converte um número flutuante ou texto, que não apresente letras, em um número inteiro." +
      "\n\n ### Exemplo de Código " +
      '\n    var testeTexto = "111";    ' +
      "\n    escreva(111 + inteiro(testeTexto));    " +
      "\n    // 222    " +
      "\n \n ### Formas de uso  \n",
    exemplo: 'inteiro("123")',
  },
  {
    nome: "real",
    documentacao:
      "### Descrição \n \n" +
      "Converte um número inteiro ou texto, que não apresente letras, em um número flutuante." +
      "\n\n ### Exemplo de Código " +
      '\n    var testeTexto = "504.69";    ' +
      "\n    escreva(0.01 + real(testeTexto));    " +
      "\n    // 504.7    " +
      "\n \n ### Formas de uso  \n",
    exemplo: "real(texto)",
  },
];
type PrimitivaNumero = IPrimitiva[];

const primitivasNumero: PrimitivaNumero = [];
const primitivas = [
  ...primitivasNumero,
  ...primitivasTexto,
  ...primitivasVetor,
  ...metodosBibliotecaGlobal,
].sort(ordenarPrimitivaPorNome);
const deleguaCodeSnippets = [
  {
    prefix: "para",
    body: [
      "para (var ${1:i} = 0; ${1:i} < 5; ${1:i} = ${1:i} + 1) {",
      "\tescreva(${1:i});",
      "}",
    ],
    description: 'Laço de repetição "para"',
  },
  {
    prefix: "fazer enquanto",
    body: [
      "$var i = 0;",
      "$fazer { ",
      "\tescreva(i);",
      "\ti = i + 1;",
      "} enquanto(i < 5)",
    ],
    description: 'Laço de repetição "fazer-enquanto"',
  },
  {
    prefix: "funcao padrao",
    body: ["funcao ${1:nome}() {", '\tescreva("sim!");', "}"],
    description: 'Declaração de "funcao-padrao"',
  },
  {
    prefix: "funcao anonima",
    body: [
      "var ${1:nome} = funcao(${2:variavel}) {",
      "\tretorna ${2:variavel};",
      "}",
    ],
    description: 'Declaração de "funcao-padrao"',
  },
  {
    prefix: "se",
    body: ["se (${1:condicao}) {", "\tescreva('sim');", "}"],
    description: 'Declaração de "se"',
  },
  {
    prefix: "se senao",
    body: [
      "se (${1:condicao}) {",
      "\tescreva('correspondente 1');",
      "} senao {",
      "\tescreva('correspondente 2');",
      "}",
    ],
    description: 'Declaração "se-senao"',
  },
  {
    prefix: "se senaose senao",
    body: [
      "se (${1:condicao1}) {",
      "\t$escreva('correspondente 1');",
      "} senao se (${2:condicao2}) {",
      "\tescreva('correspondente 2');",
      "} senao {",
      "\tescreva('sem valor correspondente');",
      "}",
    ],
    description: 'Declaração "se-senaose-senao"',
  },
  {
    prefix: "escolha",
    body: [
      "escolha (${1:chave}) {",
      "\tcaso ${2:valor}:",
      '\t\tescreva("Olá Mundo!");',
      "\tpadrao:",
      '\t\tescreva("Valor padrão!");',
      "}",
    ],
    description: 'Declaração "escolha"',
  },
  {
    prefix: "tente pegue",
    body: [
      "tente {",
      '\tescreva("sucesso");',
      "} pegue {",
      '\tescreva("pegue");',
      "}",
    ],
    description: 'Declaração "tente-pegue"',
  },
  {
    prefix: "tente pegue finalmente",
    body: [
      "tente {",
      '\tescreva("sucesso");',
      "} pegue {",
      '\tescreva("pegue");',
      "} finalmente {",
      '\tescreva("pronto");',
      "}",
    ],
    description: 'Declaração "tente-pegue-finalmente"',
  },
];

export const deleguaCompletionProvider: monaco.languages.CompletionItemProvider =
  {
    provideCompletionItems: (
      model: monaco.editor.ITextModel,
      position: monaco.Position,
      context: monaco.languages.CompletionContext,
      token: monaco.CancellationToken
    ) => {
      const formatoPrimitivas = primitivas
        .filter((p) => p.exemplo)
        .map(({ nome, exemplo }) => {
          return {
            label: nome,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: exemplo,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: new monaco.Range(
              position.lineNumber,
              position.column,
              position.lineNumber,
              position.column
            ),
          };
        });

      const formatoSnippets = deleguaCodeSnippets?.map(
        ({ prefix, body, description }) => {
          return {
            label: prefix,
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: body.join("\n"),
            documentation: description,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: new monaco.Range(
              position.lineNumber,
              position.column,
              position.lineNumber,
              position.column
            ),
          };
        }
      );

      const sugestoes = [...formatoPrimitivas, ...formatoSnippets];
      return { suggestions: sugestoes };
    },
  };
