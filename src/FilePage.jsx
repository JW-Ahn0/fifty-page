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
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const imageRef = ref(storage, fileName + "/image.jpg");
    const videoRef = ref(storage, fileName + "/video.mp4");
    const selectedvideoRef = ref(storage, fileName + "/selectedvideo.mp4");

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

    getDownloadURL(selectedvideoRef)
      .then((url) => {
        setSelectedVideoUrl(url);
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
            : type === "selectedvideo"
            ? "/selectedvideo.mp4"
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
    <div className="Container">
      <img className="HeaderLogo" src="/img/Photobook.png" alt="HeaderLogo" />
      <img className="Logo" src="/img/50_Page.png" alt="Logo" />
      {imageUrl ? (
        <img className="Requested-Photo" src={imageUrl} alt="RequestedPhoto" />
      ) : (
        "Loading.."
      )}
      {error ? error : <></>}
      <div className="Content-Container">
        {/* 안내문구 컨테이너 */}
        <div className="Info-Container">
          <div className="Info-Text">
            <p className="Info-Text-Title">
              사파리 혹은 크롬에서 다운로드 가능합니다.⭐
            </p>
          </div>
          <div className="Info-Text">
            <span className="Info-Text-Subtitle">
              Download in Safari or Chrome browser⭐
            </span>
          </div>
        </div>
        {/* 버튼 컨테이너 */}
        <div className="Button-Box-Container">
          {/* 사진 다운로드 */}
          <div className="Button-Box">
            <div className="Button-Box-Text">
              <p className="Button-Box-Text-Title">사진 다운로드</p>
              <span className="Button-Box-Text-Subtitle">Download photo</span>
            </div>
            <span className="Dvider"></span>
            <div className="Button-Box-Icon">
              <button onClick={() => downLoadFile(imageUrl, "image")}>
                <img
                  className="Download-Icon"
                  src="/img/Download.svg"
                  alt="Download"
                />
              </button>
            </div>
          </div>
          {/* 선택한 영상 다운로드 */}
          <div className="Button-Box">
            <div className="Button-Box-Text">
              <p className="Button-Box-Text-Title">선택한 영상 다운로드</p>
              <span className="Button-Box-Text-Subtitle">
                Download select video
              </span>
            </div>
            <span className="Dvider"></span>
            <div className="Button-Box-Icon">
              <button
                onClick={() => downLoadFile(selectedVideoUrl, "selectedvideo")}
              >
                <img
                  className="Download-Icon"
                  src="/img/Download.svg"
                  alt="Download"
                />
              </button>
            </div>
          </div>
          {/* 영상 다운로드 */}
          <div className="Button-Box">
            <div className="Button-Box-Text">
              <p className="Button-Box-Text-Title">영상 다운로드</p>
              <span className="Button-Box-Text-Subtitle">Download video</span>
            </div>
            <span className="Dvider"></span>
            <div className="Button-Box-Icon">
              <button onClick={() => downLoadFile(videoUrl, "video")}>
                <img
                  className="Download-Icon"
                  src="/img/Download.svg"
                  alt="Download"
                />
              </button>
            </div>
          </div>
        </div>
        {/* 배너 컨테이너 */}
        <div className="Banner-Container">
          <img src="/img/Event.png" alt="BannerText" />
          <a
            href="https://www.instagram.com/50page.official"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/img/Bottom_Banner.png" alt="BottomBanner" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FilePage;
