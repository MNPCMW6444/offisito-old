import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ThemeProviderProps {}

const StyledThemeProvider = styled.div`
  color: pink;
`;

export function ThemeProvider(props: ThemeProviderProps) {
  return (
    <StyledThemeProvider>
      <h1>Welcome to ThemeProvider!</h1>
    </StyledThemeProvider>
  );
}

export default ThemeProvider;
