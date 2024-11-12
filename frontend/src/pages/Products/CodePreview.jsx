// // src/pages/Products/CodePreview.jsx
// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import { useGetProductDetailsQuery } from "../../redux/api/productApiSlice";
// import { FaCode, FaDownload, FaFolder, FaFolderOpen, FaFile, FaArrowLeft } from "react-icons/fa";
// import Loader from "../../components/Loader";
// import Message from "../../components/Message";

// const CodePreview = () => {
//   const { id: productId } = useParams();
//   const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
//   const [files, setFiles] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [fileContent, setFileContent] = useState('');
//   const [expandedFolders, setExpandedFolders] = useState(new Set());

//   useEffect(() => {
//     if (product?.code) {
//       fetchFileStructure();
//     }
//   }, [product]);

//  // frontend/src/pages/Products/CodePreview.jsx
// const fetchFileStructure = async () => {
//   try {
//     const response = await fetch(`/api/code/${product._id}/structure`);
//     const data = await response.json();
//     setFiles(data.files);
//     if (data.files.length > 0) {
//       selectFile(data.files[0]);
//     }
//   } catch (error) {
//     console.error('Error fetching file structure:', error);
//   }
// };

// const selectFile = async (file) => {
//   try {
//     const response = await fetch(`/api/code/${product._id}/file/${file.path}`);
//     const content = await response.text();
//     setSelectedFile(file);
//     setFileContent(content);
//   } catch (error) {
//     console.error('Error fetching file content:', error);
//   }
// };

//   const toggleFolder = (path) => {
//     setExpandedFolders(prev => {
//       const next = new Set(prev);
//       if (next.has(path)) {
//         next.delete(path);
//       } else {
//         next.add(path);
//       }
//       return next;
//     });
//   };

//   const FileTree = ({ items, level = 0 }) => (
//     <div style={{ marginLeft: level * 20 }}>
//       {items.map((item) => (
//         <div key={item.path}>
//           {item.type === 'folder' ? (
//             <div>
//               <button
//                 onClick={() => toggleFolder(item.path)}
//                 className="flex items-center gap-2 hover:bg-gray-100 w-full p-1 rounded"
//               >
//                 {expandedFolders.has(item.path) ? (
//                   <FaFolderOpen className="text-yellow-500" />
//                 ) : (
//                   <FaFolder className="text-yellow-500" />
//                 )}
//                 {item.name}
//               </button>
//               {expandedFolders.has(item.path) && (
//                 <FileTree items={item.children} level={level + 1} />
//               )}
//             </div>
//           ) : (
//             <button
//               onClick={() => selectFile(item)}
//               className={`flex items-center gap-2 hover:bg-gray-100 w-full p-1 rounded ${
//                 selectedFile?.path === item.path ? 'bg-gray-100' : ''
//               }`}
//             >
//               <FaFile className="text-gray-500" />
//               {item.name}
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="mb-6">
//           <Link
//             to={`/product/${productId}`}
//             className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
//           >
//             <FaArrowLeft /> Back to Product
//           </Link>
//         </div>

//         {isLoading ? (
//           <Loader />
//         ) : error ? (
//           <Message variant="danger">
//             {error?.data?.message || error.message}
//           </Message>
//         ) : (
//           <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//             <div className="border-b border-gray-200 p-4 flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <FaCode className="text-gray-500" />
//                 <h1 className="font-semibold text-xl">
//                   Code Preview: {product.name}
//                 </h1>
//               </div>
//               <a
//                 href={`/api/code/${product.code}/download`}
//                 className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 <FaDownload />
//                 Download Code
//               </a>
//             </div>
            
