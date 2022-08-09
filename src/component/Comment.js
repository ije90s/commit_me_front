import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Comment = () => {
  const commentRef = useRef();
  useEffect(() => {
    const utterances = document.createElement('script');

    const utterancesConfig = {
      src: 'https://utteranc.es/client.js',
      repo: 'ije90s/commit_me_front',
      'issue-term': 'pathname',
      theme: 'github-light',
      crossorigin: 'anonymous',
      async: true,
    };

    Object.entries(utterancesConfig).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });
    commentRef.current.appendChild(utterances);
  }, []);
  return <StyledComment ref={commentRef}></StyledComment>;
};

export default Comment;

const StyledComment = styled.div``;
