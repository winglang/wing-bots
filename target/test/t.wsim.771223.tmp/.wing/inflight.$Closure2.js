module.exports = function({  }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const m3 = Object.freeze({"a a":"b"});
      {console.log((m3)["a a"])};
    }
  }
  return $Closure2;
}
