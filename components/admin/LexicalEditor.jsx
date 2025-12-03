// components/admin/LexicalEditor.jsx
"use client";

import React, { useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  $isTextNode,
  $createTextNode,
  createCommand,
  COMMAND_PRIORITY_EDITOR,
  FORMAT_ELEMENT_COMMAND,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $createListItemNode, $createListNode } from "@lexical/list";
import { $createLinkNode } from "@lexical/link";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaParagraph,
  FaHeading,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaLink,
  FaUndo,
  FaRedo,
  FaLanguage,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
} from "react-icons/fa";

/* =========================
   ToolbarPlugin (FULL)
   ========================= */
function ToolbarPlugin({ isUrdu }) {
  const [editor] = useLexicalComposerContext();

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [blockAlignment, setBlockAlignment] = useState("left");
  const [fontSize, setFontSize] = useState("16"); // toolbar default

  const updateToolbar = () => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));

      // Detect alignment from top-level element if possible
      try {
        const anchorNode = selection.anchor.getNode();
        const topLevel = anchorNode.getTopLevelElementOrThrow();
        const fmt =
          topLevel && typeof topLevel.getFormatType === "function"
            ? topLevel.getFormatType()
            : "";
        setBlockAlignment(!fmt || fmt === "left" ? "left" : fmt);
      } catch {
        setBlockAlignment("left");
      }

      // Detect font-size from selection (first text node with style)
      try {
        const nodes = selection.getNodes ? selection.getNodes() : [];
        let found = null;
        for (const n of nodes) {
          if ($isTextNode(n)) {
            const style =
              typeof n.getStyle === "function"
                ? n.getStyle() || ""
                : n.style || "";
            if (style) {
              const m = style.match(/font-size\s*:\s*([0-9]+)px/);
              if (m) {
                found = m[1];
                break;
              }
            }
          }
        }
        setFontSize(found ?? "16");
      } catch {
        setFontSize("16");
      }
    }
  };

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor]);

  // Block helpers
  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatHeading = (headingSize) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  const formatBulletList = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const listNode = $createListNode("bullet");
        const listItemNode = $createListItemNode();
        listItemNode.append($createParagraphNode());
        listNode.append(listItemNode);
        selection.insertNodes([listNode]);
      }
    });
  };

  const formatNumberedList = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const listNode = $createListNode("number");
        const listItemNode = $createListItemNode();
        listItemNode.append($createParagraphNode());
        listNode.append(listItemNode);
        selection.insertNodes([listNode]);
      }
    });
  };

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (!url) return;
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const linkNode = $createLinkNode(url);
        const textNode = $createTextNode(url);
        linkNode.append(textNode);
        selection.insertNodes([linkNode]);
      }
    });
  };

  // Apply font-size to selected text nodes (live)
  const applyFontSize = (size) => {
    setFontSize(size);
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      const nodes = selection.getNodes ? selection.getNodes() : [];

      const applyToTextNode = (textNode) => {
        if (typeof textNode.setStyle === "function") {
          const prev =
            typeof textNode.getStyle === "function"
              ? textNode.getStyle() || ""
              : textNode.style || "";
          const stripped = prev
            .replace(/font-size\s*:\s*[0-9]+px;?/g, "")
            .trim();
          const newStyle =
            (stripped ? stripped + ";" : "") + `font-size:${size}px;`;
          try {
            textNode.setStyle(newStyle);
          } catch {
            textNode.style = newStyle;
          }
        } else {
          textNode.style = textNode.style
            ? textNode.style.replace(/font-size\s*:[^;]+;?/g, "")
            : "";
          textNode.style =
            (textNode.style ? textNode.style + ";" : "") +
            `font-size:${size}px;`;
        }
      };

      for (const node of nodes) {
        if ($isTextNode(node)) {
          applyToTextNode(node);
        } else if (node.children && node.children.length) {
          // walk children recursively
          const walk = (children) => {
            for (const ch of children) {
              if ($isTextNode(ch)) {
                applyToTextNode(ch);
              } else if (ch.children && ch.children.length) {
                walk(ch.children);
              }
            }
          };
          walk(node.children);
        }
      }
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
      {/* Undo / Redo */}
      <button
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        className="p-2 rounded hover:bg-gray-200 transition-colors"
        aria-label="Undo"
      >
        <FaUndo size={16} />
      </button>
      <button
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        className="p-2 rounded hover:bg-gray-200 transition-colors"
        aria-label="Redo"
      >
        <FaRedo size={16} />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      {/* Text formatting */}
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${
          isBold ? "bg-gray-300" : ""
        }`}
        aria-label="Format Bold"
      >
        <FaBold size={16} />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${
          isItalic ? "bg-gray-300" : ""
        }`}
        aria-label="Format Italics"
      >
        <FaItalic size={16} />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${
          isUnderline ? "bg-gray-300" : ""
        }`}
        aria-label="Format Underline"
      >
        <FaUnderline size={16} />
      </button>
      <button
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${
          isStrikethrough ? "bg-gray-300" : ""
        }`}
        aria-label="Format Strikethrough"
      >
        <FaStrikethrough size={16} />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      {/* Paragraph / Headings */}
      <button
        onClick={formatParagraph}
        className="p-2 rounded hover:bg-gray-200 transition-colors"
        aria-label="Paragraph"
      >
        <FaParagraph size={16} />
      </button>
      <button
        onClick={() => formatHeading("h1")}
        className="p-2 rounded hover:bg-gray-200 transition-colors"
        aria-label="Heading 1"
      >
        <FaHeading size={16} />
      </button>
      <button
        onClick={() => formatHeading("h2")}
        className="p-2 rounded hover:bg-gray-200 transition-colors"
        aria-label="Heading 2"
      >
        <span className="text-xs font-bold">H2</span>
      </button>
      <button
        onClick={() => formatHeading("h3")}
        className="p-2 rounded hover:bg-gray-200 transition-colors"
        aria-label="Heading 3"
      >
        <span className="text-xs font-bold">H3</span>
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      {/* Lists */}
      <button
        onClick={formatBulletList}
        className="p-2 rounded hover:bg-gray-200 transition-colors"
        aria-label="Bullet List"
      >
        <FaListUl size={16} />
      </button>
      <button
        onClick={formatNumberedList}
        className="p-2 rounded hover:bg-gray-200 transition-colors"
        aria-label="Numbered List"
      >
        <FaListOl size={16} />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      {/* Quote + Link */}
      <button
        onClick={formatQuote}
        className="p-2 rounded hover:bg-gray-200 transition-colors"
        aria-label="Quote"
      >
        <FaQuoteRight size={16} />
      </button>
      <button
        onClick={insertLink}
        className="p-2 rounded hover:bg-gray-200 transition-colors"
        aria-label="Insert Link"
      >
        <FaLink size={16} />
      </button>

      {/* Alignment */}
      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${
          blockAlignment === "left" ? "bg-gray-300" : ""
        }`}
        aria-label="Align Left"
      >
        <FaAlignLeft size={16} />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${
          blockAlignment === "center" ? "bg-gray-300" : ""
        }`}
        aria-label="Align Center"
      >
        <FaAlignCenter size={16} />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${
          blockAlignment === "right" ? "bg-gray-300" : ""
        }`}
        aria-label="Align Right"
      >
        <FaAlignRight size={16} />
      </button>
      <button
        onClick={() =>
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
        }
        className={`p-2 rounded hover:bg-gray-200 transition-colors ${
          blockAlignment === "justify" ? "bg-gray-300" : ""
        }`}
        aria-label="Justify"
      >
        <FaAlignJustify size={16} />
      </button>

      {/* Font size selector */}
      <div className="flex items-center ml-2">
        <label className="sr-only">Font size</label>
        <select
          value={fontSize}
          onChange={(e) => applyFontSize(e.target.value)}
          className="text-sm border px-2 py-1 rounded-md bg-white"
          aria-label="Font size"
        >
          {Array.from({ length: 16 }, (_, i) => 10 + i).map((n) => (
            <option key={n} value={String(n)}>
              {n}px
            </option>
          ))}
        </select>
      </div>

      {isUrdu && (
        <>
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <FaLanguage size={14} />
            <span>اردو</span>
          </div>
        </>
      )}
    </div>
  );
}

/* =========================
   OnChangePlugin
   ========================= */
function OnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      // Forward the EditorState object to parent (parent expects editorState.toJSON())
      onChange && onChange(editorState);
    });
  }, [editor, onChange]);

  return null;
}

/* =========================
   Editor Theme
   ========================= */
const createEditorTheme = (isUrdu) => ({
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
    underlineStrikethrough: "underline line-through",
  },
  link: "text-blue-600 underline",
  list: {
    nested: {
      listitem: isUrdu ? "mr-6" : "ml-6",
    },
    ol: isUrdu ? "list-decimal pr-6" : "list-decimal pl-6",
    ul: isUrdu ? "list-disc pr-6" : "list-disc pl-6",
    listitem: "my-1",
  },
  heading: {
    h1: "text-4xl font-bold my-4",
    h2: "text-3xl font-bold my-3",
    h3: "text-2xl font-bold my-2",
    h4: "text-xl font-bold my-2",
    h5: "text-lg font-bold my-2",
    h6: "text-base font-bold my-2",
  },
  quote: isUrdu
    ? "border-r-4 border-gray-300 pr-4 my-2 italic"
    : "border-l-4 border-gray-300 pl-4 my-2 italic",
});

/* =========================
   Main LexicalEditor Component
   ========================= */
export default function LexicalEditor({
  language = "english",
  initialContent,
  onContentChange,
  placeholder = "Write something...",
}) {
  const config = {
    namespace: language === "urdu" ? "UrduEditor" : "EnglishEditor",
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      AutoLinkNode,
      LinkNode,
    ],
    theme: createEditorTheme(language === "urdu"),
    onError: (error) => console.error(error),
    editorState: initialContent ? initialContent : undefined,
  };

  return (
    <LexicalComposer initialConfig={config}>
      <div className="border border-gray-300 rounded-lg shadow-sm bg-white">
        <ToolbarPlugin isUrdu={language === "urdu"} />
        <div className="relative min-h-96">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={`min-h-96 p-4 focus:outline-none ${
                  language === "urdu" ? "text-right font-urdu" : ""
                }`}
                dir={language === "urdu" ? "rtl" : "ltr"}
                style={
                  language === "urdu"
                    ? { fontFamily: "Noto Nastaliq Urdu, Arial, sans-serif" }
                    : undefined
                }
              />
            }
            placeholder={
              <div
                className={`absolute top-4 ${
                  language === "urdu" ? "right-4 text-right" : "left-4"
                } text-gray-400 pointer-events-none`}
                dir={language === "urdu" ? "rtl" : "ltr"}
              >
                {placeholder}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <OnChangePlugin
            onChange={(editorState) => {
              // Parent previously expected to call editorState.toJSON()
              // We forward editorState object straight through.
              if (onContentChange) onContentChange(editorState);
            }}
          />
        </div>
      </div>
    </LexicalComposer>
  );
}

/* =========================
   BilingualLexicalEditor (helper wrapper)
   =========================
   This is added because your AboutUsEditor used <BilingualLexicalEditor />
   This wrapper renders two LexicalEditor instances and connects them with props
   so you can directly paste into your project without extra edits.
   ========================= */
export function BilingualLexicalEditor({
  englishContent,
  urduContent,
  onEnglishChange,
  onUrduChange,
  activeTab = "english",
}) {
  return (
    <div>
      {/* Show both editors but hide inactive with CSS (keeps state) */}
      <div style={{ display: activeTab === "english" ? "block" : "none" }}>
        <LexicalEditor
          language="english"
          initialContent={englishContent}
          onContentChange={(editorState) => {
            // parent previously expected JSON string of content.toJSON()
            try {
              const json = editorState.toJSON
                ? editorState.toJSON()
                : editorState;
              onEnglishChange && onEnglishChange(JSON.stringify(json));
            } catch (e) {
              // fallback
              onEnglishChange && onEnglishChange(JSON.stringify(editorState));
            }
          }}
          placeholder="Write your about us content in English..."
        />
      </div>

      <div style={{ display: activeTab === "urdu" ? "block" : "none" }}>
        <LexicalEditor
          language="urdu"
          initialContent={urduContent}
          onContentChange={(editorState) => {
            try {
              const json = editorState.toJSON
                ? editorState.toJSON()
                : editorState;
              onUrduChange && onUrduChange(JSON.stringify(json));
            } catch (e) {
              onUrduChange && onUrduChange(JSON.stringify(editorState));
            }
          }}
          placeholder="اردو میں اپنا مواد لکھیں..."
        />
      </div>
    </div>
  );
}
