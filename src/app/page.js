import Canvas from "./canvas";
import Customize from "./pages/Customize";
import Main from "./pages/Main";


export default function Home() {
  return (
      <main className="app transition-all ease-in">
        <Main />
        <Canvas />
        <Customize />
      </main>
  );
}
