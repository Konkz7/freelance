import {
  Gamepad2,
  GitPullRequestArrow,
  MonitorSmartphone,
  ScanSearch,
  Server,
  Smartphone,
} from 'lucide-react'
import type { Service } from '@/types'

/**
 * The six services shown in the services grid. Order matters — the first two
 * occupy the wider cells on desktop.
 */
export const services: Service[] = [
  {
    id: 'android',
    title: 'Android apps',
    icon: Smartphone,
    description:
      'Native Android in Java and the Android SDK, or React Native and Flutter when one codebase has to cover both stores. I have shipped all three, including a social app with its own realtime backend and a reporting app with in-app voice and video.',
    solves: 'You need a real mobile product, not a wrapped website.',
  },
  {
    id: 'web',
    title: 'Web applications',
    icon: MonitorSmartphone,
    description:
      'End-to-end web software — interface, application logic, data and deployment. React and TypeScript, or ASP.NET Core and Blazor, whichever fits the stack you already have rather than the one I would pick from scratch.',
    solves: 'You need software people can log into and use.',
  },
  {
    id: 'unity',
    title: 'Unity games',
    icon: Gamepad2,
    description:
      'Small games, playable prototypes and interactive experiences in Unity, built for desktop, mobile or the browser, with mechanics tuned until they actually feel good.',
    solves: 'Your concept has to be played to be understood.',
  },
  {
    id: 'backend',
    title: 'APIs & microservices',
    icon: Server,
    description:
      'Services with a clear data model, real authentication and documentation another developer can follow — built to be integrated without a phone call.',
    solves: 'Your product needs a backend it can depend on.',
  },
  {
    id: 'features',
    title: 'Feature development',
    icon: GitPullRequestArrow,
    description:
      'Joining an existing codebase to ship new functionality and fix what is broken, working to the conventions already there and leaving the surrounding code tidier.',
    solves: 'You already have an application and need it moved forward.',
  },
  {
    id: 'audits',
    title: 'Codebase audits',
    icon: ScanSearch,
    description:
      'A structured review of architecture, security, dependencies and maintainability, written up as a prioritised report in plain English with the risky parts called out first.',
    solves: 'You inherited a codebase and need to know where you stand.',
  },
]
