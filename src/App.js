import './App.css';
import Navbar from './component/Navbar';
import { useEffect, useState } from 'react';
import Editor from "@monaco-editor/react";
import ClipLoader from "react-spinners/ClipLoader";
import Axios from 'axios';

function App() {
  // State variable to set users source code
  const [userCode, setUserCode] = useState(``);

  // State variable to set editors default language
  const [userLang, setUserLang] = useState("cpp");

  // State variable to set editors default theme
  const [userTheme, setUserTheme] = useState("vs-dark");

  // State variable to set editors default font size
  const [fontSize, setFontSize] = useState(20);

  // State variable to set users input
  const [userInput, setUserInput] = useState("");

  // State variable to set users output
  const [userOutput, setUserOutput] = useState("");

  const [defaultValue, setDefaultValue] = useState('');

  // Loading state variable to show spinner
  // while fetching data
  const [loading, setLoading] = useState(false);

  const options = {
    fontSize: fontSize
  }

  // Function to call the compile endpoint
  function compile() {
    setLoading(true);
    if (userCode === ``) {
      return
    }

    // Post request to compile endpoint
    Axios.post(`https://online-compiler-fu07.onrender.com/api/postCode`, {
        code: userCode,
        language: userLang,
        input: userInput
    }).then((res) => {
        setUserOutput(res.data.output);
    }).then(() => {
        setLoading(false);
    })
  }

  // Function to clear the output screen
  function clearOutput() {
    setUserOutput("");
  }

  // setting different default values for different languages

  useEffect(() => {
    // Update defaultValue based on userLang
    switch (userLang) {
      case 'cpp':
        setDefaultValue("#include <iostream>\n" +
          "\n" +
          "using namespace std;\n" +
          "\n" +
          "int main()\n" +
          "{\n" +
          "    // Enter your code here\n" +
          "    return 0;\n" +
          "}\n");
        break;
      case 'python':
        setDefaultValue('# Enter your python code here');
        break;
      case 'c':
        setDefaultValue("#include <stdio.h>\n" +
          "\n" +
          "int main()\n" +
          "{\n" +
          "    // Enter your code here\n" +
          "    return 0;\n" +
          "}\n");
        break;
      case 'java':
        setDefaultValue("public class Main\n" +
          "{\n" +
          "    public static void main(String[] args) {\n" +
          "       // Enter your code here\n" +
          "    }\n" +
          "}\n");
        break;
      // Add more cases for other languages
      default:
        setDefaultValue('');
    }
  }, [userLang]);

  return (
    <div className="App">
      <Navbar
        userLang={userLang} setUserLang={setUserLang}
        userTheme={userTheme} setUserTheme={setUserTheme}
        fontSize={fontSize} setFontSize={setFontSize}
      />
      <div className='main'>
        <div className="left-container">
          <Editor
            options={options}
            height="500px"
            width="100%"
            theme={userTheme}
            language={userLang}
            defaultLanguage="cpp"
            value={defaultValue}
            onChange={(value) => { setUserCode(value) }}
          />
          <button className={
            userTheme === "vs-dark" ? "run-btn-dark" : "run-btn-light"
          }
            onClick={() => compile()}>
            Run
          </button>
        </div>
        <div className={
          userTheme === "vs-dark" ? "right-container-dark" : "right-container-light"}>
          <div className='border-input-output'>
            <h3 className={
              userTheme === "vs-dark" ? "title-dark" : "title-light"
            }>Input:</h3>
            <div className="input-box">
              <textarea id={
                userTheme === "vs-dark" ? "code-inp-dark" : "code-inp-light"}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter your input here...">
              </textarea>
            </div>
          </div>
          <div className='border-input-output'>
            <h3 className={
              userTheme === "vs-dark" ? "title-dark" : "title-light"
            }>Output:</h3>
            {loading ? (
              <ClipLoader color="#00BFFF" loading={true} size={100} />
            ) : (
              <div className={userTheme === "vs-dark" ? "output-box-dark" : "output-box-light"}>
                <pre>{userOutput}</pre>
                <button onClick={() => { clearOutput() }}
                  className={userTheme === "vs-dark" ? "clear-btn-dark" : "clear-btn-light"}>
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
