import "./App.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import {
  ChakraProvider, theme,
  ColorModeProvider,
  CSSReset, 
} from "@chakra-ui/react";
import ThemeToggler from "./components/ThemeToggler";
import TaskPage from "./pages/TaskPage";
import Taskedit from "./pages/Taskedit";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider >
        <CSSReset />
        <ThemeToggler />
        <Routes>
          <Route path="/" element={<TaskPage />} />
          <Route path="/edittask/:taskID" element={<Taskedit />} />
        </Routes>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
