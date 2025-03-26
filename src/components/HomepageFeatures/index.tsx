import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Cloud Developer',
    Svg: require('@site/static/img/cloud_development.svg').default,
    description: (
      <>
          Cloud developer in the process of specializing in building cloud-based solutions for data infrastructure, including APIs, database design, etc.
          Gaining experience in AWS services like CloudFormation and Lambda to streamline and scale backend systems.
      </>
    ),
  },
  {
    title: 'Software Engineering Researcher',
    Svg: require('@site/static/img/software_engineer_researcher.svg').default,
    description: (
      <>
          Passionate researcher about the evolution of GitHub Actions workflows and delivering efficient, scalable solutions for their maintenance.
      </>
    ),
  },
  {
    title: 'In Love With Data',
    Svg: require('@site/static/img/data_analysis.svg').default,
    description: (
      <>
          How raw numbers transform into meaningful insights never fails to amaze me.
          There's always a hidden story waiting to be uncovered!
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
