import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MoviesService {
  url = 'https://jsonplaceholder.typicode.com/todos';

  async getModie() {
    return await axios.get(this.url).then((res) => res.data);
  }
}
