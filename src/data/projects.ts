export interface Project {
    id: string;
    name: string;
    tagline: string;
    description: string;
    longDescription: string;
    tech: string[];
    color: string;
    icon: string;
    features: string[];
    challenges: string[];
    images: {
        hero: string;
        gallery: string[];
    };
    links: {
        github?: string;
        playStore?: string;
        appStore?: string;
        demo?: string;
    };
    year: string;
    role: string;
}

export const projects: Project[] = [
    {
        id: "healify",
        name: "Healify",
        tagline: "Decentralized Health Records",
        description: "A decentralized health record management system using Solidity smart contracts and WalletConnect for secure Ethereum-based access.",
        longDescription: "Healify is a decentralized health record management system designed to ensure security and privacy. It leverages Solidity smart contracts on the Ethereum blockchain for immutable record keeping. Users can securely access their records using WalletConnect. The backend is built with GoLang, Prisma ORM, and MongoDB, containerized with Docker and deployed on AWS-EKS. It also features Gemini API integration for medical report summarization and risk prediction, with media stored in Amazon S3.",
        tech: ["Flutter", "GoLang", "Solidity", "MongoDB", "AWS", "Docker", "Kubernetes"],
        color: "#4A90E2",
        icon: "🏥",
        features: [
            "Decentralized health record management using Solidity",
            "Secure Ethereum-based access via WalletConnect",
            "GoLang backend with Prisma ORM and MongoDB",
            "Gemini API for medical report summarization and risk predictions",
            "Media storage in Amazon S3",
            "Automated APK builds using Codemagic CI/CD"
        ],
        challenges: [
            "Integrating blockchain interactions with a mobile app",
            "Ensuring secure handling of sensitive medical data",
            "Orchestrating containerized services on AWS-EKS"
        ],
        images: {
            hero: "/projects/healify-hero.png",
            gallery: ["/projects/healify-1.png", "/projects/healify-2.png"]
        },
        links: {
            github: "https://github.com/Deepanshu-Sharma-18/Healify"
        },
        year: "2024",
        role: "Full Stack Developer"
    },
    {
        id: "tasktrackr",
        name: "TaskTrackr",
        tagline: "Productivity Manager",
        description: "Task management app with Jetpack Compose UI and secure Spring Boot backend.",
        longDescription: "TaskTrackr is a productivity manager application featuring a modern Jetpack Compose UI. It connects to a secure Spring Boot backend that enables real-time task CRUD operations with filtering and user-specific views. Security is handled via JWT-based authentication. The API is documented using Swagger, thoroughly tested with JUnit and Mockito, and containerized using Docker.",
        tech: ["Jetpack Compose", "Kotlin", "Spring Boot", "Java", "MySQL", "Docker"],
        color: "#7ED321",
        icon: "✅",
        features: [
            "Modern UI built with Jetpack Compose",
            "Secure Spring Boot backend",
            "Real-time task CRUD operations",
            "JWT-based authentication",
            "API documentation with Swagger",
            "Containerized deployment with Docker"
        ],
        challenges: [
            "Implementing secure JWT authentication flow",
            "Standardizing API responses and error handling",
            "Writing comprehensive unit tests with Mockito"
        ],
        images: {
            hero: "/projects/tasktrackr-hero.png",
            gallery: ["/projects/tasktrackr-1.png", "/projects/tasktrackr-2.png"]
        },
        links: {
            github: "https://github.com/Deepanshu-Sharma-18/task"
        },
        year: "2024",
        role: "Android & Backend Developer"
    },
    {
        id: "banter",
        name: "Banter",
        tagline: "Twitter Clone App",
        description: "Full-featured social media app using Jetpack Compose and MVVM architecture.",
        longDescription: "Banter is a Twitter clone application built using Jetpack Compose and MVVM architecture. It supports core social features like tweeting, commenting, and liking, implemented with Clean Architecture principles. It uses Firebase Auth (OAuth 2.0) for authentication and Firestore for real-time updates. RoomDB provides offline persistence, and Coil is used for efficient image caching.",
        tech: ["Jetpack Compose", "Kotlin", "Firebase", "MVVM", "Dagger-Hilt", "RoomDB"],
        color: "#F5A623",
        icon: "🐦",
        features: [
            "Tweet, comment, and like functionality",
            "Clean Architecture with MVVM",
            "Firebase Auth (OAuth 2.0) & Firestore",
            "Real-time updates",
            "Offline persistence with RoomDB",
            "Image caching with Coil"
        ],
        challenges: [
            "Structuring Clean Architecture for scalability",
            "Handling real-time data synchronization with Firebase",
            "Implementing robust offline capabilities"
        ],
        images: {
            hero: "/projects/banter-hero.png",
            gallery: ["/projects/banter-1.png", "/projects/banter-2.png"]
        },
        links: {
            github: "https://github.com/Deepanshu-Sharma-18/TwitterClone"
        },
        year: "2024",
        role: "Android Developer"
    }
];

export function getProjectById(id: string): Project | undefined {
    return projects.find((p) => p.id === id);
}

export function getProjectIds(): string[] {
    return projects.map((p) => p.id);
}
