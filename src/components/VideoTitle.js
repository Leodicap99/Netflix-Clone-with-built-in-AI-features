function VideoTitle({name,desc}){
    return (
      <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
        <h1 className="font-bold text-4xl text-white">{name}</h1>
        <h1 className="font-bold text-xl my-5 text-white">{desc}</h1>
        <div>
          <button className="mt-5 mr-5 border-2 h-10 w-32 text-xl border-transparent bg-white text-black rounded-md">
            ▶️ Play
          </button>
          <button className="mt-5 mr-5 border-2 h-10 w-32 text-xl border-transparent bg-slate-600 text-white rounded-md">
            More Info
          </button>
        </div>
      </div>
    );
}
export default VideoTitle;