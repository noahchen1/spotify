import React from "react";
import styled from "styled-components";

const SearchBarContainer = styled.form`
  display: flex;
  justify-content: center;
  animation: 1s ease forwards fade-in;

  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(10px);
    }
  }
`;
const Input = styled.input`
  width: 85%;
  max-width: 800px;
  height: 30px;
  margin: 20px 0;
  padding: 15px 0 15px 10px;
  border-radius: 0.5rem;
  border-width: 1.5px;
  border-color: rgba(0, 0, 0, 0.3);
  outline: none;
  font-size: 1.1em;
`;

export default function SearchBar({ search, onChange }) {
  return (
    <SearchBarContainer key="search-bar">
      <Input
        type="search"
        value={search}
        placeholder="Search"
        onChange={onChange}
        key="search-input"
        className="search-input"
      />
    </SearchBarContainer>
  );
}
