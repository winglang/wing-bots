exports.handler = async function(event) {
  return await (
          (await (async () => {
            const $Closure1Client = 
          require("././inflight.$Closure1.js")({
            m2: {a: "b",},
          })
        ;
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        ).handle(event);
};