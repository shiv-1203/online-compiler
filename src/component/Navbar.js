import { useState } from "react";
import "../styles/Navbar.css";
import Select from 'react-select';
import logo from '../images/logo.png';

export default function Navbar({ userLang, setUserLang, userTheme,
    setUserTheme, fontSize, setFontSize }) {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const languages = [
        { value: "c", label: "C" },
        { value: "cpp", label: "C++" },
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
    ];
    const themes = [
        { value: "vs-dark", label: "Dark" },
        { value: "light", label: "Light" },
    ]

    return (
        <nav className="navigation">
            <img className="logo" src={logo} />
            <a href="/" className="brand-name">
                CodeCanvas
            </a>
            <button
                className="hamburger"
                onClick={() => {
                    setIsNavExpanded(!isNavExpanded)
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="white"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div
                className={
                    isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
                }
            >
                <ul>
                    <li>
                        <a>
                            <Select options={languages} value={userLang}
                                onChange={(e) => setUserLang(e.value)}
                                placeholder={userLang} />
                        </a>
                    </li>
                    <li>
                        <a>
                            <Select options={themes} value={userTheme}
                                onChange={(e) => setUserTheme(e.value)}
                                placeholder={userTheme} />
                        </a>
                    </li>
                    <li>
                        <div className="font-rover">
                            <label style={{color:"white", paddingRight:"5px"}}>Font Size</label>
                            <input type="range" min="18" max="30"
                                value={fontSize} step="2"
                                onChange={(e) => { setFontSize(e.target.value) }} />
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}