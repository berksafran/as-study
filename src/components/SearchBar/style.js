import styled from "styled-components";

const SearchBarContainer = styled.div`
  .root {
    padding: 2px 4px;
    padding-left: 0px;
    display: flex;
    align-items: center;
  }
  .iconButton {
    padding: 10px;
  }

  .menuButton {
    padding: 0;
    margin: 0;
  }

  .inputStyle {
    margin-left: 4px;
    flex: 1;
    font-size: 1.5em;
  }

  .divider {
    height: 28px;
    margin: 4px;
  }
`;

export default SearchBarContainer;
