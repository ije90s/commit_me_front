import React from 'react';
import styled from 'styled-components';

interface IChoiceData {
  key: number | undefined;
  attendances: number | undefined;
  comments: number | undefined;
  commits: number | undefined;
  pulls: number | undefined;
  createdAt: string | undefined;
  github_address: string | undefined;
  image_url: string | undefined;
  name: string | undefined;
  updatedAt: string | undefined;
  user_id: string | undefined;
}

interface IProps {
  choiceData?: IChoiceData | undefined;
  value?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const RankingBox: React.FC<IProps> = ({ choiceData, value, onClick }) => {
  //? 최초 실행 때는 undefined인데 이 때, 비구조화할당을 쓰고 싶으면 어떻게 해야하지?
  // const {
  //   attendances,
  //   comments,
  //   commits,
  //   pulls,
  //   createdAt,
  //   github_address,
  //   image_url,
  //   name,
  //   updatedAt,
  //   user_id,
  // } = choiceData;
  // console.log(choiceData);
  return (
    <Box>
      <div className='text_left'>
        <h6>{choiceData?.key}.</h6>
        <div className='circle'>
          <img src={`${choiceData?.image_url}`} alt={`${choiceData?.name}`} />
        </div>{' '}
        <p className='user_id_text'>{choiceData?.name}</p>
        <p className='number_text'>({choiceData?.pulls})</p>
      </div>
      <button onClick={onClick} className='text_right'>
        ☺︎
      </button>
    </Box>
  );
};

export default RankingBox;

const Box = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2rem;
  border-radius: 0.8rem;
  padding: 1rem 2rem;
  margin: 1rem 0;
  .text_left {
    display: flex;
    align-items: center;
  }
  h6 {
    font-weight: bold;
    margin-right: 1.5rem;
  }
  .text_right {
    font-size: 2.5rem;
    color: ${props => props.theme.colors.blue_1};
  }
  .circle {
    background-color: ${props => props.theme.colors.gray_1};
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    margin-right: 2rem;
    overflow: hidden;
    img {
      width: inherit;
      height: inherit;
    }
  }
  .user_id_text {
    margin-right: 0.8rem;
  }
  .number_text {
    color: ${props => props.theme.colors.gray_2};
    font-size: 1.3rem;
  }
`;
