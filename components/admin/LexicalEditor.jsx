"use client";

import { useState, useEffect, useCallback } from "react";
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
  $getRoot,
  $isTextNode,
  $createTextNode,
  createCommand,
  COMMAND_PRIORITY_EDITOR,
} from "lexical";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
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
} from "react-icons/fa";

// Toolbar Component
function ToolbarPlugin({ isUrdu }) {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const updateToolbar = () => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  };

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor]);

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
    if (url === null) return;

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

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
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

// Content Change Plugin
function OnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);

  return null;
}

// Editor Theme with RTL support
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

// Main Bilingual Editor Component
export default function LexicalEditor({
  language,
  initialContent,
  onContentChange,
  placeholder,
}) {
  // const [currentTab, setCurrentTab] = useState(activeTab);

  // Handle content changes for English
  // const handleEnglishChange = useCallback(
  //   (editorState) => {
  //     const jsonString = JSON.stringify(editorState.toJSON());
  //     onEnglishChange(jsonString);
  //   },
  //   [onEnglishChange]
  // );

  // Handle content changes for Urdu
  // const handleUrduChange = useCallback(
  //   (editorState) => {
  //     const jsonString = JSON.stringify(editorState.toJSON());
  //     onUrduChange(jsonString);
  //   },
  //   [onUrduChange]
  // );

  // Create initial config for English
  // const englishConfig = {
  //   namespace: "EnglishEditor",
  //   nodes: [
  //     HeadingNode,
  //     ListNode,
  //     ListItemNode,
  //     QuoteNode,
  //     AutoLinkNode,
  //     LinkNode,
  //   ],
  //   theme: createEditorTheme(false),
  //   onError: (error) => console.error(error),
  //   editorState: englishContent ? englishContent : undefined,
  // };

  // Create initial config for Urdu
  // const urduConfig = {
  //   namespace: "UrduEditor",
  //   nodes: [
  //     HeadingNode,
  //     ListNode,
  //     ListItemNode,
  //     QuoteNode,
  //     AutoLinkNode,
  //     LinkNode,
  //   ],
  //   theme: createEditorTheme(true),
  //   onError: (error) => console.error(error),
  //   editorState: urduContent ? urduContent : undefined,
  // };

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

  // const showUrduKeyboard = () => {
  //   alert("Urdu keyboard functionality would be implemented here");
  // };

  return (
    // <div className="w-full max-w-4xl mx-auto">

    //   <div className="flex border-b border-gray-200 mb-4">
    //     <button
    //       onClick={() => setCurrentTab("english")}
    //       className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
    //         currentTab === "english"
    //           ? "border-blue-500 text-blue-600"
    //           : "border-transparent text-gray-500 hover:text-gray-700"
    //       }`}
    //     >
    //       English
    //     </button>
    //     <button
    //       onClick={() => setCurrentTab("urdu")}
    //       className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
    //         currentTab === "urdu"
    //           ? "border-blue-500 text-blue-600"
    //           : "border-transparent text-gray-500 hover:text-gray-700"
    //       }`}
    //     >
    //       اردو (Urdu)
    //     </button>
    //   </div>

    //   {currentTab === "english" && (
    //     <LexicalComposer initialConfig={englishConfig}>
    //       <div className="border border-gray-300 rounded-lg shadow-sm bg-white">
    //         <ToolbarPlugin isUrdu={false} />
    //         <div className="relative min-h-96">
    //           <RichTextPlugin
    //             contentEditable={
    //               <ContentEditable className="min-h-96 p-4 focus:outline-none" />
    //             }
    //             placeholder={
    //               <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
    //                 Write your content in English...
    //               </div>
    //             }
    //             ErrorBoundary={LexicalErrorBoundary}
    //           />
    //           <HistoryPlugin />
    //           <AutoFocusPlugin />
    //           <ListPlugin />
    //           <LinkPlugin />
    //           <OnChangePlugin
    //             onChange={(editorState) => {
    //               onContentChange(JSON.stringify(editorState.toJSON()));
    //             }}
    //           />
    //         </div>
    //       </div>
    //     </LexicalComposer>
    //   )}

    //   {currentTab === "urdu" && (
    //     <LexicalComposer initialConfig={urduConfig}>
    //       <div className="border border-gray-300 rounded-lg shadow-sm bg-white">
    //         <ToolbarPlugin isUrdu={true} />
    //         <div className="relative min-h-96">
    //           <RichTextPlugin
    //             contentEditable={
    //               <ContentEditable
    //                 className="min-h-96 p-4 focus:outline-none text-right font-urdu"
    //                 dir="rtl"
    //                 style={{
    //                   fontFamily: "Noto Nastaliq Urdu, Arial, sans-serif",
    //                 }}
    //               />
    //             }
    //             placeholder={
    //               <div
    //                 className="absolute top-4 right-4 text-gray-400 pointer-events-none text-right"
    //                 dir="rtl"
    //               >
    //                 اردو میں لکھیں...
    //               </div>
    //             }
    //             ErrorBoundary={LexicalErrorBoundary}
    //           />
    //           <HistoryPlugin />
    //           <AutoFocusPlugin />
    //           <ListPlugin />
    //           <LinkPlugin />
    //           <OnChangePlugin
    //             onChange={(editorState) => {
    //               onContentChange(JSON.stringify(editorState.toJSON()));
    //             }}
    //           />

    //           {/* Urdu Keyboard Button */}
    //           {/* <div className="absolute top-2 right-2">
    //             <button
    //               onClick={showUrduKeyboard}
    //               className="px-2 py-1 bg-gray-100 text-xs rounded border hover:bg-gray-200 transition-colors"
    //             >
    //               Urdu Keyboard
    //             </button>
    //           </div> */}
    //         </div>
    //       </div>
    //     </LexicalComposer>
    //   )}
    // </div>
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
              if (onContentChange) {
                onContentChange(editorState);
              }
            }}
          />
        </div>
      </div>
    </LexicalComposer>
  );
}

