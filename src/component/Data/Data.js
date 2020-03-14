import React, { useState } from 'react';
import Aux from 'hoc/Auxiliary';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Button from 'component/UI/Button/Button';
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
    repository(name: $name, owner: $owner) {
        issues(last: $issueQuant, states: $issueState) {
            edges {
              node {
                id
                title
                comments(first: 5) {
                    edges {
                        node {
                            bodyText
                        }
                    }
                }
            }
        }
    }
          pullRequests(last: $pullQuant) {
            edges {
                node {
                    id
                    title
                }
            }
        }
    }
}
`;
  const {
    name, owner, pullQuant, issueQuant, issueState,
  } = data;


  return (
    <Aux>
      <div>
        <div>
          <label>Github Repository Name</label>
          <input onChange={(e) => setData({ ...data, name: e.target.value })} />
        </div>

        <div>
          <label>Github Owner Name </label>
          <input onChange={(e) => setData({ ...data, owner: e.target.value })} />
        </div>

        <label>Pull Requests Quantity</label>
        <input type="number" onChange={(e) => setData({ ...data, pullQuant: parseInt(e.target.value, 10) })} />
        <label>Issue Quantity</label>
        <input type="number" onChange={(e) => setData({ ...data, issueQuant: parseInt(e.target.value, 10) })} />
        <label>Issue State</label>
        <select onChange={(e) => setData({ ...data, issueState: e.target.value })}>
          <option />
          <option>CLOSED</option>
          <option>OPEN</option>
        </select>
      </div>

      <Query
        variables={{
          name, owner, pullQuant, issueQuant, issueState,
        }}
        query={GET_VIEWER}
      >

        {({ loading, error, data }) => (
          <Aux>
            {loading && <Spinner />}
            {error && <p>ERROR</p>}
            {!data && <p>Not found</p>}
            {data && data.repository && data.repository.pullRequests
            && data.repository.pullRequests.edges && Object.keys(data.repository.pullRequests.edges).map((el) => (
              <p
                key={data.repository.pullRequests.edges[el].node.id}
                style={{ color: 'green' }}
              >
                {data.repository.pullRequests.edges[el].node.title}
              </p>
            ))}
            {data && data.repository && data.repository.issues
            && data.repository.issues.edges && Object.keys(data.repository.issues.edges).map((el) => (
              <p
                style={{ color: 'red' }}
                onClick={()=> Object.keys(data.repository.issues.edges[el].node.comments.edges)
                    .map(
                    ele => {
                        return (
                        <p key={ele}>data.repository.issues.edges[el].node.comments.edges[ele].node.bodyText
                                </p>
                        )
                    }
                )
                }
                key={data.repository.issues.edges[el].node.id}
              >
                {data.repository.issues.edges[el].node.title}
              </p>
            ))}
          </Aux>
        )}
      </Query>
    </Aux>
  );
};

export default Data;
