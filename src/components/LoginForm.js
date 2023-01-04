import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Log in to the application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username:&nbsp;
          <input type="text" value={username} id="username" name="Username" onChange={handleUsernameChange} />
        </div>
        <div>
          password:&nbsp;
          <input type="password" value={password} id="password" name="Password" onChange={handlePasswordChange} />
          <br /><br />
          <button type="submit" id="login-button">login</button>
        </div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm