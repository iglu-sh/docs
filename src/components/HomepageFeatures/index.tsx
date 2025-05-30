import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to use',
    description: (
      <>
        Iglu is thank to is user friendly frontend (GUI) easy to use!
        You can control the hole product with a User friendly frontend.
      </>
    ),
  },
  {
    title: 'Fast deployment',
    description: (
      <>
        You can deploy Iglu with in seconds by just one simple <code>docker compose up</code>!
      </>
    ),
  },
  {
    title: 'Cachix compatibility',
    description: (
      <>
        The Iglu Cache is compatible with the official cachix client. So you don't have to learn a new client for the new cache.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
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
