import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { NextRouter } from 'next/router';
import { ReactElement, ReactNode } from 'react';
import { Key } from 'react';

export type IDType = Key | null | undefined;

export type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export interface DashboardData {
	userOrTeamName: string;
	name: string;
	isTeam: boolean;
	stats: Stats;
	projects: projectData[];
}

export interface Stats {
	statsTimeSpan: string;
	bandwidthUsed: string;
	buildMinutesUsed: number;
	concurrentBuilds: number;
	teamMember: number; //not a team
}

export interface projectData {
	title: string;
	mainDomain: string;
	lastChange: { description: string; time: string };
	deployedBy: string;
}
