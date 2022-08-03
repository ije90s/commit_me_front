import React from 'react';
import styled from 'styled-components';

interface IRankingData {
  attendances: number;
  comments: number;
  commits: number;
  pulls: number;
  createdAt: string;
  github_address: string;
  image_url: string;
  name: string;
  updatedAt: string;
  user_id: string;
}

interface IProps {
  rankingData?: Array<IRankingData>;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const RankingBox: React.FC<IProps> = ({ rankingData, onClick }) => {
  console.log(rankingData);
  return (
    <>
      {rankingData?.map((v, i) => (
        <Box>
          <div className='text_left'>
            <h6>{i + 1}.</h6>
            <div className='circle'>
              <img src={`${v?.image_url}`} alt={`${v.name}`} />
            </div>{' '}
            <p className='user_id_text'>{v?.name}</p>
            <p className='number_text'>({v?.pulls})</p>
          </div>
          <button onClick={onClick} className='text_right'>
            ☺︎
          </button>
        </Box>
      ))}
    </>
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
