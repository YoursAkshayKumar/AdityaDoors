export default function WindowShuttersImage1() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 border-2 border-gold m-8 z-10"></div>
      <div className="relative w-full h-full">
        {/* Brown window shutters */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="relative w-[80%] h-[90%] bg-[#5c4030] flex">
            {/* Left shutter */}
            <div className="w-1/2 h-full border-r border-[#3c2a21] flex flex-col justify-between p-2">
              <div className="w-full h-[15%] bg-[#3c2a21] mb-2"></div>
              <div className="w-full h-[15%] bg-[#3c2a21] mb-2"></div>
              <div className="w-full h-[15%] bg-[#3c2a21] mb-2"></div>
              <div className="w-full h-[15%] bg-[#3c2a21] mb-2"></div>
              <div className="w-full h-[15%] bg-[#3c2a21]"></div>
            </div>
            {/* Right shutter */}
            <div className="w-1/2 h-full flex flex-col justify-between p-2">
              <div className="w-full h-[15%] bg-[#3c2a21] mb-2"></div>
              <div className="w-full h-[15%] bg-[#3c2a21] mb-2"></div>
              <div className="w-full h-[15%] bg-[#3c2a21] mb-2"></div>
              <div className="w-full h-[15%] bg-[#3c2a21] mb-2"></div>
              <div className="w-full h-[15%] bg-[#3c2a21]"></div>
            </div>
          </div>
        </div>

        {/* Plant in front */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[30%] h-[30%]">
          <div className="relative w-full h-full">
            {/* Plant pot */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[60%] h-[40%] bg-white rounded-t-full"></div>

            {/* Plant leaves */}
            <div className="absolute bottom-[30%] left-1/2 transform -translate-x-1/2">
              <div className="relative w-[100px] h-[150px]">
                <div className="absolute w-[20px] h-[120px] bg-[#4a7c59] left-[40px] bottom-0 rounded-full"></div>
                <div className="absolute w-[60px] h-[40px] bg-[#4a7c59] left-[10px] bottom-[60px] rounded-full transform -rotate-45"></div>
                <div className="absolute w-[60px] h-[40px] bg-[#4a7c59] left-[30px] bottom-[80px] rounded-full"></div>
                <div className="absolute w-[60px] h-[40px] bg-[#4a7c59] left-[50px] bottom-[60px] rounded-full transform rotate-45"></div>
                <div className="absolute w-[60px] h-[40px] bg-[#4a7c59] left-[20px] bottom-[100px] rounded-full transform -rotate-15"></div>
                <div className="absolute w-[60px] h-[40px] bg-[#4a7c59] left-[40px] bottom-[110px] rounded-full transform rotate-15"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
