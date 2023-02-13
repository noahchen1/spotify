import { useState, useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from './url/serverUrl';

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    useEffect(() => {
        axios.post(`${serverUrl}/login`, {code}).then(res => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
            window.history.pushState({}, null, "/")               // Remove code from the URL after '/'
        }).catch(err => {
            //window.location = "/"
            console.log(err)
        })
    }, [code])

    useEffect(() => {
        if(!refreshToken || !expiresIn) return
        const interval = setInterval(() => {
            axios.post(`${serverUrl}/refresh`, {refreshToken}).then(res => {
                setAccessToken(res.data.accessToken)
                setExpiresIn(res.data.expiresIn)
            }).catch(() => {
                //window.location = "/"
                console.log("there is an error")
            })
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    return  accessToken
}