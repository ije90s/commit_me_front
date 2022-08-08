import React from 'react';
import styled from 'styled-components';

type Props = {
  style?: React.CSSProperties;
  // onClick?: () => void;
  setVisible?: any;
  detailData?: '';
};

const ProfileModal: React.FC<Props> = ({ setVisible, detailData }) => {
  const handleCloseModal = () => {
    setVisible(false);
  };
  return (
    <>
      <Overlay onClick={handleCloseModal}></Overlay>
      <Modal>
        <div className='button_wrap'>
          <button onClick={handleCloseModal}>X</button>
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
        <div className='history_number_wrap'>
          <div className='history_in_box'>
            <div>
              <h2>100</h2>
              <p>출석</p>
            </div>
            <div>
              <h2>100</h2>
              <p>댓글</p>
            </div>
          </div>
          <div className='history_in_box bottom'>
            <div>
              <h2>100</h2>
              <p>풀리퀘스트</p>
            </div>
            <div>
              <h2>100</h2>
              <p>커밋</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProfileModal;
const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  /* padding: 1rem 5rem; */
`;
const Modal = styled.div`
  z-index: 100;
  background-color: #fff;
  position: fixed;
  top: 10rem;
  left: 50%;
  transform: translateX(-50%);
  width: 30rem;
  height: 30rem;
  padding: 1rem 1.5rem;
  .button_wrap {
    background-color: red;
  }
  .history_number_wrap {
    border: ${props => `1px solid ${props.theme.colors.blue_1}`};
    border-radius: 0.5rem;
  }
  .history_in_box {
    display: flex;
    align-items: center;
    justify-content: space-around;
    > div {
      text-align: center;
      margin: 2rem 2rem;
      h2 {
        font-size: 4rem;
        letter-spacing: -0.1rem;
      }
      p {
        font-size: 1.5rem;
      }
    }
  }
  .bottom {
    > div {
      margin-top: 0;
    }
  }
`;
