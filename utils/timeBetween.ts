export default (date: Date) => {
  return Date.now() - date.getTime();
}