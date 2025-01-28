import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "@hello-pangea/dnd";

import { useVenue } from "../hooks/UseVenue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faImage, faPenAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "../shared/Button/Button";

const ImageUploader: React.FC = () => {
  const { venue, setVenue } = useVenue();
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState(""); // New state for image alt text

  // Add a new image to the list
  const addImage = (event: React.FormEvent) => {
    event.preventDefault();
    if (!imageUrl.trim() || !imageAlt.trim()) return;

    setVenue((prev) => ({
      ...prev,
      media: [...prev.media, { url: imageUrl, alt: imageAlt }]
    }));

    // Clear input fields after adding image
    setImageUrl("");
    setImageAlt("");
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
    <>
      {/* Image Input Fields */}
      <div className="relative flex flex-col lg:flex-row gap-2 pt-2 mb-4 border-2 p-2 rounded-lg border-dotted border-gray-300 dark:border-customBgDark-500">
        <div className="relative flex-1">
          <FontAwesomeIcon
            icon={faImage}
            className="absolute h-4 w-4 top-5 left-4 transform text-gray-400 peer-focus:text-color4-700 dark:text-gray-500 dark:peer-focus:text-color4-600"
          />
          <input
            id="ImageUploader"
            type="text"
            placeholder=" "
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className={`peer w-full p-2 pl-10 pt-5 pb-2 text-black dark:text-whiteFont-500 bg-white dark:bg-customBgDark-500 border border-gray-300 dark:border-customBgDark-500 rounded-md focus:outline-none focus:ring-2 focus:ring-color4-700 focus:border-color4-600`}
          />
          <label
            htmlFor="ImageUploader"
            className={`absolute rounded-md left-6 top-[-8px] text-gray-500 dark:text-whiteFont-700 bg-white text-sm dark:bg-customBgDark-500 px-1 transition-all 
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
                peer-focus:top-[-8px] peer-focus:text-sm peer-focus:text-color4-800 dark:peer-focus:text-whiteFont-600 peer-placeholder-shown:left-11 peer-focus:left-6
                  
                `}
          >
            Enter image URL
          </label>
        </div>

        <div className="relative flex-1">
          <FontAwesomeIcon
            icon={faPenAlt}
            className="absolute h-4 w-4 top-5 left-4 transform text-gray-400 peer-focus:text-color4-700 dark:text-gray-500 dark:peer-focus:text-color4-600"
          />
          <input
            id="AltTextUploader"
            type="text"
            placeholder=" "
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            className={`peer w-full p-2 pl-10 pt-5 pb-2 text-black dark:text-whiteFont-500 bg-white dark:bg-customBgDark-500 border border-gray-300 dark:border-customBgDark-500 rounded-md focus:outline-none focus:ring-2 focus:ring-color4-700 focus:border-color4-600`}
          />
          <label
            htmlFor="AltTextUploader"
            className={`absolute rounded-md left-6 top-[-8px] text-gray-500 dark:text-whiteFont-700 bg-white text-sm dark:bg-customBgDark-500 px-1 transition-all 
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base 
                peer-focus:top-[-8px] peer-focus:text-sm peer-focus:text-color4-800 dark:peer-focus:text-whiteFont-600 peer-placeholder-shown:left-11 peer-focus:left-6
                  
                `}
          >
            Enter image description (alt text)
          </label>
        </div>

        <Button onClick={(event) => addImage(event)} className="">
          Add Image
        </Button>
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
                      {/* Image Description */}
                      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center text-sm p-1">
                        {image.alt}
                      </div>
                      {/* Remove Button */}
                      <Button
                        buttonType="violetSecondary"
                        onClick={(event) => removeImage(event, index)}
                        className="absolute top-2 right-2 bg-color5-500 text-white hover:bg-color1-800 p-0 w-6 h-6 flex items-center justify-center rounded"
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
