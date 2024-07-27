/* eslint-disable react/prop-types */
const Button = (props) => {
  return (
    <>
      <div className="p-5">
        <button
          onClick={props.trigger}
          className={
            '"w-40 md:w-48  backdrop-blur-sm bg-white/30 border-white hover:bg-white/70 hover:text-black text-hsl(119, 100%, 10%) font-medium rounded-full  shadow-inner-custom px-8 py-2 truncate transition duration-300 ease-in-out text-black"'
          }
        >
          {props.buttonName}
        </button>
      </div>
    </>
  );
};

export default Button;
