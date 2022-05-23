import React from 'react';
import Layout from './Layout';
import styled, { css } from 'styled-components';

const Container = styled.article`
  display: flex;
  flex-direction: column;
`;

export default ({ subreddit, title, url }) => (
  <Layout
    css={css`
      &:hover {
        background-color: papayawhip;
      }
    `}
  >
    <Container>
      <h3>{title}</h3>
      <p>{`r/${subreddit}`}</p>
      <a href={url}>-> Visit the site</a>
    </Container>
  </Layout>
);
