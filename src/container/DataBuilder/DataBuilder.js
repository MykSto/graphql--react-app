import React from 'react';
import Spinner from 'component/UI/Spinner/Spinner';
import Aux from 'hoc/Auxiliary';
import Login from 'component/UI/Form/Login/Login';
import Button from 'component/UI/Button/Button';

const accessToken = localStorage.getItem('token');

fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
        Authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify({
        query: `
        {
            viewer {
                name
            }
        }
        `
    })
}).then(res => res.json())
.then(json => console.log(json))
 
const DataBuilder = () => {
  const accessTokenHandler = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Aux>
      {accessToken ? <Button clicked={accessTokenHandler} btnType="Danger">Logout</Button> : <Login />}
    </Aux>
  );
};

export default DataBuilder;
