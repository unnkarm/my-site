/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  date: string;
  problem: string;
  solution: string;
  tech: string[];
  github?: string;
  demo?: string;
  image: string;
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Cert {
  id: string;
  name: string;
  platform: string;
  year: string;
  link: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  duration: string;
  description: string;
}

export interface Hackathon {
  id: string;
  name: string;
  year: string;
  marker: string; // 'flag', 'P2', 'P3', etc.
  certificateUrl?: string;
}
