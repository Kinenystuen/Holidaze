import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "@hello-pangea/dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faImage, faPenAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "../shared/Button/Button";
import { Media } from "../library/types";

interface ImageUploaderProps {
  media: Media[];
  setMedia: (media: Media[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ media, setMedia }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  // Add a new image
  const addImage = (event: React.FormEvent) => {
    event.preventDefault();
    if (!imageUrl.trim() || !imageAlt.trim()) return;

    setMedia([...media, { url: imageUrl, alt: imageAlt }]);

    // Clear inputs
    setImageUrl("");
    setImageAlt("");
  };

  // Remove an image
  const removeImage = (event: React.FormEvent, index: number) => {
    event.preventDefault();
    setMedia(media.filter((_, i) => i !== index));
  };

  // Handle drag-and-drop sorting
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedMedia = Array.from(media);
    const [movedImage] = reorderedMedia.splice(result.source.index, 1);
    reorderedMedia.splice(result.destination.index, 0, movedImage);

    setMedia(reorderedMedia);
  };

  return (
    <>
      {/* Image Input Fields */}
      <div className="relative flex flex-col gap-2 pt-2 mb-4 border-2 p-2 rounded-lg border-dotted border-gray-300 dark:border-customBgDark-500">
        <div className="relative flex-1">
          <FontAwesomeIcon
            icon={faImage}
            className="absolute h-4 w-4 top-5 left-4 text-gray-400"
          />
          <input
            id="ImageUploader"
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="peer w-full p-2 pl-10 text-black dark:text-whiteFont-500 bg-white dark:bg-customBgDark-500 border border-gray-300 dark:border-customBgDark-500 rounded-md focus:outline-none focus:ring-2 focus:ring-color4-700"
          />
        </div>

        <div className="relative flex-1">
          <FontAwesomeIcon
            icon={faPenAlt}
            className="absolute h-4 w-4 top-5 left-4 text-gray-400"
          />
          <input
            id="AltTextUploader"
            type="text"
            placeholder="Enter image description (alt text)"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            className="peer w-full p-2 pl-10 text-black dark:text-whiteFont-500 bg-white dark:bg-customBgDark-500 border border-gray-300 dark:border-customBgDark-500 rounded-md focus:outline-none focus:ring-2 focus:ring-color4-700"
          />
        </div>

        <Button onClick={addImage}>Add Image</Button>
      </div>

      {/* Image List with Drag-and-Drop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="imageList">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="gap-2 flex-wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              {media.map((image, index) => (
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
                      className="relative h-48 border rounded-md cursor-move"
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover border rounded-md cursor-move"
                      />
                      {/* Image Description */}
                      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center text-sm p-1">
                        {image.alt}
                      </div>
                      {/* Remove Button */}
                      <Button
                        buttonType="violetSecondary"
                        onClick={(event) => removeImage(event, index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 w-6 h-6 flex items-center justify-center rounded"
                      >
                        <FontAwesomeIcon icon={faClose} className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default ImageUploader;
