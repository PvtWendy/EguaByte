import React, { createContext, useContext, useReducer, ReactNode } from "react";

//Define the context type
type QuestionsState = {
  value: string;
};
//Define the action type
type Action = {
  type: string;
};
//Create the context
const QuestionsContext = createContext<{ questions: QuestionsState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

//Create the context hook
export const useQuestions = () => {
  const context = useContext(QuestionsContext);
  if (!context) {
    throw new Error('useQuestions must be used within a QuestionsProvider');
  }
  return context;
};

//Define the provider props type
type QuestionsProviderProps = {
  children: ReactNode;
};

//Define the provider
export const QuestionsProvider: React.FC<QuestionsProviderProps> = ({ children }) => {

  //Define the initial state
  const initialState: QuestionsState = {
    value: "none",
  };

  //Define the reducer
  const reducer = (state: QuestionsState, action: Action): QuestionsState => {
    switch (action.type) {
      case "ChangeCurrentQuestion1":
        return { value: "Question 1" };
      case "ChangeCurrentQuestion2":
        return { value: "Question 2" };
      case "ChangeCurrentQuestion3":
        return { value: "Question 3" };
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