import { useParams } from "react-router-dom";
import { storage } from "./firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useState } from "react";

const FilePage = () => {
  const { fileName } = useParams();
  const [fileUrl, setFileUrl] = useState("");
  const [error, setError] = useState("");

  const downLoadFile = (type) => {
    let file = fileName;

    if (type === "video") {
      file += "/video.mp4";
    } else if (type === "image") {
      file += "/image.jpg";
    } else {
      console.log("filetype error");
      return;
    }

    const fileRef = ref(storage, file);

    getDownloadURL(fileRef)
      .then((url) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;

        // 링크 요소를 클릭하여 파일 다운로드 트리거
        document.body.appendChild(link);
        link.click();

        // 링크 요소 제거
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error getting file URL:", error);
        setError("Error getting file URL");
      });
  };

  return (
    <div>
      <button onClick={() => downLoadFile("image")}>사진 다운로드</button>
      <button onClick={() => downLoadFile("video")}>동영상 다운로드</button>
    </div>
  );
};

export default FilePage;
