import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

const Register = ({ setAuthState, history }: any) => {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            setError("Passwords don't match")
            return
        }

        setLoading(true)
        setError('')

        const reqBody = {
            email: email,
            password: password,
            name: userName,
            description: "DevCatalog catcha verification",
            captcha: "6Leqy9cfAAAAAAlgF3U0tiKWXM52XbQtgORSoLUq"
        }

        axios.post('https://api.devcatalog.net/user/register', reqBody, {
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
        setConfirmPassword('')
        setEmail('')
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
                        <h2>SIGN UP</h2>
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
                                <div className='form-group'>
                                    <input
                                        type="password"
                                        className="form-input"
                                        name="confirmPassword"
                                        placeholder="Enter confirm password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <div className='form-group'>
                                    <input
                                        type="email"
                                        className="form-input"
                                        name="confirmPassword"
                                        placeholder="Enter email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="signup-form-submit">
                                    REGISTER
                                </button>
                            </div>
                        </form>
                        <p>
                            Already have an account? <span className='auth-direction' onClick={() => setAuthState('in')}>Log in here.</span>
                        </p>
                        <div className='terms'>By registering you are agreeing to the Terms of service and acknowledge the Privacy Policy</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Register)