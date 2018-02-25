import api from 'api/movie/movie'
import { moduleCreator } from './module-creator'

const obj = moduleCreator('one_movie', api)

export default obj