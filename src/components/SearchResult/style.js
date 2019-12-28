import styled from "styled-components";

const SearchResultContainer = styled.div`
  .container {
    margin-left: 0px !important;
  }

  .paper {
    padding: 8px;
    text-align: center;
    color: rgba(0, 0, 0, 0.54);
    justify-content: center;
    flex-direction: column;
    margin-left: 0px !important;

    :hover {
      background-color: rgba(0, 0, 0, 0.08);
      cursor: pointer;
    }

    img {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
`;

export default SearchResultContainer;
