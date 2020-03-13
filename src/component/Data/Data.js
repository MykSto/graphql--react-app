import React, { useState } from 'react';
import Aux from 'hoc/Auxiliary';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Button from 'component/UI/Button/Button';
// import { Mutation } from 'react-apollo';
import Spinner from 'component/UI/Spinner/Spinner';


const Data = () => {
  const [data, setData] = useState({
    user: '',
  });

  const GET_VIEWER = gql`
  query getViewer($user: String!)
{
    user(login: $user) {
        repositories{
            totalCount
        }
    }
}
`;
  const { user } = data;

  return (
    <Aux>
      <div>
        <input onChange={(e) => setData({ user: e.target.value })} />
      </div>

      <Query
        variables={{ user }}
        query={GET_VIEWER}
      >

        {({ loading, error, data }) => (
          <Aux>
            { loading && <Spinner />}
            {error && <p>ERROR</p>}
            {!data && <p>Not found</p>}
            {data && data.user.repositories && (
              Object.keys(data.user.repositories).map((el) => (
                <div key={el}>
                  <p>
                    {el}
                    :
                    {data.user.repositories[el]}
                  </p>
                </div>
              ))
            )}
            {(getViewer) => <Button clicked={getViewer} btnType="Danger">Submit</Button>}
          </Aux>
        )}
      </Query>
    </Aux>
  );
};

export default Data;
