import StartScreen from "./StartScreen";

export const metadata = {
  title: "Questionnaire - FVAI Business",
};

export default async function Questionnaire() {
  return (
    <div className="pt-10 lg:pt-10">
      <StartScreen />
    </div>
  );
}
