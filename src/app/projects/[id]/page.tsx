import { notFound } from "next/navigation";
import { getProjectById, projects } from "@/data/projects";
import ProjectDetails from "@/components/ProjectDetails";
import { Metadata } from "next";

export const dynamicParams = false;

interface ProjectPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: `${project.name} | Project Details`,
        description: project.description,
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    return <ProjectDetails project={project} />;
}

// Generate static paths for all projects
export function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }));
}
