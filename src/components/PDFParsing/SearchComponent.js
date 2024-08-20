import { useEffect } from "react";

const SearchComponent = ({ SearchProps, searchText }) => {
  const HandleSearch = async () => {
    try {
      await SearchProps.setKeyword(searchText);
      console.log(searchText);
    } catch (error) {
      console.log(error);
    } finally {
      SearchProps.search();
      console.log("finallu", SearchProps);
    }
  };

  useEffect(() => {
    HandleSearch();
  }, [searchText]);
};

export default SearchComponent;
