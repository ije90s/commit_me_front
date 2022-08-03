import React from 'react';
import styled from 'styled-components';

type Props = {
  style?: React.CSSProperties;
  onClick?: () => void;
};

const ProfileModal: React.FC<Props> = ({ onClick }) => {
  return (
    <Container>
      <Modal>
        <div>
          <button onClick={onClick}>X</button>
        </div>
        <article>
          <div>
            <img />
          </div>
          <div>
            <h3>jiyeon555</h3>
            <p>
              임지은 <button>git</button>
            </p>
          </div>
        </article>
        <div>
          <div>
            <h2>100</h2>
            <p>출석</p>
          </div>
          <div>
            <h2>100</h2>
            <p>댓글</p>
          </div>
          <div>
            <h2>100</h2>
            <p>풀리퀘스트</p>
          </div>
          <div>
            <h2>100</h2>
            <p>커밋</p>
          </div>
        </div>
      </Modal>
    </Container>
  );
};

export default ProfileModal;
const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1rem 5rem;
`;
const Modal = styled.div`
  background-color: #fff;
`;