// Example usage component showing how to integrate with your existing form
export function AboutUsEditor() {
  const [englishContent, setEnglishContent] = useState(null);
  const [urduContent, setUrduContent] = useState(null);
  const [activeTab, setActiveTab] = useState("english");

  // Convert editor state to HTML for database storage
  const convertToHTML = (editorStateJSON) => {
    if (!editorStateJSON) return "";
    // This is a simplified conversion - you might want to use a more robust solution
    // For production, consider using @lexical/html or similar
    try {
      const state = JSON.parse(editorStateJSON);
      // You can implement a proper JSON to HTML converter here
      // For now, returning the JSON string - replace with actual HTML conversion
      return editorStateJSON;
    } catch (error) {
      console.error("Error converting to HTML:", error);
      return "";
    }
  };

  // Convert editor state to plain text for database storage
  const convertToPlainText = (editorStateJSON) => {
    if (!editorStateJSON) return "";
    try {
      const state = JSON.parse(editorStateJSON);
      // Extract plain text from the editor state
      // This is a simplified extraction - implement based on your needs
      const extractText = (node) => {
        if (node.type === "text") {
          return node.text || "";
        }
        if (node.children) {
          return node.children.map(extractText).join("");
        }
        return "";
      };

      if (state.root && state.root.children) {
        return state.root.children.map(extractText).join("\n");
      }
      return "";
    } catch (error) {
      console.error("Error converting to plain text:", error);
      return "";
    }
  };

  // Function to save content to database
  const saveToDatabase = async () => {
    const dataToSave = {
      english: {
        json: englishContent,
        html: convertToHTML(englishContent),
        plainText: convertToPlainText(englishContent),
      },
      urdu: {
        json: urduContent,
        html: convertToHTML(urduContent),
        plainText: convertToPlainText(urduContent),
      },
    };

    try {
      // Replace this with your actual API call
      console.log("Saving to database:", dataToSave);

      // Example API call:
      // const response = await fetch('/api/about-us', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(dataToSave),
      // });

      alert("Content saved successfully!");
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Error saving content. Please try again.");
    }
  };

  // Function to load content from database
  const loadFromDatabase = async () => {
    try {
      // Replace this with your actual API call
      // const response = await fetch('/api/about-us');
      // const data = await response.json();

      // Example of loading data:
      // setEnglishContent(data.english.json);
      // setUrduContent(data.urdu.json);

      console.log("Load from database function called");
    } catch (error) {
      console.error("Error loading content:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          About Us Content Editor
        </h1>
        <p className="text-gray-600">
          Create and edit your about us content in both English and Urdu.
        </p>
      </div> */}

      <BilingualLexicalEditor
        englishContent={englishContent}
        urduContent={urduContent}
        onEnglishChange={setEnglishContent}
        onUrduChange={setUrduContent}
        activeTab={activeTab}
      />

      {/* Save/Load Controls */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={saveToDatabase}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save to Database
        </button>
        <button
          onClick={loadFromDatabase}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Load from Database
        </button>
      </div>

      {/* Content preview info */}
      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <p className="text-sm text-gray-600">
          <strong>Tip:</strong> Use the toolbar above to format your content.
          The content is automatically saved as structured data that preserves
          all formatting when displayed on your website.
        </p>

        <p className="text-sm text-gray-600 mt-2" dir="rtl">
          <strong>نوٹ:</strong> اردو کنٹینٹ خودکار طور پر دائیں سے بائیں (RTL)
          فارمیٹ میں محفوظ ہوگا۔
        </p>
      </div>

      {/* Debug Info */}
      <div className="mt-6 space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-700 mb-2">
            English Content (JSON):
          </h3>
          <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto text-sm max-h-32">
            {englishContent
              ? JSON.stringify(JSON.parse(englishContent), null, 2)
              : "No content"}
          </pre>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-700 mb-2">
            Urdu Content (JSON):
          </h3>
          <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto text-sm max-h-32">
            {urduContent
              ? JSON.stringify(JSON.parse(urduContent), null, 2)
              : "No content"}
          </pre>
        </div>
      </div>
    </div>
  );
}
