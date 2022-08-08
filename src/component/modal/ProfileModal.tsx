import React from 'react';
import styled from 'styled-components';
import IconGitBlue from '@/utils/img/icon_git_blue.png';

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
          <div className='circle'></div>
          <div className='user_info_wrap'>
            <h3>jiyeon555</h3>
            <p>
              임지은{' '}
              <button>
                <img src={IconGitBlue} alt='github' />
              </button>
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
  /* width: 30rem; */
  /* height: 30rem; */
  padding: 1rem 1.5rem;
  border-radius: 0.3rem;

  .button_wrap {
    text-align: right;
    button {
      width: 3rem;
      height: 3rem;
      border: ${props => `1px solid ${props.theme.colors.blue_1}`};
      border-radius: 0.5rem;
      font-size: 1.3rem;
      color: ${props => `${props.theme.colors.blue_1}`};
      &:hover {
        background-color: ${props => `${props.theme.colors.blue_1}`};
        color: #fff;
      }
    }
  }
  article {
    display: flex;
    align-items: center;

    .circle {
      width: 7rem;
      height: 7rem;
      background-color: ${props => `${props.theme.colors.gray_1}`};
      border-radius: 50%;
      margin-right: 1.8rem;
    }
    .user_info_wrap {
      h3 {
        color: ${props => `${props.theme.colors.black}`};
        font-weight: bold;
        font-size: 1.8rem;
        margin-bottom: 0.8rem;
      }
      p {
        color: ${props => `${props.theme.colors.gray_2}`};
        font-size: 1.6rem;
      }
    }
  }
  .history_number_wrap {
    border: ${props => `1px solid ${props.theme.colors.blue_1}`};
    border-radius: 0.5rem;
    margin: 1rem 2rem;
  }
  .history_in_box {
    display: flex;
    align-items: center;
    justify-content: space-around;
    > div {
      text-align: center;
      margin: 2.2rem 2rem;
      h2 {
        font-size: 4rem;
        letter-spacing: -0.1rem;
      }
      p {
        font-size: 1.5rem;
        color: ${props => `${props.theme.colors.blue_1}`};
        font-weight: 600;
      }
    }
  }
  .bottom {
    > div {
      margin-top: 0;
    }
  }
`;
