
import { RiSunLine, RiMoonClearLine, RiKeyboardLine } from "react-icons/ri";
import { useTheme } from "../context/ThemeContext";

function Header({ onOpenShortcuts }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="d-flex align-items-center justify-content-between mb-4">
      <div className="flex-grow-1 text-center">
        <h1 className="head mb-0">TODO APP</h1>
      </div>
      <div className="d-flex align-items-center gap-2">
        {onOpenShortcuts && (
          <button
            type="button"
            className="btn btn-outline-secondary d-flex align-items-center justify-content-center p-2 rounded-circle"
            onClick={onOpenShortcuts}
            title="Keyboard shortcuts (?)"
            aria-label="Keyboard shortcuts"
          >
            <RiKeyboardLine size={19} />
          </button>
        )}
        <button
          type="button"
          className="btn btn-outline-secondary d-flex align-items-center justify-content-center p-2 rounded-circle"
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? <RiSunLine size={20} className="text-warning" /> : <RiMoonClearLine size={20} />}
        </button>
      </div>
    </div>
  );
}

export default Header;
