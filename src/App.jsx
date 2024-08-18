import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";

const H1 = styled.h1`
  color: #333333;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
`;
const StyledApp = styled.div`
  background-color: #f0f0f0;
  padding: 2rem;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The wild oasis</H1>
        <Button onClick={() => alert("check in")}>Check in</Button>
        <Button onClick={() => alert("check out")}>Check out</Button>
        <Input type="number" placeholder="Number of guests" />
      </StyledApp>
    </>
  );
}

export default App;
