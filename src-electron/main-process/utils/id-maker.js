export function* idMaker() {
  let index = 0;
  while (true) {
    index += 1;
    yield index;
  }
}
