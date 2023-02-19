import { useContext, useEffect, useState } from "react"
import { AppContext } from "../Contexts/AppContext"
import Home from "./Home";

export default function Login() {
    const redirectUri = 'http://localhost:5173/';
    const scopes = 'user-library-read user-library-modify app-remote-control user-top-read streaming user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played';
    const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`
    
    
    const [code, setCode] = useState<string | null>(null);
    
    const { dispatch, isLoggedIn, accessToken } = useContext(AppContext)
    
    const setAccessAndRefreshTokens = (access_token: string, refresh_token: string) => { 
        dispatch({type: 'setAccessAndRefreshTokens', payload: {accessToken: access_token, refreshToken: refresh_token}});
        dispatch({type: 'Login'});
    }
    
    useEffect(()=>{
        if(!code){
            setCode(new URLSearchParams(window.location.search).get('code'))
        }
    },[isLoggedIn])

    useEffect(()=>{
        if(code && accessToken === ''){
            const headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Authorization', 'Basic ' + btoa(import.meta.env.VITE_CLIENT_ID + ':' + import.meta.env.VITE_CLIENT_SECRET));
            
            const body = new URLSearchParams();
            body.append('grant_type', 'authorization_code');
            body.append('code', code);
            body.append('redirect_uri', redirectUri);
            
            fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: headers,
            body: body
            })
            .then(response => response.json())
            .then(data => {
                setAccessAndRefreshTokens(data.access_token, data.refresh_token);
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                localStorage.setItem('expiration_time', (Date.now()/ 1000) + data.expires_in);
            })
                // store the tokens securely and use them to authenticate requests to the Spotify Web API on behalf of the user
            .catch(error => {
                console.error(error);
            });
            
            const newUrl = window.location.href.replace(/\?code=.*$/, '');
            window.history.replaceState({}, document.title, newUrl);  
        } else return
    },[code])
    
    function refreshAccessToken() {
        const currentTime = Date.now() / 1000;
        const expirationTime = Number(localStorage.getItem('expiration_time'));
    
        if (currentTime > expirationTime) {
            const refreshToken = localStorage.getItem('refresh_token');
            const headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Authorization', 'Basic ' + btoa(import.meta.env.VITE_CLIENT_ID + ':' + import.meta.env.VITE_CLIENT_SECRET));
    
            const body = new URLSearchParams();
            body.append('grant_type', 'refresh_token');
            if(refreshToken){
                body.append('refresh_token', refreshToken);
            }
    
            fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: headers,
                body: body
            })
            .then(response => response.json())
            .then(data => {
                // Store the new access token in local storage
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('expiration_time', (Date.now() / 1000) + data.expires_in);
            })
            .catch(error => {
                console.error(error);
            });
        }
    }
    
    
    useEffect(() => {
        setInterval(refreshAccessToken, 1800000)
    },[])
    
    return (
        <>
            { isLoggedIn ? 
                <Home /> :
                 <div className="bg-[#1E1E1E] min-h-screen flex flex-col items-center justify-center">
                    <p className="text-white font-bold text-[2rem] tracking-wide">Welcome!</p>
                    <button 
                        onClick={()=>{
                            window.location.assign(authorizeUrl)
                        }}
                        className="bg-green-400 mt-2 text-white font-bold p-2 rounded-md text-[1.1rem] hover:bg-green-700 transition delay-200"
                    >
                        Login with Spotify
                    </button>
                </div>
            }
        </>
    )
}