//             <div className="flex h-[600px]">
//               <div className="w-64 border-r border-gray-200 p-4 overflow-y-auto">
//                 <FileTree items={files} />
//               </div>
//               <div className="flex-1 overflow-auto">
//                 {selectedFile ? (
//                   <SyntaxHighlighter
//                     language={selectedFile.language}
//                     style={atomOneDark}
//                     customStyle={{
//                       margin: 0,
//                       minHeight: '100%',
//                       fontSize: '14px'
//                     }}
//                   >
//                     {fileContent}
//                   </SyntaxHighlighter>
//                 ) : (
//                   <div className="p-4 text-gray-500">
//                     Select a file to view its contents
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CodePreview;
// src/pages/Products/CodePreview.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useGetProductDetailsQuery } from "../../redux/api/productApiSlice";
import { FaCode, FaDownload, FaFolder, FaFolderOpen, FaFile, FaArrowLeft } from "react-icons/fa";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const mockFiles = [
  {
    name: "src",
    type: "folder",
    path: "src",
    children: [
      {
        name: "index.js",
        type: "file",
        path: "src/index.js",
        language: "javascript",
        content: `import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));`
      },
      {
        name: "App.js",
        type: "file",
        path: "src/App.js",
        language: "javascript",
        content: `import React from 'react';

const App = () => {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
};

export default App;`
      },
      {
        name: "components",
        type: "folder",
        path: "src/components",
        children: [
          {
            name: "Header.js",
            type: "file",
            path: "src/components/Header.js",
            language: "javascript",
            content: `import React from 'react';

const Header = () => {
  return (
    <header>
      <h1>Header Component</h1>
    </header>
  );
};

export default Header;`
          }
        ]
      }
    ]
  },
  {
    name: "public",
    type: "folder",
    path: "public",
    children: [
      {
        name: "index.html",
        type: "file",
        path: "public/index.html",
        language: "html",
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`
      }
    ]
  },
  {
    name: "package.json",
    type: "file",
    path: "package.json",
    language: "json",
    content: `{
  "name": "react-app",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  }
}`
  }
];

const CodePreview = () => {
  const { id: productId } = useParams();
  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [expandedFolders, setExpandedFolders] = useState(new Set());

  useEffect(() => {
    if (product) {
      fetchMockFileStructure();
    }
  }, [product]);

  const fetchMockFileStructure = () => {
    setFiles(mockFiles);
    if (mockFiles.length > 0) {
      selectFile(mockFiles[0].children[0]);
    }
  };

  const selectFile = (file) => {
    setSelectedFile(file);
    setFileContent(file.content);
  };

  const toggleFolder = (path) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const FileTree = ({ items, level = 0 }) => (
    <div style={{ marginLeft: level * 20 }}>
      {items.map((item) => (
        <div key={item.path}>
          {item.type === 'folder' ? (
            <div>
              <button
                onClick={() => toggleFolder(item.path)}
                className="flex items-center gap-2 hover:bg-gray-100 w-full p-1 rounded"
              >
                {expandedFolders.has(item.path) ? (
                  <FaFolderOpen className="text-yellow-500" />
                ) : (
                  <FaFolder className="text-yellow-500" />
                )}
                {item.name}
              </button>
              {expandedFolders.has(item.path) && (
                <FileTree items={item.children} level={level + 1} />
              )}
            </div>
          ) : (
            <button
              onClick={() => selectFile(item)}
              className={`flex items-center gap-2 hover:bg-gray-100 w-full p-1 rounded ${
                selectedFile?.path === item.path ? 'bg-gray-100' : ''
              }`}
            >
              <FaFile className="text-gray-500" />
              {item.name}
            </button>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <Link
            to={`/product/${productId}`}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <FaArrowLeft /> Back to Product
          </Link>
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.message}
          </Message>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaCode className="text-gray-500" />
                <h1 className="font-semibold text-xl">
                  Code Preview: {product.name}
                </h1>
              </div>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaDownload />
                Download Code
              </a>
            </div>
            
            <div className="flex h-[600px]">
              <div className="w-64 border-r border-gray-200 p-4 overflow-y-auto">
                <FileTree items={files} />
              </div>
              <div className="flex-1 overflow-auto">
                {selectedFile ? (
                  <SyntaxHighlighter
                    language={selectedFile.language}
                    style={atomOneDark}
                    customStyle={{
                      margin: 0,
                      minHeight: '100%',
                      fontSize: '14px'
                    }}
                  >
                    {fileContent}
                  </SyntaxHighlighter>
                ) : (
                  <div className="p-4 text-gray-500">
                    Select a file to view its contents
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodePreview;