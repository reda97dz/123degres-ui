import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    cursor: 'pointer',
    '&:hover': {
      boxShadow: theme.shadows.xs,
      transform: 'scale(1.005)',
    },
    ':active': {
      transform: 'scale(1)',

      boxShadow: 'none',
    },
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1,
  },

  lead: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: rem(22),
    lineHeight: 1,
  },

  inner: {
    display: 'flex',

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  ring: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',

    [theme.fn.smallerThan('xs')]: {
      justifyContent: 'center',
      marginTop: theme.spacing.md,
    },
  },
}));
