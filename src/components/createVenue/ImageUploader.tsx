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
import LoaderSmall from "../ui/LoaderSmall";
import { Media } from "../library/types";
import Input from "../ui/Input";
import {
  FieldValues,
  UseFormRegister,
  FieldErrors,
  Path
} from "react-hook-form";
import P from "../shared/Typography/P";

interface ImageUploaderProps<T extends FieldValues> {
  media: Media[];
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  setMedia: (media: Media[]) => void;
}

const MAX_IMAGES = 8;

const ImageUploader = <T extends FieldValues>({
  media,
  setMedia,
  register,
  errors
}: ImageUploaderProps<T>) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Add a new image with loading effect
  const addImage = async (event: React.FormEvent) => {
    event.preventDefault();

    if (media.length === MAX_IMAGES) {
      setError(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }

    if (
      (!imageUrl.trim() && imageAlt.trim()) ||
      (imageUrl.trim() && !imageAlt.trim())
    ) {
      setError("Both Image URL and Alt Text are required.");
      return;
    }

    if (!imageUrl.trim() && !imageAlt.trim()) {
      setError("");
      return;
    }

    setLoading(true);

    const newImage = { url: imageUrl.trim(), alt: imageAlt.trim() };

    setTimeout(() => {
      setMedia([...media, newImage]);
      setImageUrl("");
      setImageAlt("");
      setError("");
      setLoading(false);
    }, 500);
  };

  // Remove an image
  const removeImage = (event: React.FormEvent, index: number) => {
    event.preventDefault();
    setMedia(media.filter((_, i) => i !== index));
  };

  // Handle alt text editing for existing images
  const updateAltText = (index: number, newAlt: string) => {
    const updatedMedia = [...media];
    updatedMedia[index] = { ...updatedMedia[index], alt: newAlt };
    setMedia(updatedMedia);
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
        <Input
          InputId={"imageUrl" as Path<T>}
          InputLabel="Enter Image URL"
          icon={faImage}
          register={register}
          errors={errors}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <Input
          InputId={"imageAlt" as Path<T>}
          InputLabel="Alt text"
          icon={faPenAlt}
          register={register}
          errors={errors}
          value={imageAlt}
          onChange={(e) => setImageAlt(e.target.value)}
        />

        {error && <P className="text-red-500 text-sm mx-2">{error}</P>}

        <Button className="mx-auto" onClick={addImage} disabled={loading}>
          {loading ? <LoaderSmall /> : "Add Image"}
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
                      className="relative h-48 border rounded-md cursor-move flex flex-col"
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-32 object-cover border rounded-md cursor-move"
                      />
                      {/* Image Description Editing */}
                      <Input
                        InputId={`media.${index}.alt` as Path<T>}
                        InputLabel="Alt text"
                        icon={faPenAlt}
                        register={register}
                        errors={errors}
                        value={image.alt}
                        onChange={(e) => updateAltText(index, e.target.value)}
                      />
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
