import { useState } from "react";


function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
            <h2>Count: {count}</h2>
            <button style={{backgroundColor: "green"}} onClick={() => setCount(count + 1)}>Increment</button>
            <button style={{backgroundColor: "red"}} onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
    )
}
export default Counter;