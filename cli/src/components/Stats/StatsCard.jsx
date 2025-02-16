const StatsCard = ({ title, amount,img }) => {
    return (
      <div className="card-item bg-old-paper p-8 rounded-lg">
        <div className="flex gap-x-4">
          <div className="rounded-full bg-white w-16 h-16 p-3">
            <img src={img} alt="" />
          </div>
          <div >
            <p className="mb-2 text-lg font-medium text-black">{title}</p>
            <p className="text-xl font-semibold text-black">{amount}</p>
          </div>
        </div>
      </div>  
    );
  };
  
  export default StatsCard;