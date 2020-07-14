module.exports = function() {
  const dependencies = {};
  const factories = {};
  const serviceLocator = {};

  serviceLocator.factory = (name, factory) => { //[1]
    factories[name] = factory;
  };

  serviceLocator.register = (name, instance) => { //[2]
    dependencies[name] = instance;
  };

  serviceLocator.get = (name) => { //[3]
    if(!dependencies[name]) {
      const factory = factories[name];
      dependencies[name] = factory && factory(serviceLocator);
      if(!dependencies[name]) {
        throw new Error('Cannot find module: ' + name);
      }
    }
    return dependencies[name];
  };

  return serviceLocator;
};