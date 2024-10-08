import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import { apiUrl } from "../../constant";
import { useEffect, useState } from "react";
import "./featured.scss";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState(null); // Initialize as null

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`${apiUrl}/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        console.log("API Response:", res.data); // Log the response to check its structure
        if (res.data && res.data.length > 0) {
          setContent(res.data[0]);
        } else {
          setContent(null); // Handle case where no content is returned
        }
      } catch (err) {
        console.log(err);
        setContent(null); // Handle errors by setting content to null
      }
    };
    getRandomContent();
  }, [type]);

  console.log(content); // Log content for debugging

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      {content?.img && <img src={content.img} alt="Featured" />}
      <div className="info">
        {content?.imgTitle && <img src={content.imgTitle} alt="Title" />}
        <span className="desc">{content?.desc}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
