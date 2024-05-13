import { Routes, Route, Navigate } from "react-router-dom";

import styled from "styled-components";
import News from "./pages/news";

function App() {
  return (
    <Container>
      <InnerContainer>
        <Routes>
          <Route index element={<Navigate to="news" replace />} />
          <Route path="news/*" element={<News />} />
          {/* <Route path="auth/*" element={<Auth />} /> */}
        </Routes>
      </InnerContainer>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InnerContainer = styled.div`
  display: flex;
  width: 95%;
`;
