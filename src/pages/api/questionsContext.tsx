import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { QuestionsState, initialState } from "./initialState";

//Define the action type
type Action = {
  type: string;
  payload?: number;
};

//Create the context
const QuestionsContext = createContext<
  { questions: QuestionsState; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

//Create the context hook
export const useQuestions = () => {
  const context = useContext(QuestionsContext);
  if (!context) {
    throw new Error("useQuestions must be used within a QuestionsProvider");
  }
  return context;
};

//Define the provider props type
type QuestionsProviderProps = {
  children: ReactNode;
};

//Define the provider
export const QuestionsProvider: React.FC<QuestionsProviderProps> = ({
  children,
}) => {
  //Define the reducer
  const reducer = (state: QuestionsState, action: Action): QuestionsState => {
    switch (action.type) {
      case "ChangeCurrentQuestion":
        return { ...state, questionNumber: action.payload || 0 };
      case "UpdateQuestionStatus":
        const updatedQuestions = state.questionArray.map((question, index) => {
          console.log(state)
          if (index === state.questionNumber) {
            return { ...question, isCompleted: true };
          } else if (index === state.questionNumber + 1) {
            return { ...question, isUnlocked: true };
          } else {
            return question;
          }
        });

        return { ...state, questionArray:   updatedQuestions };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  //Return the provider
  return (
    <QuestionsContext.Provider value={{ questions: state, dispatch }}>
      {children}
    </QuestionsContext.Provider>
  );
};
