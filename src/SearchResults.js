import React from 'react'
import styled from 'styled-components'



const SearchResultsContainer = styled.div `
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 350px;
  margin: 50px 20px;
`
const Img = styled.img `
  width: 350px;
  height: 350px;

  @media (max-width: 767px) {
    width: 200px;
    height: 200px;
  }

  @media (max-width: 380px) {
    width: 100px;
    height: 100px;
  }

`

export default function SearchResults({track, chooseTrack}) {

    function handlePlay() {
      chooseTrack(track)
    }

    return (
      
      <div>

        <SearchResultsContainer onClick={handlePlay}>
          <Img src={track.albumUrl} />
          <div style={{margin: '20px auto', textAlign: 'center'}}>
            <div style={{margin: '5px auto'}}>{track.title}</div>
            <div>{track.artist}</div>
          </div>
        </SearchResultsContainer>
        
      </div>
         
    )
}
