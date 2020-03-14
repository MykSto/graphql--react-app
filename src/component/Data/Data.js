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
    owner: '',
    pullQuant: 0,
    issueQuant: 0,
    issueState: [],
  });

  const GET_VIEWER = gql`
  query getViewer($name: String!, $owner: String!, $pullQuant: Int, $issueQuant: Int, $issueState: [IssueState!])
{ 
    repository(name: $name, owner: $owner){
        issues(last: $issueQuant, states: $issueState){
            edges{
              node{
                title
              }
            }
          }
          pullRequests(last: $pullQuant){
            edges{
                node{
                    title
                }
            }
        }
    }
}
`;
  const { name, owner, pullQuant, issueQuant, issueState } = data;

  const _lastArray = (arr) => arr[arr.length - 1];

  const issueStateHandler = (event) => {
      setData({...data, issueState: event.target.value})
  }

  return (
    <Aux>
      <div>
        <label>Repository</label>
        <input onChange={(e) => setData({ ...data, name: e.target.value })} />
        <label>User</label>
        <input onChange={(e) => setData({ ...data, owner: e.target.value })} />
        <label>pullQuant</label>
        <input type="number" onChange={(e) => setData({ ...data, pullQuant: parseInt(e.target.value, 10) })} />
        <label>issueQuant</label>
        <input type="number" onChange={(e) => setData({ ...data, issueQuant: parseInt(e.target.value, 10) })} />
        <label>issueState</label>
        <select onChange={issueStateHandler}>
        <option>CLOSED</option>
        <option>OPEN</option>
        </select>
      </div>

      <Query
        variables={{ name, owner, pullQuant, issueQuant, issueState }}
        query={GET_VIEWER}
      >

        {({ loading, error, data }) => (
          <Aux>
            {loading && <Spinner />}
            {error && <p>ERROR</p>}
            {!data && <p>Not found</p>}
            {data && data.repository && data.repository.pullRequests
            && data.repository.pullRequests.edges && Object.keys(data.repository.pullRequests.edges).map((el) => (
              <p style={{ color: 'green' }} key={el}>{data.repository.pullRequests.edges[el].node.title}</p>
            ))}
            {data && data.repository && data.repository.issues
            && data.repository.issues.edges && Object.keys(data.repository.issues.edges).map((el) => (
              <p style={{ color: 'red' }} key={el}>{data.repository.issues.edges[el].node.title}</p>
            ))}
            {data && data.repository && data.repository.issues && console.log(data)}
          </Aux>
        )}
      </Query>
    </Aux>
  );
};

export default Data;
