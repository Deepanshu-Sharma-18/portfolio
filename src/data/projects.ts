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
        id: "weathernow",
        name: "WeatherNow",
        tagline: "Beautiful weather, beautifully displayed",
        description: "Real-time weather app with beautiful animations and accurate forecasts using OpenWeather API.",
        longDescription: "WeatherNow is a comprehensive weather application that provides accurate, real-time weather data with stunning visual representations. Built with Flutter, it features smooth animations, dynamic backgrounds that change based on weather conditions, and an intuitive user interface that makes checking the weather a delightful experience.",
        tech: ["Flutter", "Dart", "OpenWeather API", "Provider", "Lottie"],
        color: "#4A90E2",
        icon: "🌤️",
        features: [
            "Real-time weather updates with hourly and weekly forecasts",
            "Dynamic animated backgrounds based on weather conditions",
            "Location-based weather detection with GPS",
            "Multiple city support with easy switching",
            "Weather alerts and notifications",
            "Beautiful sunrise/sunset animations"
        ],
        challenges: [
            "Optimizing API calls to reduce data usage",
            "Creating smooth animations that don't drain battery",
            "Handling offline mode with cached data"
        ],
        images: {
            hero: "/projects/weather-hero.png",
            gallery: ["/projects/weather-1.png", "/projects/weather-2.png", "/projects/weather-3.png"]
        },
        links: {
            github: "https://github.com/your-username/weathernow",
            playStore: "https://play.google.com/store/apps/details?id=com.yourapp.weather"
        },
        year: "2024",
        role: "Solo Developer"
    },
    {
        id: "fittrack",
        name: "FitTrack Pro",
        tagline: "Your fitness journey, simplified",
        description: "Comprehensive fitness tracking app with workout logging, progress charts, and daily goals.",
        longDescription: "FitTrack Pro is a native Android fitness application built with Kotlin that helps users track their workouts, monitor progress, and achieve their fitness goals. With a clean Material Design interface and powerful data visualization, it makes fitness tracking both effective and enjoyable.",
        tech: ["Android", "Kotlin", "Room DB", "Material Design", "MPAndroidChart"],
        color: "#7ED321",
        icon: "🏋️",
        features: [
            "Custom workout creation with exercise library",
            "Progress tracking with interactive charts",
            "Personal records and achievement system",
            "Rest timer with customizable intervals",
            "Workout history and statistics",
            "Dark mode support"
        ],
        challenges: [
            "Designing an intuitive workout logging UX",
            "Implementing efficient local database queries",
            "Creating responsive charts for various data ranges"
        ],
        images: {
            hero: "/projects/fitness-hero.png",
            gallery: ["/projects/fitness-1.png", "/projects/fitness-2.png", "/projects/fitness-3.png"]
        },
        links: {
            github: "https://github.com/your-username/fittrack"
        },
        year: "2024",
        role: "Solo Developer"
    },
    {
        id: "shopease",
        name: "ShopEase",
        tagline: "Shopping made effortless",
        description: "Modern e-commerce mobile app with seamless checkout, payment integration, and order tracking.",
        longDescription: "ShopEase is a full-featured e-commerce application built with Flutter that provides a seamless shopping experience. From product discovery to checkout, every interaction is designed to be smooth and intuitive. The app features real-time inventory updates, secure payment processing, and comprehensive order tracking.",
        tech: ["Flutter", "Firebase", "Stripe", "Bloc", "Cloud Functions"],
        color: "#F5A623",
        icon: "🛒",
        features: [
            "Product catalog with advanced filtering",
            "Real-time inventory and pricing updates",
            "Secure payment with Stripe integration",
            "Order tracking with push notifications",
            "Wishlist and favorites",
            "User reviews and ratings"
        ],
        challenges: [
            "Implementing secure payment flows",
            "Managing complex state across the app",
            "Optimizing image loading for product galleries"
        ],
        images: {
            hero: "/projects/shop-hero.png",
            gallery: ["/projects/shop-1.png", "/projects/shop-2.png", "/projects/shop-3.png"]
        },
        links: {
            github: "https://github.com/your-username/shopease",
            demo: "https://shopease-demo.vercel.app"
        },
        year: "2023",
        role: "Lead Developer"
    },
    {
        id: "quicknotes",
        name: "QuickNotes",
        tagline: "Capture ideas instantly",
        description: "Minimalist notes app with rich text editing, cloud sync, and intuitive organization.",
        longDescription: "QuickNotes is a clean, fast, and intuitive note-taking application for Android. Built with Kotlin and following MVVM architecture, it offers a distraction-free writing experience with powerful organization features. Notes are automatically synced across devices and available offline.",
        tech: ["Android", "Kotlin", "MVVM", "Coroutines", "Room"],
        color: "#BD10E0",
        icon: "📝",
        features: [
            "Rich text editing with markdown support",
            "Folder and tag organization",
            "Full-text search across all notes",
            "Cloud backup and sync",
            "Pin and archive notes",
            "Share notes as PDF or text"
        ],
        challenges: [
            "Building a performant rich text editor",
            "Implementing real-time sync with conflict resolution",
            "Creating an efficient search algorithm for large note collections"
        ],
        images: {
            hero: "/projects/notes-hero.png",
            gallery: ["/projects/notes-1.png", "/projects/notes-2.png", "/projects/notes-3.png"]
        },
        links: {
            github: "https://github.com/your-username/quicknotes"
        },
        year: "2023",
        role: "Solo Developer"
    }
];

export function getProjectById(id: string): Project | undefined {
    return projects.find((p) => p.id === id);
}

export function getProjectIds(): string[] {
    return projects.map((p) => p.id);
}
