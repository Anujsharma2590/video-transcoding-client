import { formatDate } from "../../utils";
import { Card } from "../../ui/Card";
import React from "react";
import { useNavigate } from "react-router-dom";

export function VideoCard({ title, thumbnail, id, created_at }) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/video/${id}`);
  };
  return (
    <Card
      className="w-full max-w-xs rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out hover:cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4 flex flex-col items-start">
        <h3 className="text-lg font-semibold">{title}</h3>
        {created_at && (
          <p className="text-sm text-muted-foreground">
            {" "}
            {formatDate(created_at)}
          </p>
        )}
      </div>
    </Card>
  );
}
