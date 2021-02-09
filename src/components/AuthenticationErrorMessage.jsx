import React from 'react';

const AuthenticationErrorMessage = () => {
  return (
    <div style={{color: 'rgb(139, 58, 58)'}}>
      <h1>401: Authentication Error</h1>
      <p>Don't forget to add the <var>appid</var> in
        <var> src/config/weather.json</var> and refresh the page.
      </p>
    </div>
  );
}

export default AuthenticationErrorMessage;
