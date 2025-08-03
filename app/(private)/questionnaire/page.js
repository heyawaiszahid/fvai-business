import StartScreen from "./StartScreen";

export const metadata = {
  title: "Questionnaire - FVAI Business",
};

export default async function Questionnaire() {
  return (
    <div className="pt-10 pb-10 lg:pt-10 lg:pb-20">
      <StartScreen />
    </div>
  );
}
