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
    title: "All-in-One Build System",
    description: "Iglu combines a builder, cache, and a UI-based controller into a single, cohesive system - no external orchestration required."
  },
  {
    title: "Dynamic, Containerized Builders",
    description: "Build jobs are automatically executed in isolated Docker containers. The controller dynamically creates and tears down these containers per job - ensuring clean, efficient, and reproducible builds."
  },
  {
    title: "Cachix Compatible & Flexible",
    description: "Iglu is compatible with the Cachix client, allowing seamless integration with existing caching workflows - wi-thout vendor lock-in."
  },
  {
    title: "UI for Job and Cache Management",
    description: "The built-in user interface allows teams to monitor build jobs, inspect caches, and manage build processes with clarity and ease."
  },
  {
    title: "Automatic Caching of Nix Derivations",
    description: "Completed builds are automatically pushed to the cache, with proper hash-based detection. Redundant builds are avoided - ensuring fast and deterministic pipelines."
  },
  {
    title: "CI/CD Ready & Self-Hostable",
    description: "Iglu is designed for automated pipelines and can be fully self-hosted-ideal for privacy-focused or security-sensitive environments."
  }
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
