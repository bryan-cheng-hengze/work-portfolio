import python from '../assets/python.png';
import javascript from '../assets/javascript.png';
import php from '../assets/php.png';
import mysql from '../assets/sql.png';
import java from '../assets/java.png';
import r from '../assets/r.png';
import typescript from '../assets/typescript.png';
import haskell from '../assets/haskell.png';
import c from '../assets/c.png';
import ksql from '../assets/ksql.png';

export interface Language {
  name: string;
  category: string;
  url: string;
  image: string;
  isInversed?: boolean;
}

export const languages: Language[] = [
  {
    name: "Python",
    category: "Proficient",
    url: "https://www.python.org/",
    image: python,
    isInversed: false
  },
  {
    name: "JavaScript",
    category: "Proficient", 
    url: "https://www.javascript.com/",
    image: javascript,
    isInversed: false
  },
  {
    name: "PHP",
    category: "Proficient",
    url: "https://www.php.net/",
    image: php,
    isInversed: true
  },
  {
    name: "SQL",
    category: "Proficient",
    url: "https://www.mysql.com/",
    image: mysql,
    isInversed: false
  },
  {
    name: "R",
    category: "Proficient",
    url: "https://www.r-project.org/",
    image: r,
    isInversed: false
  },
  {
    name: "TypeScript",
    category: "Intermediate",
    url: "https://www.typescriptlang.org/",
    image: typescript,
    isInversed: true
  },
  {
    name: "Java",
    category: "Intermediate",
    url: "https://www.java.com/",
    image: java,
    isInversed: false
  },
  {
    name: "Haskell",
    category: "Intermediate",
    url: "https://www.haskell.org/",
    image: haskell,
    isInversed: true
  },
  {
    name: "C",
    category: "Intermediate",
    url: "https://www.c-language.org/",
    image: c,
    isInversed: false
  },
  {
    name: "KSQL",
    category: "Intermediate",
    url: "https://ksqldb.io/",
    image: ksql,
    isInversed: false
  }
]; 

/*
- NoSQL
- React Native
- HTML/CSS
- React
- MongoDB
- PostgreSQL
- Redis
- Kafka
- RabbitMQ
- Docker
- Kubernetes
*/