import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesService {
  async getModie() {
    return await fetch('https://jsonplaceholder.typicode.com/todos').then(
      (data) => data.json(),
    );
  }
}
