import type { Post, User } from '../api/jsonplaceholder'

export const usersFixture: User[] = [
  { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz', company: { name: 'Romaguera-Crona' } },
  { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv', company: { name: 'Deckow-Crist' } },
  { id: 3, name: 'Clementine Bauch', email: 'Nathan@yesenia.net', company: { name: 'Romaguera-Jacobson' } },
  { id: 4, name: 'Patricia Lebsack', email: 'Julianne.OConner@kory.org', company: { name: 'Robel-Corkery' } },
  { id: 5, name: 'Chelsey Dietrich', email: 'Lucio_Hettinger@annie.ca', company: { name: 'Keebler LLC' } },
  { id: 6, name: 'Mrs. Dennis Schulist', email: 'Karley_Dach@jasper.info', company: { name: 'Considine-Lockman' } },
  { id: 7, name: 'Kurtis Weissnat', email: 'Telly.Hoeger@billy.biz', company: { name: 'Johns Group' } },
  { id: 8, name: 'Nicholas Runolfsdottir V', email: 'Sherwood@rosamond.me', company: { name: 'Abernathy Group' } },
  { id: 9, name: 'Glenna Reichert', email: 'Chaim_McDermott@dana.io', company: { name: 'Yost and Sons' } },
  { id: 10, name: 'Clementina DuBuque', email: 'Rey.Padberg@karina.biz', company: { name: 'Hoeger LLC' } },
]

export const postsFixture: Post[] = [
  {
    id: 1,
    userId: 1,
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum',
  },
  {
    id: 2,
    userId: 1,
    title: 'qui est esse',
    body: 'est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque',
  },
  {
    id: 3,
    userId: 1,
    title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    body: 'et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad',
  },
  {
    id: 11,
    userId: 2,
    title: 'et ea vero quia laudantium autem',
    body: 'delectus reiciendis molestiae occaecati non minima eveniet',
  },
]
