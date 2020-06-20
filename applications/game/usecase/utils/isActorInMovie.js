module.exports = (movie, actorTofind) => {
  const foundActor = movie.cast.find((actor) => actor.name === actorTofind.name);
  return !!foundActor;
};
