import { Card, Group, RingProgress, Text } from '@mantine/core';
import { useStyles } from './ProjectCard.style';
import { useRouter } from 'next/router';

interface ProjectCardProps {
  title: string;
  subtitle: string;
  completed: number;
  total: number;
  projectId: number;
  stats: {
    label: string;
    value: string;
  }[];
}

export function ProjectCard(props: ProjectCardProps) {
  const { classes, theme } = useStyles();
  const { stats, title, subtitle, completed, projectId } = props;
  const router = useRouter();

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text className={classes.label}>{stat.value}</Text>
      <Text size="xs" color="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Card
      withBorder
      p="xl"
      radius="md"
      className={classes.card}
      onClick={() => router.push(`/projects/${projectId}`)}
    >
      <div className={classes.inner}>
        <div>
          <Text fz="xl" className={classes.label}>
            {title}
          </Text>

          <Text fz="sm" className={classes.label}>
            {subtitle}
          </Text>
          <div>
            <Text className={classes.lead} mt={30}>
              {completed}
            </Text>
            <Text fz="xs" color="dimmed">
              Complétées
            </Text>
          </div>
          <Group mt="lg">{items}</Group>
        </div>

        <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[{ value: (completed / 11) * 100, color: theme.primaryColor }]}
            label={
              <div>
                <Text ta="center" fz="lg" className={classes.label}>
                  {((completed / 11) * 100).toFixed(0)}%
                </Text>
                <Text ta="center" fz="xs" c="dimmed">
                  Complété
                </Text>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
}
