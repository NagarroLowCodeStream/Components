import { createElement, useEffect, useRef, useState} from "react";
//import { CharacterWordCounterContainerProps} from "../typings/CharacterWordCounterProps";
import { CharacterWordCounterContainerProps } from "typings/CharacterWordCounterProps";
import "./ui/CharacterCounter.css";

export function CharacterCounter({ content, characterLimit, showCharacterCount, showWordCount, showCharacterLimitFeedback, showRichTextToolbar}: CharacterWordCounterContainerProps) {
    const [currentInput, setCurrentInput] = useState<string>(""); // State to hold the input value
    const myContainerRef = useRef<HTMLDivElement>(null); // Ref to the container holding the input
    
   
    // Function to handle input change event
    const onInputChange = (e: Event) => {
        const target = e.target as HTMLDivElement;

        if (target instanceof HTMLDivElement && target.isContentEditable) {
            const inputText = target.innerText; // Get the current input text

            // Only update the state if the input length is within the character limit
            if (inputText.length <= characterLimit) {
                setCurrentInput(inputText); // Update state
            } else {
                // If the input exceeds the limit, truncate it
                target.innerText = inputText.slice(0, characterLimit); // Truncate input to character limit
            }
        }
    };

    // Handle paste event to truncate pasted text
    const handlePaste = (e: ClipboardEvent) => {
        const clipboardData = e.clipboardData?.getData("text") || "";
        const remainingCharacters = characterLimit - currentInput.length;

        // Allow only the part of the pasted text that fits within the character limit
        if (remainingCharacters < clipboardData.length) {
            e.preventDefault(); // Stop the default paste action
            const truncatedText = clipboardData.slice(0, remainingCharacters);
            document.execCommand("insertText", false, truncatedText); // Insert truncated text
        }
    };

    // Function to execute rich text commands (bold, italic, etc.)
    const execCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value || "");
    };

    // Effect hook to manage event listeners dynamically
    useEffect(() => {
        const currentElement = myContainerRef.current; // Reference to the current element
        if (currentElement) {
            currentElement.addEventListener("input", onInputChange);
            currentElement.addEventListener("paste", handlePaste); // Listen for paste events
        }

        // Cleanup function to remove event listener
        return () => {
            if (currentElement) {
                currentElement.removeEventListener("input", onInputChange);
                currentElement.removeEventListener("paste", handlePaste); // Remove paste event listener
            }
        };
    }, [myContainerRef]);

    // Function to calculate color for character limit feedback
    const characterCountColor = () => {
        const ratio = currentInput.length / characterLimit;
        if (ratio < 0.75) return "green";
        if (ratio < 0.9) return "orange";
        return "red";
    };

    // Word count calculation
    const wordCount = currentInput.split(/\s+/).filter(word => word.length > 0).length;

    return (
        <div className="character_counter">
            {/* Conditionally render the rich text toolbar if enabled */}
            {showRichTextToolbar && (
                <div className="rich-text-toolbar">
                    <button onClick={() => execCommand("bold")}>Bold</button>
                    <button onClick={() => execCommand("italic")}>Italic</button>
                    <button onClick={() => execCommand("underline")}>Underline</button>
                    <button onClick={() => execCommand("strikeThrough")}>Strike</button>
                    <button onClick={() => execCommand("justifyLeft")}>Left</button>
                    <button onClick={() => execCommand("justifyCenter")}>Center</button>
                    <button onClick={() => execCommand("justifyRight")}>Right</button>
                    <button onClick={() => execCommand("insertOrderedList")}>OL</button>
                    <button onClick={() => execCommand("insertUnorderedList")}>UL</button>
                    <button
                        onClick={() => {
                            const url = prompt("Enter URL", "http://");
                            if (url) execCommand("createLink", url); // Only execute if URL is not null
                        }}
                    >
                        Link
                    </button>
                    <button onClick={() => execCommand("unlink")}>Unlink</button>
                </div>
            )}

            {/* Rich text or contentEditable area */}
            <div
                ref={myContainerRef}
                className="input-container"
                contentEditable={true} // Enable contentEditable for rich text
                dangerouslySetInnerHTML={{ __html: typeof content === "string" ? content : "" }} // Ensure content is a string
                suppressContentEditableWarning={true} // Suppress React warning for contentEditable
            />

            {/* Optional Character Count Display */}
            {showCharacterCount && (
                <div className="character-counter-display" style={{ color: showCharacterLimitFeedback ? characterCountColor() : "black" }}>
                    {currentInput.length} / {characterLimit} characters
                </div>
            )}

            {/* Optional Word Count Display */}
            {showWordCount && (
                <div className="word-counter-display">
                    {wordCount} words
                </div>
            )}
        </div>
    );
}