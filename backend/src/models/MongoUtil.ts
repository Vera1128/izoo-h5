
export default class MongoUtil {

  static async retry(times: number, func: any): Promise<any> {
    if (typeof func != 'function') {
      throw new Error('Argument 2 is not a function');
    }

    let haveTried = 0;
    let lastError: any;

    while (haveTried < times) {
      try {
        let result = await func();
        return result;
      } catch (error) {
        console.log(`Failed ${haveTried + 1}/${times}`, error);
        lastError = error;
        ++haveTried;
      }
    }

    throw lastError

  }

}