import { useAuth } from "@/hooks/context/useAuth";
import { useState } from "react";

function DashboardPage() {
  const [count, setCount] = useState(0);
  const { auth } = useAuth()

  function handleAlertClick() {
    setTimeout(() => {
      alert("You clicked on: " + count);
    }, 1000);
  }
console.log({auth})
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>/*/-*/-*/-*/-*/-*
      <button onClick={handleAlertClick}>Show alert</button>
      <pre>{JSON.stringify({ auth }, null, 2)}</pre>
    </div>
  );
}

export default DashboardPage