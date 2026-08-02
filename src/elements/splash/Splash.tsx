import { type ReactNode, useEffect, useState } from 'react';
import clsx from 'clsx';

import * as Style from './Splash.module.scss';

// Feature Toggle: Set to false to return to original blank splash & 400ms loading behavior
export const ENABLE_CONSOLE_ANIMATION = false;

// Terminal Configuration Constants
const PROMPT_USER = 'pflanagan';
const PROMPT_HOST = 'terminal';
const COMMAND_NAME = './peter-flanagan-resume.exe';
const TYPING_SPEED_MS = 18;

type ConsoleStepType = 'system' | 'success' | 'ready';

interface ConsoleStep {
  text: string;
  type: ConsoleStepType;
  delay: number; // milliseconds to pause after showing this line
}

const CONSOLE_STEPS: ConsoleStep[] = [
  { text: 'Starting digital resume v2.0.26...', type: 'system', delay: 150 },
  { text: 'Initializing neural link interface...', type: 'success', delay: 80 },
  { text: 'Querying biographical database...', type: 'success', delay: 100 },
  { text: 'Loading skills matrix & tech stack...', type: 'success', delay: 80 },
  { text: 'Synthesizing micro-graphics engine...', type: 'success', delay: 120 },
  { text: 'Decrypting employment history...', type: 'success', delay: 100 },
  { text: 'Connection secure. Terminal ready.', type: 'ready', delay: 250 },
];

type SplashConsoleProps = {
  onSequenceComplete: () => void;
};

// Console Subcomponent
function SplashConsole({ onSequenceComplete }: SplashConsoleProps): ReactNode {
  const [step, setStep] = useState(0);
  const [charsTyped, setCharsTyped] = useState(0);

  useEffect(() => {
    let active = true;

    const runSequence = async () => {
      const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

      // Step 0: Typing animation
      for (let i = 1; i <= COMMAND_NAME.length; i++) {
        if (!active) return;
        setCharsTyped(i);
        await sleep(TYPING_SPEED_MS);
      }

      // Done typing, pause and go to step 1
      if (!active) return;
      setStep(1);
      await sleep(150);

      // Steps 2 to N: Display each console step sequentially
      for (let i = 0; i < CONSOLE_STEPS.length; i++) {
        if (!active) return;
        setStep(i + 2); // step 1 corresponds to typing done. i + 2 maps to the line index display
        await sleep(CONSOLE_STEPS[i].delay);
      }

      // Final step: Pause slightly at fully loaded state before signaling completion
      const finalStepIndex = CONSOLE_STEPS.length + 2;
      if (!active) return;
      setStep(finalStepIndex);
      await sleep(200);

      if (!active) return;
      onSequenceComplete();
    };

    runSequence();

    return () => {
      active = false;
    };
  }, [onSequenceComplete]);

  const displayedCommand = COMMAND_NAME.substring(0, charsTyped);
  const finalPromptStepIndex = CONSOLE_STEPS.length + 1;

  return (
    <div className={Style.terminalContent}>
      {/* Prompt line */}
      <div className={Style.line}>
        <span className={Style.promptPrefix}>{PROMPT_USER}@{PROMPT_HOST}</span>
        <span>:</span>
        <span className={Style.promptDirectory}>~</span>
        <span>$ {displayedCommand}</span>
        {step === 0 && <span className={Style.cursor} />}
      </div>

      {/* Lines printed sequentially */}
      {CONSOLE_STEPS.map((stepItem, idx) => {
        const lineStepIndex = idx + 2;
        if (step < lineStepIndex) return null;

        return (
          <div key={idx} className={Style.line}>
            {stepItem.type === 'success' ? (
              <>
                <span>[ </span>
                <span className={Style.successPart}>OK</span>
                <span> ] {stepItem.text}</span>
              </>
            ) : stepItem.type === 'ready' ? (
              <span className={Style.readyLine}>{stepItem.text}</span>
            ) : (
              <span className={Style.systemLine}>{stepItem.text}</span>
            )}
          </div>
        );
      })}

      {/* Final prompt at the bottom */}
      {step >= finalPromptStepIndex && (
        <div className={Style.line}>
          <span className={Style.promptPrefix}>{PROMPT_USER}@{PROMPT_HOST}</span>
          <span>:</span>
          <span className={Style.promptDirectory}>~</span>
          <span>$ </span>
          <span className={Style.cursor} />
        </div>
      )}
    </div>
  );
}

type SplashProps = {
  isVisible: boolean;
  onComplete?: () => void;
};

// Main Splash Component
function Splash({ isVisible, onComplete }: SplashProps): ReactNode {
  const className = clsx(Style.splash, {
    [Style.visible]: isVisible,
    [Style.hidden]: !isVisible,
    [Style.consoleMode]: ENABLE_CONSOLE_ANIMATION,
  });

  return (
    <div className={className}>
      {isVisible && ENABLE_CONSOLE_ANIMATION && onComplete && (
        <SplashConsole onSequenceComplete={onComplete} />
      )}
    </div>
  );
}

export { Splash };
