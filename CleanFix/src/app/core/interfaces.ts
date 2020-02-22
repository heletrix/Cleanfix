// Запит на отримання списку проєктів /api/projects (Get)
export interface Projects {
    projects: Project[]
}

export interface Project {
    id: number
    name: string,
    description: string,
    category: string,
    mainPhoto: string,
    budget: number, // два знака після коми
    status: number, // 0 - to do, 1 - done
    district: string, 
    location: string,
    latitude: number | null, // optional
    longitude: number | null, // optional
}

// Запит на отримання проєкту за id /api/project/{id} (Get)
export interface ProjectDetails { 
    id: number
    name: string,
    description: string,
    category: string,
    solution: string,
    mainPhoto: string,
    status: number,
    district: string, 
    location: string, 
    latitude: number,
    longitude: number,
    budget: number, // два знака після коми
    totalDonate: number // скільки грошей всього готові заплатити за проєкт
    totalVolunteers: number // скыльки волонтерів записалось
    sponsors: Sponsor[],
    volunteers: Volunteer[]
}

export interface Sponsor {
    id: number,
    name: string, // Прізвище ім'я по-батькові
    donate: number, // два знака після коми
    email: string,
    phoneNumber: string | null, // optional
    companyName: string | null, // optional
    companyLogo: string | null// optional
}

export interface Volunteer {
    id: number,
    name: string, // Прізвище ім'я по-батькові
    email: string,
    phoneNumber: string | null // optional
}

// Запит на створення проєкту /api/project Post
export interface ProjectPost {
    name: string,
    description: string,
    category: string,
    solution: string,
    mainPhoto: string,
    status: number,
    budget: number, // два знака після коми
    district: string, 
    location: string, 
    latitude: number | null, // optional
    longitude: number | null, // optional
}

// Запит на створення користувача /api/user Post
export interface UserPost {
    name: string, // Прізвище ім'я по-батькові
    lastName: string,
    middleName: string,
    type: number, // 0 - person, 1 - company
    email: string,
    phoneNumber: string | null, // optional
    companyName: string | null, // optional
    companyLogo: string | null, // optional
    donate: number, // два знака після коми
}


// Запит на отримання користувача /api/user/{email} Get
export interface User {
    name: string, // Прізвище ім'я по-батькові
    lastName: string,
    middleName: string,
    type: number, // 0 - person, 1 - company
    email: string,
    phoneNumber: string, // optional
    companyName: string, // optional
    companyLogo: string, // optional
    totalDonate: number, // скільки всього користувач задонатив 
    totalCreatedProjects: number, // всього створив проєктів
    totalProjectsAsVolunteer: number,
    donate: number // два знака після коми 
}

export interface Connection {
    userId: number,
    projectId: number,
    status: number, // 0 - volunteer, 1 - sponsor
    donate: number | null, // optional, два знака після коми
}