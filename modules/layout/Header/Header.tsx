import { useDisclosure } from '@mantine/hooks';
import { Header, Container, Group, Burger, Paper, Transition } from '@mantine/core';
import { useStyles } from './Header.style';
import { HEADER_HEIGHT } from '../settings';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ColorToggle } from './ColorToggle';
import Image from 'next/image';

interface HeaderProps {
  links: { link: string; label: string }[];
}

export function HeaderResponsive({ links }: HeaderProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const router = useRouter();
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      passHref
      className={cx(classes.link, {
        [classes.linkActive]: router.pathname === link.link,
      })}
      onClick={() => {
        close();
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <Header height={HEADER_HEIGHT} mb={20} className={classes.root}>
      <Container className={classes.header}>
        <Image src="/logo.png" alt="logo" width={164} height={35} />
        <Group spacing={5} className={classes.links}>
          {items}
          <ColorToggle />
        </Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
              <ColorToggle />
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
