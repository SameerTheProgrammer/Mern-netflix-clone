import { useContext, useState, useEffect } from "react";
import "./newMovie.css";
import storage from "../../firebase";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext"; 

export default function NewMovie() {
  const [movie, setMovie] = useState({});
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [loading, setLoading] = useState(false); // Loader state
  const [error, setError] = useState(""); // Error state
  const [cancelUpload, setCancelUpload] = useState(false); // Cancel upload state

  const { dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const upload = (items) => {
    setLoading(true); // Show loader
    setError(""); // Reset error state
    setCancelUpload(false); // Reset cancel state
    let uploadTasks = [];

    items.forEach((item, index) => {
      if (cancelUpload) return; // Stop further uploads if cancel is triggered

      const fileName = new Date().getTime() + item.label + item.file?.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTasks.push(uploadTask);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (err) => {
          console.log(err);
          setError("Failed to upload files. Please try again."); // Set error message
          setCancelUpload(true); // Trigger cancel for ongoing uploads
          setLoading(false); // Hide loader on error
          uploadTasks.forEach((task) => task.cancel()); // Cancel all ongoing uploads
        },
        () => {
          if (cancelUpload) return; // If cancel triggered, do nothing

          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  useEffect(() => {
    if (uploaded === 5) {
      setLoading(false); // Hide loader when all uploads are done
      setError("");
    }
  }, [uploaded]);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!img || !imgTitle || !imgSm || !trailer || !video) {
      alert("Select all Files");
      return;
    }
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovie(movie, dispatch);
    setError("");
    setUploaded(0);
    setImg(null);
    setImgTitle(null);
    setImgSm(null);
    setTrailer(null);
    setVideo(null);
    setMovie({});
  };

  return (
    <div className="newProduct">
      {loading && (
        <div className="loader-overlay">
          <div className="loader">
            <p>Movie is uploading...</p>
          </div>
        </div>
      )}
      {error && <div className="errorMessage">{error}</div>}
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        {/* Form Fields */}
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title image</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Thumbnail image</label>
          <input
            type="file"
            id="imgSm"
            name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="John Wick"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year"
            name="year"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Genre"
            name="genre"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="Duration"
            name="duration"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="limit"
            name="limit"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        {uploaded === 5 ? (
          <button className="addProductButton" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
