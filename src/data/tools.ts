import automationanywhere from '../assets/aa.png';
import docker from '../assets/docker.png';
import gitlab from '../assets/gitlab.png';
import azure from '../assets/azure.png';
import streamlit from '../assets/streamlit.png';
import confluent from '../assets/confluent.png';
import aws from '../assets/aws.png';
import selenium from '../assets/selenium.png';
import langchain from '../assets/langchain.png';
import cloudflare from '../assets/cloudflare.png';
import openai from '../assets/openai.png';
import claude from '../assets/claude.png';
import codex from '../assets/codex.png';
import langfuse from '../assets/langfuse.png';
import gcp from '../assets/gcp.png';
import huaweicloud from '../assets/huaweicloud.png';
import flink from '../assets/flink.png';
import lakehouse from '../assets/lakehouse.png';
import mongodb from '../assets/mongodb.png';

export interface Tool {
  name: string;
  category: string;
  url: string;
  image: string;
  isInversed?: boolean;
}

export const tools: Tool[] = [
  {
    name: "Automation Anywhere",
    category: "Proficient",
    url: "https://www.automationanywhere.com/",
    image: automationanywhere,
    isInversed: false
  },
  {
    name: "Azure",
    category: "Proficient",
    url: "https://www.azure.com/",
    image: azure,
    isInversed: true
  },
  {
    name: "GitLab",
    category: "Proficient",
    url: "https://www.gitlab.com/",
    image: gitlab,
    isInversed: true
  },
  {
    name: "Docker",
    category: "Proficient", 
    url: "https://www.docker.com/",
    image: docker,
    isInversed: false
  },
  {
    name: "Streamlit",
    category: "Proficient",
    url: "https://www.streamlit.io/",
    image: streamlit,
    isInversed: true
  },
  {
    name: "LangChain",
    category: "Proficient",
    url: "https://www.langchain.com/",
    image: langchain,
    isInversed: true
  },
  {
    name: "OpenAI",
    category: "Proficient",
    url: "https://openai.com/",
    image: openai,
    isInversed: true
  },
  {
    name: "Claude",
    category: "Proficient",
    url: "https://claude.com/",
    image: claude,
    isInversed: false
  },
  {
    name: "Codex",
    category: "Proficient",
    url: "https://openai.com/codex/",
    image: codex,
    isInversed: true
  },
  {
    name: "Langfuse",
    category: "Proficient",
    url: "https://langfuse.com/",
    image: langfuse,
    isInversed: false
  },
  {
    name: "Confluent",
    category: "Intermediate",
    url: "https://www.confluent.io/",
    image: confluent,
    isInversed: false
  },
  {
    name: "AWS",
    category: "Intermediate",
    url: "https://aws.amazon.com/",
    image: aws,
    isInversed: false
  },
  {
    name: "Selenium",
    category: "Intermediate",
    url: "https://www.selenium.dev/",
    image: selenium,
    isInversed: true
  },
  {
    name: "Cloudflare",
    category: "Intermediate",
    url: "https://www.cloudflare.com/",
    image: cloudflare,
    isInversed: false
  },
  {
    name: "Google Cloud",
    category: "Intermediate",
    url: "https://cloud.google.com/",
    image: gcp,
    isInversed: false
  },
  {
    name: "Huawei Cloud",
    category: "Intermediate",
    url: "https://www.huaweicloud.com/intl/en-us/",
    image: huaweicloud,
    isInversed: false
  },
  {
    name: "Apache Flink",
    category: "Intermediate",
    url: "https://flink.apache.org/",
    image: flink,
    isInversed: false
  },
  {
    name: "Lakehouse",
    category: "Intermediate",
    url: "https://www.databricks.com/glossary/data-lakehouse",
    image: lakehouse,
    isInversed: false
  },
  {
    name: "MongoDB",
    category: "Intermediate",
    url: "https://www.mongodb.com/",
    image: mongodb,
    isInversed: false
  }
];