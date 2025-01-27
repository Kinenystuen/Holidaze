import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "@hello-pangea/dnd";

import { useVenue } from "../hooks/UseVenue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const ImageUploader: React.FC = () => {
  const { venue, setVenue } = useVenue();
  const [imageUrl, setImageUrl] = useState("");

  // Add a new image to the list
  const addImage = (event: React.FormEvent) => {
    event.preventDefault();
    if (!imageUrl.trim()) return;
    setVenue((prev) => ({
      ...prev,
      media: [...prev.media, { url: imageUrl, alt: "Venue Image" }]
    }));
    setImageUrl(""); // Clear input field after adding image
  };

  // Remove an image from the list
  const removeImage = (event: React.FormEvent, index: number) => {
    event.preventDefault();
    setVenue((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedMedia = Array.from(venue.media);
    const [movedImage] = reorderedMedia.splice(result.source.index, 1);
    reorderedMedia.splice(result.destination.index, 0, movedImage);

    setVenue((prev) => ({ ...prev, media: reorderedMedia }));
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md">
      {/* Image Input Field */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          onClick={(event) => addImage(event)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Image
        </button>
      </div>

      {/* Image List with Drag-and-Drop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="imageList">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className=" gap-2 flex-wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              {venue.media.map((image, index) => (
                <Draggable
                  key={index}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="relative h-48 group border rounded-md cursor-move"
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover border rounded-md cursor-move"
                      />
                      {/* Remove Button */}

                      <button
                        onClick={(event) => removeImage(event, index)}
                        className="absolute top-2 right-2 bg-color5-500 text-white p-0 w-6 h-6 flex items-center justify-center rounded"
                      >
                        <FontAwesomeIcon icon={faClose} className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ImageUploader;
