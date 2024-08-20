import { useState, useCallback, useEffect } from "react";
import { searchPlugin } from "@react-pdf-viewer/search";
import "@react-pdf-viewer/search/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { getArea, getPlugin } from "./util";
import PDFViewer from "./PDFViewer";
import { bookmarkPlugin } from "@react-pdf-viewer/bookmark";
import "@react-pdf-viewer/bookmark/lib/styles/index.css";
import SearchComponent from "./SearchComponent";

export default function Index(props) {
  const { PDFUrl, searchText } = props;
  const searchPluginInstance = searchPlugin();
  const { Search } = searchPluginInstance;
  const bookmarkPluginInstance = bookmarkPlugin();
  const [coordinates, setCoordinates] = useState({
    x1: 1,
    y1: 20,
    x2: 1,
    y2: 10,
    x3: 20,
    y3: 20,
    x4: 10,
    y4: 10,
  });

  const PDF = useCallback(() => {
    const calcArea = getArea({ ...coordinates });
    const highlightPluginInstance = getPlugin(calcArea);
    return (
      <PDFViewer
        PDFUrl={PDFUrl}
        highlightPluginInstance={highlightPluginInstance}
        searchPluginInstance={searchPluginInstance}
        bookmarkPluginInstance={bookmarkPluginInstance}
      />
    );
  }, [coordinates]);

  let previousSearchText = "";

  function HandleSearch(SearchProps) {
    if (searchText !== previousSearchText) {
      SearchProps.searchFor([searchText]).then((data) => {
        console.log("data", data);
      });
      previousSearchText = searchText;
    }
  }

  // const HandleSearch = async (SearchProps) => {
  //   try {
  //     if (searchText === previousSearchText) return;
  //     await SearchProps.setKeyword(searchText);
  //     console.log("1", SearchProps);
  //     await SearchProps.search();
  //     console.log("2", SearchProps);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "100%", height: "95vh" }}>
          {/* <Search>
            {(SearchProps) => (
              <SearchComponent
                SearchProps={SearchProps}
                searchText={searchText}
              />
            )}
          </Search> */}
          <Search>{(SearchProps) => HandleSearch(SearchProps)}</Search>
          <PDF />
        </div>
      </div>
    </div>
  );
}
