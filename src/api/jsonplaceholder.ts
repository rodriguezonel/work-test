import {
  DEMO_ACTIVE,
  DEMO_DELAY_MS,
  getDemoOptions,
  wait,
} from '../lib/demo'

export type User = {
  id: number
  name: string
  email: string
  company: { name: string }
}

export type Post = {
  id: number | string
  userId: number
  title: string
  body: string
  local?: boolean
}

export type NewPost = Pick<Post, 'userId' | 'title' | 'body'>

const BASE = 'https://jsonplaceholder.typicode.com'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  // Modo demo: demora artificial y error global, desactivados en tests.
  if (DEMO_ACTIVE) {
    const { slow, forceError } = getDemoOptions()
    if (slow) await wait(DEMO_DELAY_MS)
    if (forceError) throw new Error(`HTTP 500 en ${path}`)
  }

  const res = await fetch(`${BASE}${path}`, init)
  if (!res.ok) throw new Error(`HTTP ${res.status} en ${path}`)
  return res.json() as Promise<T>
}

export const fetchUsers = () => request<User[]>('/users')

export const fetchPosts = (userId: number) =>
  request<Post[]>(`/posts?userId=${userId}`)

export const createPost = (post: NewPost) =>
  request<Post>('/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
