import ImageCard from "./ImageCard"

function ImageGallery({ images, onDelete, onClick }) {
    return (
     
      <div className="flex flex-wrap justify-center">
        {images.map((item, index) => {
          return (
            <div className="m-1" key={item.postID}>
              <ImageCard
                key={item.postID}
                postID={item.postID}
                img_path={item.img_path}
                description={item.description}
                onDelete={() => onDelete(item.postID, item.password)}
                onClick={() => onClick(item.postID, item.description, item.img_path)}
              />
            </div>
          );
        })}
      </div>
    );
  }

export default ImageGallery