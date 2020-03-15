import React, { useState } from 'react';
import Aux from 'hoc/Auxiliary';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Spinner from 'component/UI/Spinner/Spinner';
import IssueCard from 'component/UI/Card/IssueCard/IssueCard';
import PullRequestCard from 'component/UI/Card/PullRequestCard/PullRequestCard';

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
                            id
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
            {error && <p>{JSON.stringify(error)}</p>}
            {!data && <p>No results</p>}
            {data && data.repository && (
              <div>
                {data.repository.issues.edges.length
                  ? data.repository.issues.edges.map(({ node }) => (
                    <IssueCard
                      key={node.id}
                      title={node.title}
                      comments={node.comments.edges.map(({ node }) => (
                        node.bodyText
                      ))}
                    />
                  )) : null}
                {data.repository.pullRequests.edges.length
                  ? data.repository.pullRequests.edges.map(({ node }) => (
                    <PullRequestCard
                      key={node.id}
                      title={node.title}
                    />
                  )) : null}
              </div>
            )}
          </Aux>
        )}
      </Query>
    </Aux>
  );
};

export default Data;
