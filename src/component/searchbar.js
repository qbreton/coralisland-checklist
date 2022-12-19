import styled from "styled-components";

const Search = styled.input`
    width: 30%;
    max-width: 11rem;
`

function SearchBar({ search, setSearch }){
    return (
        <Search type="text" onChange={(e) => setSearch(e.target.value)} />
    )
}

export default SearchBar;