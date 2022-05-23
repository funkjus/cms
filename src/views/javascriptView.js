import React from 'react';
import Layout from './Layout';
import styled, { css } from 'styled-components';

const Container = styled.article`
  display: flex;
  flex-direction: row;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 2rem;

  & > * {
    padding-left: 1rem;
  }
`;

export default ({ subreddit, title, url }) => (
  <Layout
    css={css`
      background-color: papayawhip;
    `}
  >
    <Container>
      <h4>{title}</h4>
      <p>({`r/${subreddit}`})</p>
      <a href={url}>-> Visit the site</a>
    </Container>
  </Layout>
);
