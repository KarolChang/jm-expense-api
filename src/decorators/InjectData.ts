export function InjectData() {
  return function (target: any) {
    const actions = ['save', 'remove', 'softRemove', 'recover']
    for (const action of actions) {
      const func = target.prototype[action]
      Object.defineProperty(target.prototype, action, {
        value: function (...args: any[]) {
          const entity = args[0]
          let option = args[1]
          if (option) {
            if (option.data) {
              option.data.ctx = this.ctx
              option.data.log = this.log
              option.data.entity = entity
            } else {
              option = { data: { ctx: this.this, log: this.log, entity } }
            }
          }

          return func.apply(this, [entity, option])
        }
      })
    }
    return target
  }
}
