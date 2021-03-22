import { User } from './types/user'

export const concatenateUserString = (
  user: Pick<User, 'address' | 'avatar' | 'city' | 'email' | 'name' | 'title'>
) => {
  return `${user.address.toLowerCase()} ${user.city.toLowerCase()} ${user.email.toLowerCase()} ${user.name.toLowerCase()} ${user.title.toLowerCase()}`
}
