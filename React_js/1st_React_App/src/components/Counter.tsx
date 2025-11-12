import { useState, useEffect } from "react";

function Timer() {
    const [count, setCount] = useState(0);
    

    useEffect(() => {
        const interval = setInterval(() => setCount((prevCount) => prevCount + 1), 1000);
        return () => clearInterval(interval); // cleanup
    }, []);

    return (<h1>Timer: {count}</h1>);
}

export default Timer;
