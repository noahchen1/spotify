import React from 'react'
import { useState, useEffect } from 'react'
import useAuth from "./useAuth"
import SearchResults from "./SearchResults"
import Player from "./Player"
import SearchBar from "./SearchBar"
import MobileSearchResults from "./MobileSearchResults.js"
import SpotifyWebApi from 'spotify-web-api-node'
import { useMediaQuery } from 'react-responsive'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import axios from 'axios'
import styled from 'styled-components'


const spotifyApi = new SpotifyWebApi({
    clientId: "ee791348c2724f159aa8c08bd6783452",
})

const SlideWrapper = styled.div `
  display: flex;
  justify-content: center;
  animation: 1s ease forwards fade-in;

  @keyframes fade-in {
    0% {opacity: 0;}
    100% {opacity: 1;}
  }
`


export default function Dashboard({code}) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState("")

    const isDesktop = useMediaQuery({
      query: '(min-width: 1224px) and (max-width: 1679px)'
    })

    const isBigScreen = useMediaQuery({
      query: '(min-width: 1680px)'
    })

    const isSmallDesktop = useMediaQuery({
      query: '(min-width: 1051px) and (max-width: 1224px)'
    })

    const isSmallerDesktop = useMediaQuery({
      query: '(min-width: 771px) and (max-width: 1050px)'
    })

    const isMobile = useMediaQuery({
      query: '(max-width: 770px)'
    })



    function chooseTrack(track) {
      setPlayingTrack(track)
      setSearch("")
      setLyrics("")
    }

     
    useEffect(() => {
      if (!playingTrack) return
      axios.get("https://songs-player.herokuapp.com:80/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist
        }
      }).then(res => {
        setLyrics(res.data.lyrics)
      })
    }, [playingTrack]) 
    
    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return
    
        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
          if (cancel) return
          setSearchResults(
            res.body.tracks.items.map(track => {
              const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                  if (image.height > smallest.height) return image
                  return smallest
                },
                track.album.images[0]
              )
    
              return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url,
                href: track.href
              }
            })
          )
        })
    
        return () => (cancel = true)
      }, [search, accessToken])




 
    return (

        <div style={{height:"100vh", position: "relative"}}>
            <SearchBar 
              search={search}
              onChange={e => setSearch(e.target.value)}
            />

            {isBigScreen && searchResults.length !== 0 &&
                    <SlideWrapper>
                      <Splide
                        options={{
                          type: 'loop',
                          perPage: 4,
                          focus: 'center',
                          width: '80%',
                        }}
    
                      >
                        {searchResults.map(track => (
                          <SplideSlide>
                            <SearchResults track={track} key={track.url} chooseTrack={chooseTrack}/>
                          </SplideSlide>
                        ))}
                      </Splide>
                  </SlideWrapper>
                  }

            {isDesktop && searchResults.length !== 0 &&
               <SlideWrapper>
                  <Splide
                    options={{
                      type: 'loop',
                      perPage: 4,
                      focus: 'center',
                      width: '100%',
                    }}

                  >
                    {searchResults.map(track => (
                      <SplideSlide>
                        <SearchResults track={track} key={track.url} chooseTrack={chooseTrack}/>
                      </SplideSlide>
                    ))}
                  </Splide>
                </SlideWrapper>      
            }

            {isSmallDesktop && searchResults.length !== 0 && 
                <SlideWrapper>
                  <Splide
                    options={{
                      type: 'loop',
                      perPage: 3,
                      focus: 'center',
                      width: '100%',
                    }}

                  >
                    {searchResults.map(track => (
                      <SplideSlide>
                        <SearchResults track={track} key={track.url} chooseTrack={chooseTrack}/>
                      </SplideSlide>
                    ))}
                  </Splide>
                </SlideWrapper>
            }

            {isSmallerDesktop && searchResults.length !== 0 &&
                <SlideWrapper>
                  <Splide
                    options={{
                      type: 'loop',
                      perPage: 2,
                      focus: 'center',
                      width: '100%',
                    }}

                  >
                    {searchResults.map(track => (
                      <SplideSlide>
                        <SearchResults track={track} key={track.url} chooseTrack={chooseTrack}/>
                      </SplideSlide>
                    ))}
                  </Splide>
                </SlideWrapper>
            }

            {isMobile && searchResults.length !== 0 && 
              <div style={{width: '80%', height: "80%", margin: 'auto', overflowY: "auto"}}>
                {searchResults.map(track => (
                  <MobileSearchResults 
                    track={track}
                    key={track.url}
                    chooseTrack={chooseTrack}
                  />
                ))}
              </div>
            }

            {searchResults.length === 0 && (
              <div style={{textAlign: 'center', height: '70%', overflowY: 'auto', whiteSpace: 'pre-wrap', margin: '50px auto'}}> 
                {lyrics}
              </div>  
            )} 


            <div style={{position: "absolute", bottom: "0", left: "0", width: "100%"}}>
              <Player 
                accessToken = {accessToken}
                trackUri = {playingTrack?.uri}

              />
            </div>
        </div>


    )
}



