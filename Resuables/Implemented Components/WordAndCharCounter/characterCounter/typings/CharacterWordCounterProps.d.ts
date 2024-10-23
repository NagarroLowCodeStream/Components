/**
 * This file was generated from CharacterWordCounter.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";

export interface CharacterWordCounterContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    content?: ReactNode;
    characterLimit: number;
    showCharacterLimitFeedback: boolean;
    showWordCount: boolean;
    showCharacterCount: boolean;
    showRichTextToolbar: boolean;
}

export interface CharacterWordCounterPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    content: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    characterLimit: number | null;
    showCharacterLimitFeedback: boolean;
    showWordCount: boolean;
    showCharacterCount: boolean;
    showRichTextToolbar: boolean;
}
