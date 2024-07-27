import UCLogo from "/src/assets/uc_logo.png";
import InttoLogo from "/src/assets/intto_logo.png";

const Header = () => {
  return (

      <div className="flex flex-col items-center justify-center w-full min-h-auto h-auto">
        <div className="flex items-center place-content-center shadow-md text-black w-full min-h-auto h-auto pt-2 pb-2 px-80">
            <img
            src={UCLogo}
            alt="Image"
            className="h-[45px] w-auto object-contain md:h-[80px] sm:h-[60px]"
          />
        <div className="flex items-center justify-center mr-3 ml-3">
          <div className="text-center">
            <h1 className="block text-[12px] sm:text-[18px] lg:text-[20px] uppercase leading-[0.8] font-bold tracking-wider">
              University of the Cordilleras
            </h1>
            <p className="block text-[10px] sm:text-[15px] lg:text-[16px] leading-[0.8] pt-2">
              Innovation and Technology Transfer Office
            </p>
          </div>
        </div>
        <img
          src={InttoLogo}
          alt="Image"
          className="h-[45px] w-auto object-contain  md:h-[50px] sm:h-[30px]"
        />
      </div>
    </div>
  );
};

export default Header;