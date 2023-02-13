import React from 'react'
import styled from 'styled-components'



const MobileSearchResultsContainer = styled.div `
    display: flex;
    margin: 5px 0;
`

const Image = styled.img `
    width: 80px;
    height: 80px;
`

const TrackDescription = styled.div `
    margin-top: auto;
    margin-left: 10px;
`

export default function MobileSearchResults({track, chooseTrack}) {

    function handlePlay() {
        chooseTrack(track)
      }

    return (

        <MobileSearchResultsContainer onClick={handlePlay}>
             <Image src={track.albumUrl} />
             <TrackDescription>
                <div>{track.title}</div>
                <div>{track.artist}</div>
             </TrackDescription>
        </MobileSearchResultsContainer>

    )
}