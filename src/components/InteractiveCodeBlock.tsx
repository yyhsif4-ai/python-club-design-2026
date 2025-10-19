import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";

const InteractiveCodeBlock = () => {
  const [code, setCode] = useState('print("Hello, Python Club!")');
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      if (code.includes('print(')) {
        const match = code.match(/print\((.*?)\)/);
        if (match && match[1]) {
          const printContent = match[1].replace(/["']/g, '');
          setOutput(`>>> ${printContent}`);
        }
      } else {
        setOutput(">>> Hello, Python Club!");
      }
      setIsRunning(false);
    }, 500);
  };

  const resetCode = () => {
    setCode('print("Hello, Python Club!")');
    setOutput("");
  };

  return (
    <div className="relative">
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-3xl"></div>
      
      <div className="relative glass rounded-2xl overflow-hidden border border-primary/20">
        {/* Code Editor Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-success"></div>
          </div>
          <span className="text-xs text-muted-foreground font-mono">main.py</span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetCode}
              className="h-7 px-2"
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="p-6 space-y-4">
          <div className="relative">
            <div className="absolute left-0 top-3 text-muted-foreground font-mono text-sm">1</div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-transparent text-foreground font-mono text-sm pl-8 pr-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
              rows={2}
            />
          </div>

          {/* Run Button */}
          <Button
            variant="hero"
            size="sm"
            onClick={runCode}
            disabled={isRunning}
            className="w-full"
          >
            <Play className="w-4 h-4" />
            {isRunning ? "Выполняется..." : "Запустить код"}
          </Button>

          {/* Output */}
          {output && (
            <div className="mt-4 p-4 bg-success/10 border border-success/30 rounded-lg animate-fade-in-up">
              <div className="text-xs text-success/70 mb-2 font-mono">OUTPUT:</div>
              <div className="text-success font-mono text-sm">{output}</div>
            </div>
          )}
        </div>

        {/* Subtle shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default InteractiveCodeBlock;
