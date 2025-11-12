import Count from "./components/Count";
import Greeting from "./components/Greeting";
import Profile from "./components/Profile";
import Messanger from "./components/Messanger";
import Timer from "./components/Timer";
import Navbar from "./components/Navbar";

function App() {
  const hobbies = ["Coding", "Programming", "English Learning"]
  const messager = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. A nobis, iste error cum similique laudantium ad laborum. Reprehenderit, tenetur esse."

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "40px", padding:'15px' }}>
        <h1>🚀 React + TypeScript Setup Successful!</h1>
        <p>Welcome, Hassnain! Let's start our Full Stack Journey!</p>
        <Greeting name="Hassnain Ali" age={17} />
        <Profile name={"Hassnain"} heading="My Hobbies:" hobbies={hobbies} />
        <Count />
        <Messanger messager={messager} />
        <Timer />
      </div>
    </>
  );
}
export default App;