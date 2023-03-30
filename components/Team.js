import React from 'react'

function Team () {
    return (
        <div id='team' className= "grid md:grid-flow-row w-full bg-black md:px-24 sm:px-10 p-4 items-start border-b-2 border-white pb-4">
        <div className= "mt-4 mb-4 pt-2"> 
        <span className=" font-Righteous tracking-wide uppercase text-white text-3xl">Team</span>
        </div>
        <div className="mt-4 mb-4 w-full h-full pt-2 grid md:grid-flow-col items-center justify-between ">
          <div className=" w-full h-full flex flex-col items-center">
            <div className="items-center">
              <img src="/ownernft.jpg" className="object-cover w-full sm:h-[200px] md:w-[200px] rounded-md border border-gray-300"/>
              <div className="text-white text-1xl text-center font-semibold uppercase mt-1">CEO</div>
              <div className="text-gray-400 text-1xl text-center mt-1">The RAYC</div>
            </div>
          </div>

          <div className=" w-full h-full flex flex-col items-center">
            <div className="items-center">
              <img src="/85.png" className="object-cover w-full sm:h-[200px] md:w-[200px] rounded-md border border-gray-300"/>
              <div className="text-white text-1xl text-center font-semibold uppercase mt-1">Artist</div>
              <div className="text-gray-400 text-1xl text-center mt-1">Ali</div>
            </div>
          </div>

          

          <div className=" w-full h-full flex flex-col items-center">
            <div className="items-center">
              <img src="/112.png" className="object-cover w-full sm:h-[200px] md:w-[200px] rounded-md border border-gray-300"/>
              <div className="text-white text-1xl text-center font-semibold uppercase mt-1">Collaborators &amp; <br/> partners </div>
              <div className="text-gray-400 text-1xl text-center mt-1">Cellframe | OVR |<br/>NFTMAPS | Degenpigeon<br/></div>
            </div>
          </div>

          
      </div>
        </div>
    )}
export default Team