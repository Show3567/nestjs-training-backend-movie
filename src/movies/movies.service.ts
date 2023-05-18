import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MoviesService {
  private readonly url = 'https://jsonplaceholder.typicode.com/todos';

  async getModie() {
    try {
      return await axios.get(this.url).then((res) => res.data);
    } catch (error) {
      throw new InternalServerErrorException('Cannot get the resource!');
    }
  }
}
