import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ServerProviderProps {}

const StyledServerProvider = styled.div`
  color: pink;
`;

export function ServerProvider(props: ServerProviderProps) {
  return (
    <StyledServerProvider>
      <h1>Welcome to ServerProvider!</h1>
    </StyledServerProvider>
  );
}

export default ServerProvider;
