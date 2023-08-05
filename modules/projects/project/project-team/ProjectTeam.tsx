import { useAppSelector } from '@/modules/context/hooks';
import { selectProject } from '@/modules/context/slices/project.slice';
import { Card, Container, Grid, SimpleGrid, Skeleton, Text, rem, useMantineTheme } from '@mantine/core';
import { useStyles } from './ProjectTeam.style';

export function ProjectTeam() {
  const { team, project } = useAppSelector(selectProject);
  const { classes } = useStyles();
  const PRIMARY_COL_HEIGHT = rem(300);
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;
  return (
    <Container>
      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Card withBorder radius="md" className={classes.card}>
          <Text weight={500}>Informations Projet</Text>
          {project?.client}
          
        </Card>
        <Grid gutter="md">
          <Grid.Col>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
