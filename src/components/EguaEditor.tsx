import Editor from '@monaco-editor/react';

const EguaEditor = () => {
  return (
    <div>
      <Editor
        height="100vh"
        width="100vw"
        theme='vs-dark'
        defaultLanguage="javascript"
        defaultValue="// Start coding here..."
      />
    </div>
  );
}

export default EguaEditor;





