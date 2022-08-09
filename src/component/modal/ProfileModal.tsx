import React from 'react';
import styled from 'styled-components';
import IconGitBlue from '@/utils/img/icon_git_blue.png';
import { RankingData } from '@/utils/interface';

type Props = {
  style?: React.CSSProperties;
  // onClick?: () => void;
  setVisible?: any;
  detailData?: RankingData;
};

const ProfileModal: React.FC<Props> = ({ setVisible, detailData }) => {
  console.log(detailData);
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
          <div className='circle'>
            <img src={`${detailData?.image_url}`} alt={`${detailData?.user_id}`} />
          </div>
          <div className='user_info_wrap'>
            <h3>{detailData?.user_id}</h3>
            <p>
              {detailData?.name}
              <a href={`${detailData?.github_address}`} target='_blank' rel='noreferrer'>
                <img src={IconGitBlue} alt='github' />
              </a>
            </p>
          </div>
        </article>
        <div className='history_number_wrap'>
          <div className='history_in_box'>
            <div>
              <h2>{detailData?.attendances}</h2>
              <p>출석</p>
            </div>
            <div>
              <h2>{detailData?.comments}</h2>
              <p>댓글</p>
            </div>
          </div>
          <div className='history_in_box bottom'>
            <div>
              <h2>{detailData?.pulls}</h2>
              <p>풀리퀘스트</p>
            </div>
            <div>
              <h2>{detailData?.commits}</h2>
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
  width: 40rem;
  height: 37rem;
  padding: 1rem 1.5rem;
  border-radius: 0.3rem;

  .button_wrap {
    text-align: right;
    margin: 0.2rem 0rem 2rem;
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
    margin: 0 2.5rem 2.5rem;

    .circle {
      width: 7rem;
      height: 7rem;
      background-color: ${props => `${props.theme.colors.gray_1}`};
      border-radius: 50%;
      margin-right: 1.8rem;
      overflow: hidden;
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
        display: flex;
        align-items: center;

        a {
          margin-left: 1rem;
          width: 2.5rem;
          height: 2.5rem;
          img {
            width: inherit;
            height: inherit;
            object-fit: contain;
          }
        }
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
        margin-bottom: 1rem;
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
