import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { Header, Container, Group, Burger, Paper, Transition } from '@mantine/core';
import { useStyles } from './Header.style';
import { HEADER_HEIGHT } from '../settings';

interface HeaderProps {
  links: { link: string; label: string }[];
}

export function HeaderResponsive({ links }: HeaderProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        close();
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <Header height={HEADER_HEIGHT} mb={20} className={classes.root}>
      <Container className={classes.header}>
        <h2>123 degres</h2>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
