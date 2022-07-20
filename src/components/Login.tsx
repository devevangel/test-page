import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

const Login = ({ setAuthState, history }: any) => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault()
        setLoading(true)
        setError('')

        const reqBody = {
            logon: userName,
            password: password
        }

        axios.post('https://api.devcatalog.net/user/login', reqBody, {
            headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
        }).then((response) => {
            console.log(response)
            setLoading(false)
            history.push('/main')
        }).catch((error) => {
            setError(error.response.data.payload.detail.message)
            setLoading(false)
        })

        setUserName('')
        setPassword('')
    }


    return (
        <div className='container'>
            <div className='auth-container'>
                <div className='auth-onboarding'>
                    <div className='auth-dev-log'>
                        <h3 className='log-header'>DevCatalog</h3>
                        <div className='log-grid'>
                            Discover developers, assets and helpful resources fast and securely
                        </div>
                    </div>
                    <div className='auth-image-container'>
                        <div className='auth-image'>
                            <p className='auth-text'>Img goes here</p>
                        </div>
                    </div>
                </div>
                <div className='auth-main'>
                    <div className='form-container'>
                        <h2>LOGIN</h2>
                        {loading && (<h4>Loading...</h4>)}
                        {error && (<h4>{error}</h4>)}
                        <form className='form' onSubmit={handleSubmit}>
                            <div>
                                <div className='form-group'>
                                    <input
                                        type="text"
                                        className="form-input"
                                        name="username"
                                        placeholder="Enter username"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}

                                    />
                                </div>
                                <div className='form-group'>
                                    <input
                                        type="password"
                                        className="form-input"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="signup-form-submit">
                                    LOGIN
                                </button>
                            </div>
                        </form>
                        <p>
                            Don't have an account? <span onClick={() => setAuthState('reg')} className='auth-direction'>Signup here</span>
                        </p>
                        <div className='terms'>By registering you are agreeing to the Terms of service and acknowledge the Privacy Policy</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)