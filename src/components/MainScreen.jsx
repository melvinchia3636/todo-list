import Navbar from "./Navbar";
import TodoList from "./TodoList";

function MainScreen({ user }) {
  if (user === null) {
    return <></>;
  }
  return (
    <div className="w-full h-full">
      <Navbar user={user} />
      <TodoList user={user} />
    </div>
  );
}

export default MainScreen;
