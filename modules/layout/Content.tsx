import { Container } from '@mantine/core';

interface ContentProps {
  children?: React.ReactNode;
}

export function Content(props: ContentProps) {
  const { children } = props;
  return <Container mb={30}>{children}</Container>;
}
