import React, { useState } from 'react';
import Aux from 'hoc/Auxiliary';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Spinner from 'components/UI/Spinner/Spinner';
import Input from 'components/UI/Input/Input';
import IssueCard from 'components/UI/Card/IssueCard/IssueCard';
import PullRequestCard from 'components/UI/Card/PullRequestCard/PullRequestCard';

const Data = () => {
  const [data, setData] = useState({
    name: '',
    owner: '',
    pullQuanity: 0,
    issueQuanity: 0,
    issueState: [],
  });

  const GET_VIEWER = gql`
    query getViewer($name: String!, $owner: String!, $pullQuanity: Int, $issueQuanity: Int, $issueState: [IssueState!]) 
    { 
    repository(name: $name, owner: $owner) {
        issues(last: $issueQuanity, states: $issueState) {
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
          pullRequests(last: $pullQuanity) {
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
    name, owner, pullQuanity, issueQuanity, issueState,
  } = data;


  return (
    <Aux>
      <div>
        <Input
          label="Github Repository Name"
          changed={(e) => setData({ ...data, name: e.target.value })}
          type="text"
        />
        <Input
          label="Github Repository Owner"
          changed={(e) => setData({ ...data, owner: e.target.value })}
          type="text"
        />
        <Input
          label="Enter Pull Request Quantity"
          changed={(e) => setData({ ...data, pullQuanity: parseInt(e.target.value, 10) })}
          type="number"
        />
        <Input
          label="Enter Issue Quantity"
          changed={(e) => setData({ ...data, issueQuanity: parseInt(e.target.value, 10) })}
          type="number"
        />
        <Input
          label="Enter Issue State"
          changed={(e) => setData({ ...data, issueState: e.target.value })}
          value={issueState}
          type="select"
        />
      </div>

      <Query
        variables={{
          name, owner, pullQuanity, issueQuanity, issueState,
        }}
        query={GET_VIEWER}
      >

        {({ loading, error, data }) => (
          <Aux>
            {loading && <Spinner />}
            {error && data === null && <p>{JSON.stringify(error)}</p>}
            {!data && <p>No results</p>}
            {data && data.repository && (
              <Aux>
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
              </Aux>
            )}
          </Aux>
        )}
      </Query>
    </Aux>
  );
};

export default Data;
