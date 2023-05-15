// import { parse } from "dotenv";
// import React, { useState, useRef } from "react";

// const DragAndDropFileInput = ({setDevices}) => {
//   const [file, setFile] = useState(null);
//   const inputRef = useRef(null);

//   const handleChange = (e) => {
//     handleBoth(e);

//     setFile(e.target.files[0]);
//   };

//   const handleDrop = (e) => {
//     // e.preventDefault();
//     handleBoth();
//     setFile(e.dataTransfer.files[0]);


//   };

//   const handleBoth =(e)=>{
//     // const file = e.dataTransfer.files[0];
//   const reader = new FileReader();
//   reader.onload = () => {
//     const data = reader.result;
//     const parsedData = JSON.parse(data);
//     console.log(`parsedData ==> ${parsedData}`)
//     setDevices(parsedData);
//   };

//   console.log(`file ==> ${file}`)
//   reader.readAsText(file);
//   }

  

//   return (
//     <div>
//       <input
//         ref={inputRef}
//         type="file"
//         onChange={handleChange}
//         accept=".json"
//       />
//       {file && (
//         <div>
//           <h4>File Uploaded</h4>
//           <p>File Name: {file.name}</p>
//           <p>File Size: {file.size} bytes</p>
//         </div>
//       )}
//       <div
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={handleDrop}
//       >
//         <h4>Drag and Drop a file to upload</h4>
//       </div>
//     </div>
//   );
// };

// export default DragAndDropFileInput;

import { parse } from "dotenv";
import React, { useState, useRef, useEffect } from "react";

const DragAndDropFileInput = ({setDevices}) => {
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    // e.preventDefault();
    setFile(e.dataTransfer.files[0]);
    handleBoth(file);
    // useEffect(() => {
      
    // }, [file]);
  };

  const handleBoth =(e)=>{
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      const parsedData = JSON.parse(data);
      console.log(`parsedData ==> ${parsedData}`)
      setDevices(parsedData);
    };

    console.log(`file ==> ${file}`)
    reader.readAsText(file);
  }

  

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        onChange={handleDrop}
        accept=".json"
      />
      {file && (
        <div>
          <h4>File Uploaded</h4>
          <p>File Name: {file.name}</p>
          <p>File Size: {file.size} bytes</p>
        </div>
      )}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      > 
        <h4>Drag and Drop a file to upload</h4>
      </div>
    </div>
  );
};

export default DragAndDropFileInput;