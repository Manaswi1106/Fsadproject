export interface Student {
  id: number;
  name: string;
  department: string;
  marks: number;
  email: string;
}

export interface DepartmentCount {
  [key: string]: number;
}

const BASE_URL = 'http://localhost:8080/students';

export const studentApi = {
  getAll: async (): Promise<Student[]> => {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch students');
    return response.json();
  },

  add: async (student: Omit<Student, 'id'>): Promise<Student> => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
    if (!response.ok) throw new Error('Failed to add student');
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete student');
  },

  search: async (name: string): Promise<Student[]> => {
    const response = await fetch(`${BASE_URL}/search?name=${encodeURIComponent(name)}`);
    if (!response.ok) throw new Error('Search failed');
    return response.json();
  },

  filter: async (min: number, max: number): Promise<Student[]> => {
    const response = await fetch(`${BASE_URL}/filter?min=${min}&max=${max}`);
    if (!response.ok) throw new Error('Filter failed');
    return response.json();
  },

  getPage: async (page: number, size: number): Promise<Student[]> => {
    const response = await fetch(`${BASE_URL}/page?page=${page}&size=${size}`);
    if (!response.ok) throw new Error('Pagination failed');
    return response.json();
  },

  getAverageMarks: async (): Promise<number> => {
    const response = await fetch(`${BASE_URL}/analytics/average`);
    if (!response.ok) throw new Error('Failed to fetch average marks');
    return response.json();
  },

  getDepartmentCounts: async (): Promise<DepartmentCount> => {
    const response = await fetch(`${BASE_URL}/analytics/departments`);
    if (!response.ok) throw new Error('Failed to fetch department counts');
    return response.json();
  },
};
