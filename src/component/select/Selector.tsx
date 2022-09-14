import React from 'react';
import styled from 'styled-components';

type Props = {
  children: string;
  name: string;
  onChange?: () => void;
};
const SelectBox: React.FC<Props> = ({ children, name, onChange }) => {
  return (
    <StyledSelector name={name} value={children} onChange={onChange}>
      <option key={children} value={children}>
        {children}
      </option>
    </StyledSelector>
  );
};

export default SelectBox;

const StyledSelector = styled.select`
  border-radius: 10rem;
  width: 4.5rem;
  height: 4.5rem;
  font-size: 2rem;
  line-height: 2rem;
`;
