import "./FilePage.css";
import { useParams } from "react-router-dom";
import { storage } from "./firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
const FilePage = () => {
  const params = useParams();
  const fileName = params.fileName;
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const imageRef = ref(storage, fileName + "/image.jpg");
    const videoRef = ref(storage, fileName + "/video.mp4");
    getDownloadURL(imageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => setError(error));

    getDownloadURL(videoRef)
      .then((url) => {
        setVideoUrl(url);
      })
      .catch((error) => setError(error));
  }, [fileName]);

  const downLoadFile = (url, type) => {
    // console.log(url);
    // const link = document.createElement("a");
    // link.href = url;
    // link.download = fileName;

    // // 링크 요소를 클릭하여 파일 다운로드 트리거
    // document.body.appendChild(link);
    // link.click();

    // // 링크 요소 제거
    // document.body.removeChild(link);

    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement("a");
        a.href = url;
        a.download =
          fileName +
          (type === "video"
            ? "/video.mp4"
            : type === "image"
            ? "/image.jpg"
            : "");

        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("파일 다운로드 오류:", error);
      });
  };

  return (
    <div className="container">
      <img className="logo" src="/downloadPage_logo.png" alt="fiftypagelogo" />
      {imageUrl ? (
        <img className="requestedPhoto" src={imageUrl} alt="requestedPhoto" />
      ) : (
        "Loading.."
      )}
      {error ? error : <></>}
      <div className="contentContainer">
        <p>사파리 혹은 크롬에서 다운로드 가능합니다.</p>
        <div>
          <button
            className="downloadContainer"
            onClick={() => downLoadFile(imageUrl, "image")}
          >
            <div className="downloadText">
              <span>사진 다운로드</span>
              <span>DOWNLOAD PHOTO</span>
            </div>
            <img className="download" src="/download.png" alt="download" />
          </button>
          <button
            className="downloadContainer"
            onClick={() => downLoadFile(videoUrl, "video")}
          >
            <div className="downloadText">
              <span>동영상 다운로드</span>
              <span>DOWNLOAD VIDEO</span>
            </div>
            <img className="download" src="/download.png" alt="download" />
          </button>
        </div>
        <div className="instaContainer">
          50page.official
          <a
            href="https://www.instagram.com/50page.official"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="instaImage" src="/instagram.png" alt="instagram" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FilePage;
