import { Card } from "../../ui/Card";
import React from "react";
import { useNavigate } from "react-router-dom";

export function VideoCard({ title, thumbnail, uploader, id}) {
  const navigate = useNavigate();
console.log(id)
  const handleCardClick = () => {
    navigate(`/video/${id}`);
  };
  return (
    <Card className="w-full max-w-xs rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out hover:cursor-pointer"  onClick={handleCardClick}>
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4 flex flex-col items-start">
        <h3 className="text-lg font-semibold">{title}</h3>
        {uploader && <p className="text-sm text-muted-foreground">{uploader}</p>}
      </div>
    </Card>
  );
}
