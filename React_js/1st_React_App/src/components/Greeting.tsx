type GreetingProps = {
  name: string;
  age: number;
};

function Greeting({ name, age }: GreetingProps) {
  return (
    <div>
      <h2>Hello, {name}! 👋</h2>
      <p>I am {age} years old.</p>
    </div>
  );
}

export default Greeting;
