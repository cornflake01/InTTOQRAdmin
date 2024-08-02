import Header from "./Header";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputFile from "./InputFile";
import Button from "./Button";
import "../assets/css/cursor.css";
import Cursor from "./Cursor";
import ucBuilding from "../assets/uc_building.png";
import uploadIcon from "../assets/upload.png"; // Import the PNG asset
import PositionIndicator from "./PositionIndicator";

const Contents = () => {
  const [formData, setFormData] = useState({
    spreadsheet: "",
    template: "",
    qr_coords: "",
    name_coords: "",
  });
  const [isReset, setIsReset] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isActive, setIsActive] = useState("none");
  const imageRef = useRef(null);
  const [boundingClient, setBoundingClient] = useState(null);

  function submitData() {
    const data = new FormData();
    if (!formData.spreadsheet || !formData.template) {
      formValidation();
    } else {
      for (const key in formData) {
        if (key === "qr_coords" || key === "name_coords") {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      }

      axios.post("//localhost:3000/generate", data).then((result) => {
        if (result.status === 200) {
          generated();
          setIsReset((current) => !current);
          setImagePreview(null);
          setFormData({
            spreadsheet: "",
            template: "",
            qr_coords: "",
            name_coords: "",
          });
          setIsActive("none");
        } else {
          fail();
        }
      });
    }
  }

  function generated() {
    toast.success("Certificates Generated!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  function fail() {
    toast.error("Certificates Not Generated!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  function formValidation() {
    toast.error("Please Upload All Files Needed!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  useEffect(() => {
    const file = formData.template;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [formData.template]);

  useEffect(() => {
    const image = imageRef.current;
    if (image) {
      image.addEventListener("load", () => {
        setBoundingClient(image.getBoundingClientRect());
      });
    }
  }, [imageRef.current]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <>
      {boundingClient ? (
        <Cursor
          cursorType={isActive}
          reference={imageRef}
          boundingClient={boundingClient}
          setCoords={setFormData}
        />
      ) : (
        ""
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="flex flex-col h-screen w-[100vw]">
        

  <Header />
          <div
            className="flex flex-col flex-grow h-auto w-full bg-cover bg-center bg-no-repeat text-white"
            style={{ backgroundImage: `url(${ucBuilding})`, color: "#173218" }}
          >
           <div className="flex flex-col items-center backdrop-blur-3xl border-white border-solid shadow-lg rounded-lg overflow-hidden relative self-center pt-20 pr-3 pb-3 pl-6 mt-20 max-w-full h-auto w-[1400px] max-md:pl-5 max-md:mt-10 bg-gradient-to-b from-[#f8f8f8]/50 to-white/30">
             <div className="relative mt-5 max-md:max-w-full flex flex-col items-center z-10">
                <div className="flex gap-20 max-md:flex-col max-md:gap-0 w-full">
                  
                  
                  {/* Container for Excel Spreadsheet Upload */}
                <div className="flex flex-col w-auto h-80 max-md:w-full shadow- p-7 border shadow-inner border-white rounded-lg backdrop-blur-sm bg-white/5">
                  <div className="self-stretch text-xl font-semibold text-center max-md:mt-10">
                     <h4 className="text-[#013200]">Upload Excel Spreadsheet</h4>
                    </div>
                    <img src={uploadIcon} alt="Upload Icon" className="self-center mt-5 mb-5" /> {/* PNG Asset */}
                    <div className="font-medium w-full text-xs">
                      <InputFile
                        for={"spreadsheet"}
                        name={"spreadsheet"}
                        fileId={"spreadsheet"}
                        fileType={".xlsx, .xls"}
                        loadFile={setFormData}
                        isReset={isReset}
                        labelName={"Upload Excel Spreadsheet"}
                      />
                    </div>
                  </div>

                  {/* Container for Certificate Template Upload */}
                  <div className="flex flex-col w-auto h-80 max-md:w-full shadow-inner p-7 border border-white rounded-lg backdrop-blur-sm bg-white/5">
                    <div className="flex flex-col grow items-center font-semibold text-center text-xs max-md:mt-10 w-full">
                      <div className="self-stretch text-xl">
                       <h4 className="text-[#013200]">Upload Certificate Template</h4>
                      </div>
                      <img src={uploadIcon} alt="Upload Icon" className="self-center mt-5 mb-5" /> {/* PNG Asset */}
                      <div className="font-medium w-full">
                        <InputFile
                          for={"template"}
                          name={"template"}
                          fileId={"template"}
                          fileType={".png"}
                          loadFile={setFormData}
                          isReset={isReset}
                          labelName={"Upload Certificate Template"}
                        />
                      </div>
                    </div>
                    </div>
                  </div>

    
            <div>
              {/* to select positioning of the qr code and name */}
                  <div
                    className={`relative flex justify-center ${
                      imagePreview ? " " : "hidden"
                    }`}
                  >
                    <PositionIndicator
                      buttonName={"QR Position"}
                      coords={formData.qr_coords}
                      val={"qr_coords"}
                      setActive={setIsActive}
                    />
                    <PositionIndicator
                      buttonName={"Name Position"}
                      coords={formData.name_coords.endX}
                      val={"name_coords"}
                      setActive={setIsActive}
                    />
                  </div>
                  <div>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      id="preview"
                      className={`mx-auto mb-2.5 ${
                        !imagePreview ? "hidden" : ""
                      }`}
                      ref={imageRef}
                      draggable={false}
                    />
                  </div>
                  </div>

                  <div className="relative self-center pb-5 mt-80 text-2xl font-semibold text-center text-black max-md:mt-10">
                <Button
                  trigger={submitData}
                  buttonName={"RUN"}
                  style={{
                    borderRadius: "",
                    borderWidth: "px",
                    borderColor: "white",
                    boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                    color: "white",
                    padding: "0.5rem 1.5rem",
                    borderStyle: "solid",
                  }}
                />
              </div>
          </div>
        </div>
        
        {/* footer */}
        <div className="flex justify-center items-center px-16 py-2 mt-40 w-full text-xs font-semibold text-center text-black bg-white max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-w-full w-[678px] max-md:flex-wrap">
              <div>intto@uc-bcf.edu.ph</div>
              <div className="flex-auto">
                Legarda Campus, Basement 1, Baguio City 2600s
              </div>
              <div className="flex-auto">(074) 442-3316 loc.no.303</div>
            </div>
          </div>
      </div>
    </div>
    </>
  );
};

export default Contents;
