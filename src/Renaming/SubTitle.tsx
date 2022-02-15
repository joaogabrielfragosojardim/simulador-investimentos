import styled from "styled-components";

interface IProps {
  subtitle: string;
}

export const SubTitle = ({ subtitle }: IProps) => {
  return (
    <>
      <SubtitlePage>{subtitle}</SubtitlePage>
    </>
  );
};

export const SubtitlePage = styled.h2`
  font-size: 1.8rem;
  margin: 35px 0px;
`;
