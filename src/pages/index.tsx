import EguaEditor from "@/components/EguaEditor";
import Questions from "@/components/Questions";

//TODO: Make a global state to control which exercise is currently being used.
//TODO: Make exercises be tested by "EguaEditor" based on which Question is currently used
//TODO: Make a button to run the exercise
//TODO: Make a button to reset the exercise
//TODO: Make a button to change the exercise


export default function Home() {
  return (
    <>
      <main>
        <Questions></Questions>
        <EguaEditor></EguaEditor>
      </main>
    </>
  );
}
