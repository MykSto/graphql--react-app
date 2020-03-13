import React from 'react';
import Aux from 'hoc/Auxiliary';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Spinner from 'component/UI/Spinner/Spinner';


const data = () => {
  const GET_VIEWER = gql`
{
    viewer {
        name
    }
}
`;

  return (
    <Query
      query={GET_VIEWER}
    >
      {({ loading, error, data }) => (
        <Aux>
          { loading && <Spinner />}
          {error && <p>ERROR</p>}
          {!data && <p>Not found</p>}
          {data && data.viewer && (
            Object.keys(data.viewer).map((el, igKey) => (
                <div key={el}>
                <p>{el}:{data.viewer[el]}</p>
                </div>
            )
          )
          )}
          {/* {data && data.viewer && Object.keys(data.viewer).map(el => (data.viewer[el])).map(el=> (el))} */}
          {/* {console.log(data && data.viewer && Object.keys(data.viewer).map(el => (el)))} */}
        </Aux>
      )}
    </Query>
  );
};

export default data;
