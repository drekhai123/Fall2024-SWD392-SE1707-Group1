// import { DraftEditor } from "@/components/editor";
// import { DEditorProps } from "@/components/editor/draft";
// import { ContentState, EditorState } from "draft-js";
// import htmlToDraft from "html-to-draftjs";
// import React, { useMemo } from "react";

// interface Props extends Omit<DEditorProps, "onChange"> {
//   value: string | EditorState;
//   onChange: (value: EditorState) => any;
// }

// const DraftEditorField = ({ value, onChange, ...props }: Props) => {
//   const editorState = useMemo(() => {
//     if (!value) return EditorState.createEmpty();
//     if (value instanceof EditorState) {
//       return value;
//     }
//     const html = value;
//     const contentBlock = htmlToDraft(html ?? "");
//     if (contentBlock) {
//       const contentState = ContentState.createFromBlockArray(
//         contentBlock.contentBlocks
//       );
//       const editorState = EditorState.createWithContent(contentState);
//       return editorState;
//     } else {
//       return EditorState.createEmpty();
//     }
//   }, [value]);

//   return (
//     <DraftEditor
//       editorState={editorState}
//       onEditorStateChange={onChange}
//       {...props}
//     />
//   );
// };

// export default DraftEditorField;
