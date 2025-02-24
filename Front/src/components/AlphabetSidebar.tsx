
interface AlphabetSidebarProps {
  onSelectLetter: (letter: string) => void;
  selectedLetter: string;
}

const AlphabetSidebar = ({ onSelectLetter, selectedLetter }: AlphabetSidebarProps) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div
      className="fixed top-0 left-0 w-16 h-screen overflow-y-auto
                 bg-white/70 backdrop-blur-md shadow-md p-2 custom-scrollbar"
      style={{
        scrollbarWidth: "thin",
      }}
    >
    

      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => onSelectLetter(letter)}
          className={`
            block w-8 h-8 flex items-center justify-center mb-2 rounded-full text-lg font-semibold
            transition-all duration-200 
            ${
              selectedLetter === letter
                ? "bg-blue-400 text-sm text-white scale-110 shadow-md"
                : "bg-gray-100 text-gray-800 text-lg hover:bg-blue-200 hover:scale-105"
            }
          `}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default AlphabetSidebar;
