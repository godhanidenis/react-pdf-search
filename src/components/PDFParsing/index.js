import { useState, useCallback, useEffect } from "react";
import { searchPlugin } from "@react-pdf-viewer/search";
import "@react-pdf-viewer/search/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import PDFViewer from "./PDFViewer";
import "@react-pdf-viewer/bookmark/lib/styles/index.css";

export default function Index(props) {
  const { PDFUrl, searchText } = props;
  const searchPluginInstance = searchPlugin();
  const [matches, setMatches] = useState(0);

  const PDF = useCallback(() => {
    return (
      <PDFViewer PDFUrl={PDFUrl} searchPluginInstance={searchPluginInstance} />
    );
  }, []);

  useEffect(() => {
    searchPluginInstance.highlight(searchText).then((data) => {
      console.log("data", data);
      setMatches(data.length);
    });
  }, [searchText]);

  const jumpToMatch = (sign) => {
    if (matches > 0) {
      sign
        ? searchPluginInstance.jumpToNextMatch()
        : searchPluginInstance.jumpToPreviousMatch();
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "100%", height: "95vh", textAlign: "center" }}>
          <PDF />
          <span style={{ marginLeft: "5%", marginRight: "1%" }}>
            Total - {matches || 0}
          </span>
          <button onClick={() => jumpToMatch(true)}>Next</button>
          <span> | </span>
          <button onClick={() => jumpToMatch(false)}>Previous</button>
        </div>
      </div>
    </div>
  );
}
