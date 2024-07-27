/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

const InputFile = (props) => {
  function handleChange(e) {
    props.loadFile((prev) => {
      return { ...prev, [e.target.name]: e.target.files[0] };
    });
  }

  const inputFile = useRef();

  useEffect(() => {
    inputFile.current.value = null;
  }, [props.isReset]);
  return (
    <>

      <div className="file-upload p-2">

        <label
          htmlFor={props.for} //spreadsheet
          className="flex items-center p-6 border border-black rounded-md min-w-[100px] max-w-[500px] bg-gray-400 bg-opacity-30 text-white h-[35px]"
        >
          <input
            type="file"
            ref={inputFile}
            name={props.name} //spreadsheet
            id={props.fileId} //spreadsheet
            accept={props.fileType} //.xlsx, .xls
            required
            className="appearance-none border-none bg-transparent w-full text-white py-5"
            onChange={handleChange}
          />
          {/* Upload Excel Spreadsheet */}
          <span className=" whitespace-nowrap">{props.labelName}</span>
        </label>
      </div>
    </>
  );
};

export default InputFile;